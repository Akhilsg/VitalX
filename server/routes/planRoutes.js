const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI, SchemaType } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const db = require("../models");
const WorkoutPlan = db.workout;
const NutritionPlan = db.nutrition;

const googleKeys = [
  process.env.GOOGLE_API_KEY_0,
  process.env.GOOGLE_API_KEY_1,
  process.env.GOOGLE_API_KEY_2,
  process.env.GOOGLE_API_KEY_3,
  process.env.GOOGLE_API_KEY_4,
];

const workoutPlanSchema = {
  type: SchemaType.OBJECT,
  properties: {
    exercises: {
      type: SchemaType.ARRAY,
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
  required: ["exercises"],
};

// async function getVideo(exerciseName) {
//   const options = {
//     method: "GET",
//     url: "https://yt-api.p.rapidapi.com/search",
//     params: {
//       query: `${exerciseName} exercise tutorial proper form`,
//       limit: "1",
//     },
//     headers: {
//       "X-RapidAPI-Key": process.env.X_RAPID_API_KEY,
//       "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
//     },
//   };

//   try {
//     const response = await axios.request(options);
//     return {
//       videoId: response.data.data[0].videoId,
//       thumbnail: response.data.data[0].thumbnail[0].url,
//     };
//   } catch (error) {
//     console.error("Error fetching video:", error);
//     return null;
//   }
// }
router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});


router.post("/create", async (req, res) => {
  const { userId } = req.body;
  try {
    const workout = new WorkoutPlan({
      ...req.body,
      user: userId,
      weeks: [],
    });

    await workout.save();

    res.send({ id: workout._id, workout });
  } catch (error) {
    console.error("Error creating workout plan:", error);
    res.status(500).send("Failed to create workout plan");
    return;
  }
});


router.get("/generate/:workoutId", async (req, res) => {
  const workoutId = req.params.workoutId;
  const workout = await WorkoutPlan.findById(workoutId);

  const availableDays = workout.workoutDays;
  const totalWeeks = 4;
  const totalDays = availableDays.length * totalWeeks;

  workout.generationProgress = {
    isGenerating: true,
    currentWeek: 0,
    currentDay: 0,
    totalDays,
    completedDays: 0,
  };
  await workout.save();

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  let completePlan = { weeks: [] };

  try {
    for (let weekIndex = 0; weekIndex < totalWeeks; weekIndex++) {
      let weekPlan = { weekNumber: weekIndex + 1, days: [] };
      let weekExercises = [];

      for (let dayIndex = 0; dayIndex < availableDays.length; dayIndex++) {
        const day = availableDays[dayIndex];

        
        res.write(
          `data: ${JSON.stringify({
            type: "progress",
            data: {
              isGenerating: true,
              currentGeneratingWeek: weekIndex,
              currentGeneratingDay: dayIndex,
              totalDays: totalDays,
              completedDays: workout.generationProgress.completedDays,
              workoutDays: workout.workoutDays,
              currentDay: {
                weekNumber: weekIndex + 1,
                day: day,
              },
            },
          })}\n\n`
        );

        
        const prompt = `
          Generate a workout plan for Week ${weekIndex + 1}, ${day} considering:
          Age: ${workout.age}
          Weight: ${workout.weight}
          Height: ${workout.heightInInches}
          Goal: ${workout.goal}
          Gym Access: ${workout.gymAccess}
          Experience Level: ${workout.experienceLevel}
          Workout Days: ${workout.workoutDays.join(", ")}
          Motivation: ${workout.motivation}
          Workout Preferences: ${workout.workoutPreferences}
          Current Activity Level: ${workout.currentActivityLevel}
          
          GOAL SPECIFIC INSTRUCTIONS:
          ${workout.goal.includes("weight-loss") ? "- Include exercises that maximize calorie burn and fat loss" : ""}
          ${workout.goal.includes("muscle-gain") ? "- Focus on progressive overload and hypertrophy training" : ""}
          ${workout.goal.includes("strength") ? "- Prioritize compound movements and strength development" : ""}
          ${workout.goal.includes("endurance") ? "- Include exercises that build cardiovascular and muscular endurance" : ""}
          ${workout.goal.includes("general-fitness") ? "- Create a balanced workout with variety" : ""}
          ${workout.goal.includes("rehabilitation") ? "- Include gentle, rehabilitative exercises that promote recovery" : ""}
          ${workout.goal.includes("sport-specific") ? "- Focus on exercises that enhance athletic performance" : ""}
          ${workout.goal.includes("stress-relief") ? "- Prioritize mindful movement, yoga, and low-intensity exercises that reduce stress" : ""}
          
          ${getGoalSpecificPrompt(workout.goalSpecificData, workout.goal)}
          
          Include a progressive overload strategy appropriate for the selected goals.
        `;

        const dayPlan = await generateDayPlan(prompt, weekExercises, workout);  // Pass workout as parameter
        weekExercises = [...weekExercises, ...dayPlan.exercises];
        weekPlan.days.push({ day, ...dayPlan });

        workout.generationProgress.completedDays++;
        workout.generationProgress.currentWeek = weekIndex;
        workout.generationProgress.currentDay = dayIndex;
        await WorkoutPlan.findOneAndUpdate(
          { _id: workoutId },
          { $set: { generationProgress: workout.generationProgress } }
        );

        
        res.write(
          `data: ${JSON.stringify({
            type: "dayComplete",
            data: {
              weekNumber: weekIndex + 1,
              day: day,
              exercises: dayPlan.exercises,
            },
          })}\n\n`
        );
      }
      completePlan.weeks.push(weekPlan);
    }

    workout.weeks = completePlan.weeks;
    workout.generationProgress.isGenerating = false;
    await workout.save();

    res.write(
      `data: ${JSON.stringify({ type: "complete", data: completePlan })}\n\n`
    );
  } catch (error) {
    console.error("Generation failed:", error);
    res.write(
      `data: ${JSON.stringify({
        error: "Generation failed",
        details: error.message,
      })}\n\n`
    );
  }
  res.end();
});


