const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI, SchemaType } = require("@google/generative-ai");
const axios = require("axios");
const WorkoutPlan = require("../models/Plan");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const workoutPlanSchema = {
  type: SchemaType.OBJECT,
  properties: {
    weeks: {
      type: SchemaType.ARRAY,
      description: "Array of weekly workout plans",
      items: {
        type: SchemaType.OBJECT,
        properties: {
          weekNumber: {
            type: SchemaType.NUMBER,
            description: "Week number in the plan",
          },
          days: {
            type: SchemaType.ARRAY,
            description: "Workout days for this week",
            items: {
              type: SchemaType.OBJECT,
              properties: {
                day: {
                  type: SchemaType.STRING,
                  description: "Name of the day",
                },
                exercises: {
                  type: SchemaType.ARRAY,
                  description: "List of exercises for this day",
                  items: {
                    type: SchemaType.OBJECT,
                    properties: {
                      name: {
                        type: SchemaType.STRING,
                        description: "Name of the exercise",
                      },
                      sets: {
                        type: SchemaType.NUMBER,
                        description: "Number of sets",
                      },
                      reps: {
                        type: SchemaType.STRING,
                        description: "Number of repetitions",
                      },
                      rest: {
                        type: SchemaType.STRING,
                        description: "Rest period between sets",
                      },
                      duration: {
                        type: SchemaType.STRING,
                        description: "Duration for timed exercises",
                      },
                      needsVideo: {
                        type: SchemaType.BOOLEAN,
                        description:
                          "Whether this exercise needs a video tutorial for proper form",
                      },
                    },
                    required: ["name", "sets", "reps", "rest", "needsVideo"],
                  },
                },
              },
              required: ["day", "exercises"],
            },
          },
        },
        required: ["weekNumber", "days"],
      },
    },
  },
  required: ["weeks"],
};

async function fetchExerciseVideo(exerciseName) {
  const options = {
    method: "GET",
    url: "https://yt-api.p.rapidapi.com/search",
    params: {
      query: `${exerciseName} exercise tutorial proper form`,
      limit: "1",
    },
    headers: {
      "X-RapidAPI-Key": process.env.X_RAPID_API_KEY,
      "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return {
      videoId: response.data.data[0].videoId,
      thumbnail: response.data.data[0].thumbnail[0].url,
    };
  } catch (error) {
    console.error("Error fetching video:", error);
    return null;
  }
}

router.post("/generate", async (req, res) => {
  const {
    age,
    weight,
    heightInInches,
    goal,
    gymAccess,
    experienceLevel,
    workoutDays,
    motivation,
    workoutPreferences,
    currentActivityLevel,
  } = req.body;

  const prompt = `
    Create a 4-week workout plan:

    Consider these characteristics:
    Age - ${age}
    Weight - ${weight}
    Height - ${heightInInches}
    Goal - ${goal}
    Gym Access - ${gymAccess}
    Experience Level - ${experienceLevel}
    Workout Days - ${workoutDays}
    Motivation - ${motivation}
    Workout Preferences - ${workoutPreferences}
    Current Activity Level - ${currentActivityLevel}

    Include progressive overload strategy across the weeks.
    Nutrition tips aligned with their goals
  `;

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: workoutPlanSchema,
      },
    });
    const result = await model.generateContent(prompt);

    const response = result.response;
    const workoutPlan = JSON.parse(response.text());

    for (const week of workoutPlan.weeks) {
      for (const day of week.days) {
        for (const exercise of day.exercises) {
          if (exercise.needsVideo) {
            const videoData = await fetchExerciseVideo(exercise.name);
            if (videoData) {
              exercise.videoId = videoData.videoId;
              exercise.thumbnail = videoData.thumbnail;
            }
          }
        }
      }
    }

    const workoutPlanDocument = new WorkoutPlan.WorkoutPlan({
      age,
      weight,
      heightInInches,
      goal,
      gymAccess,
      experienceLevel,
      workoutDays,
      motivation,
      workoutPreferences,
      currentActivityLevel,
      weeks: workoutPlan.weeks,
    });

    await workoutPlanDocument.save();

    res.json(workoutPlan);
  } catch (error) {
    res.status(500).json({ error: "Failed to generate workout plan" });
  }
});

router.post("/nutrition/generate", async (req, res) => {
  const { nutritionData, workoutGoals } = req.body;

  const nutritionPlanSchema = {
    type: SchemaType.OBJECT,
    properties: {
      mealPlan: {
        type: SchemaType.ARRAY,
        items: {
          type: SchemaType.OBJECT,
          properties: {
            day: { type: SchemaType.STRING },
            meals: {
              type: SchemaType.ARRAY,
              items: {
                type: SchemaType.OBJECT,
                properties: {
                  type: { type: SchemaType.STRING },
                  name: { type: SchemaType.STRING },
                  ingredients: {
                    type: SchemaType.ARRAY,
                    items: { type: SchemaType.STRING },
                  },
                  macros: {
                    type: SchemaType.OBJECT,
                    properties: {
                      protein: { type: SchemaType.NUMBER },
                      carbs: { type: SchemaType.NUMBER },
                      fats: { type: SchemaType.NUMBER },
                      calories: { type: SchemaType.NUMBER },
                    },
                  },
                  recipe: { type: SchemaType.STRING },
                  estimatedCost: { type: SchemaType.NUMBER },
                },
              },
            },
          },
        },
      },
    },
  };

  const prompt = `
    Create a 7-day meal plan considering:
    Dietary Preferences: ${nutritionData.dietaryPreferences.join(", ")}
    Dietary Restrictions: ${
      nutritionData.dietaryRestrictions.join(", ") || "None"
    }
    Allergies: ${nutritionData.allergies || "None"}
    Meals per day: ${nutritionData.mealsPerDay}
    Weekly budget: $${nutritionData.budget}
    
    Workout Goals: ${workoutGoals || "General fitness"}
    
    Include:
    - Meal names
    - Ingredients list
    - Macro breakdown (protein, carbs, fats, calories)
    - Simple recipe instructions
    - Estimated cost per meal
  `;

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: nutritionPlanSchema,
      },
    });

    const result = await model.generateContent(prompt);
    const nutritionPlan = JSON.parse(result.response.text());

    const nutritionPlanDocument = new WorkoutPlan.NutritionPlan({
      ...nutritionData,
      ...nutritionPlan,
    });

    console.log("meal", nutritionPlanDocument);
    await nutritionPlanDocument.save();
    res.json(nutritionPlan);
  } catch (error) {
    console.error("Error generating nutrition plan:", error);
    res.status(500).json({ error: "Failed to generate nutrition plan" });
  }
});

router.get("/workout", async (req, res) => {
  try {
    const workoutPlan = await WorkoutPlan.WorkoutPlan.findOne().sort({
      createdAt: -1,
    });
    if (!workoutPlan) {
      return res.status(404).json({ message: "No workout plan found" });
    }
    res.json(workoutPlan);
  } catch (error) {
    console.error("Error fetching workout plan:", error);
    res.status(500).json({ error: "Failed to fetch workout plan" });
  }
});

module.exports = router;
