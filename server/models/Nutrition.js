const mongoose = require("mongoose");

const nutritionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    preferences: {
      dietaryPreferences: [{ type: String }], // Array of dietary preferences (vegetarian, vegan, keto, paleo, etc.)
      hasAllergies: { type: Boolean, default: false },
      allergies: [{ type: String }],
      excludedIngredients: [{ type: String }],
      calorieGoal: { type: Number },
      proteinGoal: { type: Number },
      carbGoal: { type: Number },
      fatGoal: { type: Number },
    },
    weeklyPlan: [
      {
        day: { type: String, required: true }, // Monday, Tuesday, etc.
        meals: [
          {
            type: { type: String, required: true }, // Breakfast, Lunch, Dinner, Snack
            name: { type: String, required: true },
            ingredients: [
              {
                name: { type: String, required: true },
                amount: { type: String, required: true },
                purchaseLink: { type: String },
              },
            ],
            recipe: { type: String, required: true },
            nutritionalInfo: {
              calories: { type: Number },
              protein: { type: Number },
              carbs: { type: Number },
              fat: { type: Number },
            },
            imageUrl: { type: String },
          },
        ],
        totalNutrition: {
          calories: { type: Number },
          protein: { type: Number },
          carbs: { type: Number },
          fat: { type: Number },
        },
      },
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Nutrition", nutritionSchema);