function getGoalSpecificPrompt(goalSpecificData, goals) {
  if (!goalSpecificData) return "";
  
  let prompts = [];
  
  if (goals.includes("weight-loss") && goalSpecificData.weightLossSpeed) {
    prompts.push(`Weight Loss Speed: ${goalSpecificData.weightLossSpeed}`);
    prompts.push(`Weight Loss Training Preference: ${goalSpecificData.weightLossPreference || "balanced"}`);
  }
  
  if (goals.includes("muscle-gain") && goalSpecificData.priorityMuscles) {
    prompts.push(`Priority Muscle Groups: ${goalSpecificData.priorityMuscles.join(", ")}`);
  }
  
  if (goals.includes("strength") && goalSpecificData.strengthFocus) {
    prompts.push(`Strength Focus Lifts: ${goalSpecificData.strengthFocus.join(", ")}`);
  }
  
  if (goals.includes("endurance") && goalSpecificData.enduranceType) {
    prompts.push(`Endurance Type: ${goalSpecificData.enduranceType}`);
    if (goalSpecificData.currentEndurance) {
      prompts.push(`Current Endurance Level: ${goalSpecificData.currentEndurance} minutes`);
    }
  }
  
  if (goals.includes("sport-specific")) {
    const sport = goalSpecificData.sport === "other" 
      ? goalSpecificData.otherSport 
      : goalSpecificData.sport;
    
    if (sport) {
      prompts.push(`Sport: ${sport}`);
    }
    
    if (goalSpecificData.sportAspects) {
      prompts.push(`Sport Performance Aspects: ${goalSpecificData.sportAspects.join(", ")}`);
    }
  }
  
  if (goals.includes("rehabilitation")) {
    const rehabArea = goalSpecificData.rehabArea === "other"
      ? goalSpecificData.otherRehabArea
      : goalSpecificData.rehabArea;
    
    if (rehabArea) {
      prompts.push(`Rehabilitation Area: ${rehabArea}`);
    }
    
    if (goalSpecificData.medicalClearance) {
      prompts.push(`Medical Clearance: ${goalSpecificData.medicalClearance}`);
    }
  }
  
  if (goals.includes("stress-relief") && goalSpecificData.relaxingActivities) {
    prompts.push(`Preferred Relaxing Activities: ${goalSpecificData.relaxingActivities.join(", ")}`);
    if (goalSpecificData.stressReliefTime) {
      prompts.push(`Preferred Session Duration: ${goalSpecificData.stressReliefTime}`);
    }
  }
  
  if (goals.includes("general-fitness")) {
    if (goalSpecificData.fitnessAspects) {
      prompts.push(`Important Fitness Aspects: ${goalSpecificData.fitnessAspects.join(", ")}`);
    }
    if (goalSpecificData.currentRoutine) {
      prompts.push(`Current Fitness Routine: ${goalSpecificData.currentRoutine}`);
    }
  }
  
  return prompts.join("\n");
}
let currentGoogleKeyIndex = 0;
let callCounter = 0;

