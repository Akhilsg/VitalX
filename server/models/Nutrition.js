const mongoose = require("mongoose");

const NutritionPlanSchema = new mongoose.Schema({
  dietaryPreferences: [String],
  dietaryRestrictions: [String],
  mealsPerDay: { type: Number, required: true },
  budget: { type: Number, required: true },
  allergies: String,
  mealPlan: [
    {
      day: String,
      meals: [
        {
          type: String,
          name: String,
          ingredients: [String],
          macros: {
            protein: Number,
            carbs: Number,
            fats: Number,
            calories: Number,
          },
          recipe: String,
          estimatedCost: Number,
        },
      ],
    },
  ],
  workoutPlanId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "WorkoutPlan",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("NutritionPlan", NutritionPlanSchema);
