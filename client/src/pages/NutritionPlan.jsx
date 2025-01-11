import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Slider,
  Stack,
  TextField,
  Typography,
  Chip,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import { toast } from "sonner";

const NutritionPlan = () => {
  const [workoutPlan, setWorkoutPlan] = useState({
    goal: "General Fitness", // Simulate a workout plan being present
  });
  const [nutritionData, setNutritionData] = useState({
    dietaryPreferences: [],
    dietaryRestrictions: [],
    mealsPerDay: 3,
    budget: 50,
    allergies: "",
  });
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formCollapsed, setFormCollapsed] = useState(false);

  const dietaryOptions = [
    "Vegan",
    "Vegetarian",
    "Keto",
    "Pescatarian",
    "Gluten-Free",
    "Lactose-Free",
    "Halal",
    "Kosher",
  ];

  const generateNutritionPlan = () => {
    if (!workoutPlan) {
      toast.error("Please create a workout plan first!");
      return;
    }

    setFormCollapsed(true); // Collapse the form
    setLoading(true);

    setTimeout(() => {
      // Enhanced hardcoded 7-day meal plan
      const hardcodedMealPlan = [
        {
          day: "Monday",
          meals: [
            {
              type: "Breakfast",
              name: "Avocado and Tofu Scramble",
              description:
                "A high-protein, low-carb meal to kickstart your day.",
              ingredients: ["Avocado", "Tofu", "Spinach", "Olive Oil"],
              macros: { protein: 20, carbs: 15, fats: 10, calories: 250 },
              recipe:
                "Mix avocado and tofu with olive oil, cook on low heat. Serve with sautéed spinach.",
              estimatedCost: 5,
            },
            {
              type: "Lunch",
              name: "Grilled Chicken Salad",
              description:
                "A balanced meal with lean protein and fresh vegetables.",
              ingredients: [
                "Chicken Breast",
                "Lettuce",
                "Tomatoes",
                "Cucumbers",
                "Olive Oil",
              ],
              macros: { protein: 30, carbs: 10, fats: 5, calories: 300 },
              recipe:
                "Grill chicken breast and toss with chopped vegetables. Drizzle with olive oil.",
              estimatedCost: 8,
            },
            {
              type: "Dinner",
              name: "Salmon with Quinoa",
              description:
                "Omega-3 rich salmon paired with nutrient-dense quinoa.",
              ingredients: ["Salmon", "Quinoa", "Asparagus", "Lemon"],
              macros: { protein: 35, carbs: 20, fats: 15, calories: 400 },
              recipe:
                "Bake salmon with lemon. Cook quinoa and steam asparagus.",
              estimatedCost: 10,
            },
          ],
        },
        // Repeat similar structured plans for Tuesday to Sunday
        ...[
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ].map((day) => ({
          day,
          meals: [
            {
              type: "Breakfast",
              name: "Greek Yogurt Parfait",
              description: "A refreshing start with probiotics and fruit.",
              ingredients: ["Greek Yogurt", "Granola", "Blueberries", "Honey"],
              macros: { protein: 18, carbs: 35, fats: 5, calories: 280 },
              recipe:
                "Layer yogurt, granola, and blueberries. Drizzle with honey.",
              estimatedCost: 4,
            },
            {
              type: "Lunch",
              name: "Turkey and Avocado Wrap",
              description:
                "A hearty wrap filled with lean turkey and creamy avocado.",
              ingredients: [
                "Turkey",
                "Whole Wheat Tortilla",
                "Avocado",
                "Lettuce",
                "Cheese",
              ],
              macros: { protein: 28, carbs: 30, fats: 12, calories: 350 },
              recipe:
                "Spread avocado on a tortilla, layer with turkey, lettuce, and cheese. Roll and serve.",
              estimatedCost: 7,
            },
            {
              type: "Dinner",
              name: "Vegetable Stir-Fry with Tofu",
              description:
                "A colorful and nutritious mix of vegetables and tofu.",
              ingredients: [
                "Tofu",
                "Broccoli",
                "Carrots",
                "Bell Peppers",
                "Soy Sauce",
              ],
              macros: { protein: 22, carbs: 25, fats: 8, calories: 280 },
              recipe: "Stir-fry tofu and vegetables with soy sauce.",
              estimatedCost: 6,
            },
          ],
        })),
      ];

      setGeneratedPlan({ mealPlan: hardcodedMealPlan });
      toast.success("Nutrition plan generated successfully!");
      setLoading(false);
    }, 3000); // Simulate a 3-second delay
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", p: 3 }}>
      {!workoutPlan && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          Please create a workout plan before generating a nutrition plan.
        </Alert>
      )}

      {!formCollapsed && (
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Nutrition Preferences
            </Typography>

            <Typography gutterBottom>Dietary Preferences:</Typography>
            <Stack sx={{ mb: 3 }}>
              {dietaryOptions.map((option) => (
                <FormControlLabel
                  key={option}
                  control={
                    <Checkbox
                      checked={nutritionData.dietaryPreferences.includes(
                        option
                      )}
                      onChange={() =>
                        setNutritionData((prev) => ({
                          ...prev,
                          dietaryPreferences: prev.dietaryPreferences.includes(
                            option
                          )
                            ? prev.dietaryPreferences.filter(
                                (p) => p !== option
                              )
                            : [...prev.dietaryPreferences, option],
                        }))
                      }
                    />
                  }
                  label={option}
                />
              ))}
            </Stack>

            <Button
              variant="contained"
              onClick={generateNutritionPlan}
              fullWidth
            >
              Generate Nutrition Plan
            </Button>
          </CardContent>
        </Card>
      )}

      {loading && (
        <Card sx={{ mt: 3 }}>
          <CardContent sx={{ textAlign: "center" }}>
            <CircularProgress sx={{ mb: 2 }} />
            <Typography variant="h6">
              Generating your nutrition plan...
            </Typography>
          </CardContent>
        </Card>
      )}

      {generatedPlan && !loading && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Your Weekly Nutrition Plan
            </Typography>
            {generatedPlan.mealPlan.map((day, index) => (
              <Box key={index} sx={{ mb: 4 }}>
                <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                  {day.day}
                </Typography>
                {day.meals.map((meal, mealIndex) => (
                  <Box key={mealIndex} sx={{ ml: 2, mb: 3 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {meal.type}: {meal.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      {meal.description}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Ingredients: {meal.ingredients.join(", ")}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Macros: Protein: {meal.macros.protein}g, Carbs:{" "}
                      {meal.macros.carbs}g, Fats: {meal.macros.fats}g, Calories:{" "}
                      {meal.macros.calories}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Recipe: {meal.recipe}
                    </Typography>
                    <Typography variant="body2">
                      Estimated Cost: ${meal.estimatedCost.toFixed(2)}
                    </Typography>
                  </Box>
                ))}
              </Box>
            ))}
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default NutritionPlan;