function getNextGoogleKey() {
  const key = googleKeys[currentGoogleKeyIndex];
  callCounter++;

  if (callCounter >= 6) {
    callCounter = 0;
    currentGoogleKeyIndex = (currentGoogleKeyIndex + 1) % googleKeys.length;
  }
  return key;
}

const generateDayPlan = async (prompt, previousExercises, workout) => {  // Add workout parameter
  const currentKey = getNextGoogleKey();
  const genAI = new GoogleGenerativeAI(currentKey);

  const enhancedPrompt = `
    ${prompt}
    
    Previously generated exercises this week:
    ${previousExercises.map((ex) => ex.name).join(", ")}
    
    Please generate different exercises than those listed above to ensure variety.
    Focus on complementary muscle groups and avoid repeating the same exercises.
    
    IMPORTANT - Tailor exercises specifically to these goals:
    - For "weight-loss": Focus on high-intensity interval training (HIIT), circuit training, cardio exercises, and full-body workouts that maximize calorie burn.
    - For "muscle-gain": Include progressive resistance training, compound movements, and hypertrophy-focused exercises with appropriate rep ranges (8-12).
    - For "strength": Prioritize compound movements with lower rep ranges (3-6), higher weights, and longer rest periods.
    - For "endurance": Include longer duration activities, higher rep ranges (15+), supersets, and cardio-based exercises.
    - For "general-fitness": Provide balanced workouts with a mix of cardio, strength, and flexibility exercises.
    - For "rehabilitation": Suggest gentle, controlled movements, mobility exercises, and progressive strengthening appropriate for recovery.
    - For "sport-specific": Include exercises that develop the specific skills, movements, and energy systems used in the user's sport.
    - For "stress-relief": Prioritize yoga, tai chi, walking, swimming, and other mindful movement practices that reduce cortisol and promote relaxation.
    
    The user's primary goal(s) is: ${workout.goal}
    
    DO NOT recommend high-intensity exercises like bench press for stress-relief goals unless they're specifically combined with muscle-building goals.
    For rehabilitation, ensure exercises are safe and progressive, avoiding potentially harmful movements.
  `;

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: workoutPlanSchema,
    },
  });
  const result = await model.generateContent(enhancedPrompt);
  return JSON.parse(result.response.text());
};

router.get("/status/:workoutId", async (req, res) => {
  const workout = await WorkoutPlan.findById(req.params.workoutId);

  res.json({
    isGenerating: workout.generationProgress.isGenerating,
    currentWeek: workout.generationProgress.currentWeek,
    currentDay: workout.generationProgress.currentDay,
    totalDays: workout.generationProgress.totalDays,
    completedDays: workout.generationProgress.completedDays,
  });
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

    const nutritionPlanDocument = new NutritionPlan({
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

router.get("/workout/:userId", async (req, res) => {
  try {
    const workoutPlan = await WorkoutPlan.findOne({
      user: req.params.userId,
    }).sort({ createdAt: -1 });

    if (!workoutPlan) {
      return res.status(404).json({ message: "No workout plan found" });
    }
    res.json(workoutPlan);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch workout plan" });
  }
});

module.exports = router;
