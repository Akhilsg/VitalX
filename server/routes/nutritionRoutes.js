const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI, SchemaType } = require("@google/generative-ai");

const db = require("../models");
const Nutrition = db.nutrition;

const googleKeys = [
  process.env.GOOGLE_API_KEY_0,
  process.env.GOOGLE_API_KEY_1,
  process.env.GOOGLE_API_KEY_2,
  process.env.GOOGLE_API_KEY_3,
  process.env.GOOGLE_API_KEY_4,
];

// Schema for the nutrition plan generation
const nutritionPlanSchema = {
  type: SchemaType.OBJECT,
  properties: {
    weeklyPlan: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          day: {
            type: SchemaType.STRING,
            description: "Day of the week (Monday, Tuesday, etc.)",
          },
          meals: {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.OBJECT,
              properties: {
                type: {
                  type: SchemaType.STRING,
                  description: "Type of meal (Breakfast, Lunch, Dinner, Snack)",
                },
                name: {
                  type: SchemaType.STRING,
                  description: "Name of the meal",
                },
                ingredients: {
                  type: SchemaType.ARRAY,
                  items: {
                    type: SchemaType.OBJECT,
                    properties: {
                      name: {
                        type: SchemaType.STRING,
                        description: "Name of the ingredient",
                      },
                      amount: {
                        type: SchemaType.STRING,
                        description: "Amount of the ingredient needed",
                      },
                      purchaseLink: {
                        type: SchemaType.STRING,
                        description:
                          "Link to purchase the ingredient (optional)",
                      },
                    },
                    required: ["name", "amount"],
                  },
                },
                recipe: {
                  type: SchemaType.STRING,
                  description: "Instructions for preparing the meal",
                },
                nutritionalInfo: {
                  type: SchemaType.OBJECT,
                  properties: {
                    calories: {
                      type: SchemaType.NUMBER,
                      description: "Calories in the meal",
                    },
                    protein: {
                      type: SchemaType.NUMBER,
                      description: "Protein content in grams",
                    },
                    carbs: {
                      type: SchemaType.NUMBER,
                      description: "Carbohydrate content in grams",
                    },
                    fat: {
                      type: SchemaType.NUMBER,
                      description: "Fat content in grams",
                    },
                  },
                  required: ["calories", "protein", "carbs", "fat"],
                },
              },
              required: [
                "type",
                "name",
                "ingredients",
                "recipe",
                "nutritionalInfo",
              ],
            },
          },
          totalNutrition: {
            type: SchemaType.OBJECT,
            properties: {
              calories: {
                type: SchemaType.NUMBER,
                description: "Total calories for the day",
              },
              protein: {
                type: SchemaType.NUMBER,
                description: "Total protein for the day in grams",
              },
              carbs: {
                type: SchemaType.NUMBER,
                description: "Total carbohydrates for the day in grams",
              },
              fat: {
                type: SchemaType.NUMBER,
                description: "Total fat for the day in grams",
              },
            },
            required: ["calories", "protein", "carbs", "fat"],
          },
        },
        required: ["day", "meals", "totalNutrition"],
      },
    },
  },
  required: ["weeklyPlan"],
};

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// Create a new nutrition plan
router.post("/create", async (req, res) => {
  const { userId } = req.body;
  try {
    const nutrition = new Nutrition({
      ...req.body,
      user: userId,
      weeklyPlan: [],
    });

    await nutrition.save();
    res.status(201).json(nutrition);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's nutrition plan
router.get("/user/:userId", async (req, res) => {
  try {
    const nutrition = await Nutrition.findOne({ user: req.params.userId });
    if (!nutrition) {
      return res.status(404).json({ message: "Nutrition plan not found" });
    }
    res.status(200).json(nutrition);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user preferences
router.put("/preferences/:userId", async (req, res) => {
  try {
    const nutrition = await Nutrition.findOne({ user: req.params.userId });
    if (!nutrition) {
      return res.status(404).json({ message: "Nutrition plan not found" });
    }

    nutrition.preferences = req.body;
    await nutrition.save();
    res.status(200).json(nutrition);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Generate nutrition plan based on preferences and workout plan
router.post("/generate/:userId", async (req, res) => {
  try {
    const { workoutPlanId } = req.body;
    const nutrition = await Nutrition.findOne({ user: req.params.userId });

    if (!nutrition) {
      return res.status(404).json({ message: "Nutrition plan not found" });
    }

    // Get a random API key from the available keys
    const apiKey = googleKeys[Math.floor(Math.random() * googleKeys.length)];
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: nutritionPlanSchema,
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 8192,
      },
    });

    // Get workout plan details if provided
    let workoutPlan = null;
    if (workoutPlanId) {
      workoutPlan = await db.workout.findById(workoutPlanId);
    }

    // Construct prompt based on user preferences and workout plan
    let prompt = `Create a 7-day nutrition plan for someone with the following preferences:\n`;

    // Add dietary preferences to prompt
    if (
      nutrition.preferences.dietaryPreferences &&
      nutrition.preferences.dietaryPreferences.length > 0
    ) {
      prompt += `- Dietary preferences: ${nutrition.preferences.dietaryPreferences.join(
        ", "
      )}\n`;
    }
    if (
      nutrition.preferences.hasAllergies &&
      nutrition.preferences.allergies.length > 0
    ) {
      prompt += `- Allergies: ${nutrition.preferences.allergies.join(", ")}\n`;
    }
    if (
      nutrition.preferences.excludedIngredients &&
      nutrition.preferences.excludedIngredients.length > 0
    ) {
      prompt += `- Excluded ingredients: ${nutrition.preferences.excludedIngredients.join(
        ", "
      )}\n`;
    }
    if (
      nutrition.preferences.preferredCuisines &&
      nutrition.preferences.preferredCuisines.length > 0
    ) {
      prompt += `- Preferred cuisines: ${nutrition.preferences.preferredCuisines.join(
        ", "
      )}\n`;
    }
    if (nutrition.preferences.calorieGoal) {
      prompt += `- Daily calorie goal: ${nutrition.preferences.calorieGoal} calories\n`;
    }
    if (nutrition.preferences.proteinGoal) {
      prompt += `- Daily protein goal: ${nutrition.preferences.proteinGoal}g\n`;
    }
    if (nutrition.preferences.carbGoal) {
      prompt += `- Daily carbohydrate goal: ${nutrition.preferences.carbGoal}g\n`;
    }
    if (nutrition.preferences.fatGoal) {
      prompt += `- Daily fat goal: ${nutrition.preferences.fatGoal}g\n`;
    }

    // Add workout plan details if available
    if (workoutPlan) {
      prompt += "\nWorkout plan details:\n";
      workoutPlan.weeks.forEach((week) => {
        prompt += `Week ${week.weekNumber}:\n`;
        week.days.forEach((day) => {
          if (day.exercises.length > 0) {
            prompt += `- ${day.name}: ${day.exercises.length} exercises focusing on ${day.focus}\n`;
          }
        });
      });
      prompt +=
        "\nPlease tailor the nutrition plan to support this workout schedule, with appropriate pre and post-workout meals.";
    }

    prompt += "\n\nFor each meal, include:\n";
    prompt += "1. Name of the dish\n";
    prompt += "2. List of ingredients with amounts\n";
    prompt += "3. Recipe instructions\n";
    prompt += "4. Nutritional information (calories, protein, carbs, fat)\n";
    prompt += "5. Suggest online stores where ingredients can be purchased\n";

    // Generate the nutrition plan using the schema directly
    try {
      const result = await model.generateContent(prompt);
      const responseText = result.response.text();

      // Try to parse the response as JSON
      let nutritionPlanData;
      try {
        nutritionPlanData = JSON.parse(responseText);

        // Check if the response has the expected structure
        if (
          !nutritionPlanData.weeklyPlan ||
          !Array.isArray(nutritionPlanData.weeklyPlan)
        ) {
          throw new Error("Invalid response structure");
        }

        // Update the nutrition plan with the generated data
        nutrition.weeklyPlan = nutritionPlanData.weeklyPlan;
        nutrition.updatedAt = Date.now();
        await nutrition.save();

        res.status(200).json(nutrition);
      } catch (parseError) {
        console.error("Error parsing nutrition plan:", parseError);
        console.error("Raw response:", responseText.substring(0, 500) + "...");
        res.status(500).json({
          message: "Failed to parse nutrition plan response",
          error: parseError.message,
        });
      }
    } catch (generationError) {
      console.error("Error generating nutrition plan:", generationError);
      res.status(500).json({
        message: "Failed to generate nutrition plan",
        error: generationError.message,
      });
    }
  } catch (error) {
    console.error("Error in nutrition plan generation route:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
