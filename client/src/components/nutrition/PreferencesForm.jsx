import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

export const PreferencesForm = ({
  preferences,
  setPreferences,
  allergyInput,
  setAllergyInput,
  excludedInput,
  setExcludedInput,
  addItem,
  removeItem,
  handleNumberInput,
  handlePreferenceChange,
  generateNutritionPlan,
  savePreferences,
  generating,
  theme,
}) => {
  return (
    <Card sx={{ p: 3, mb: 3 }}>
      {/* Nutrition Plan Preferences */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Nutrition Plan Preferences
      </Typography>
      <FormGroup>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Dietary Preferences
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Select all that apply to your diet
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {[
                "Vegetarian",
                "Vegan",
                "Keto",
                "Paleo",
                "Gluten-Free",
                "Dairy-Free",
                "Low-Carb",
                "Low-Calorie",
                "Mediterranean",
                "Pescatarian",
                "Whole30",
              ].map((diet) => (
                <Chip
                  key={diet}
                  label={diet}
                  onClick={() => addItem("dietaryPreferences", diet)}
                  onDelete={
                    preferences?.dietaryPreferences?.includes(diet)
                      ? () =>
                          removeItem(
                            "dietaryPreferences",
                            preferences?.dietaryPreferences?.indexOf(diet)
                          )
                      : undefined
                  }
                  color={
                    preferences?.dietaryPreferences?.includes(diet)
                      ? "primary"
                      : "default"
                  }
                  variant={
                    preferences?.dietaryPreferences?.includes(diet)
                      ? "filled"
                      : "outlined"
                  }
                  sx={{ m: 0.5 }}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </FormGroup>

      {/* Allergies & Restrictions */}
      <Divider sx={{ my: 3 }} />
      <Typography variant="h6" sx={{ mb: 2 }}>
        Allergies & Restrictions
      </Typography>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={preferences?.hasAllergies}
              onChange={handlePreferenceChange}
              name="hasAllergies"
              color="primary"
            />
          }
          label="I have food allergies"
        />

        {preferences?.hasAllergies && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              List Your Allergies
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Add allergy (e.g., peanuts, shellfish)"
                value={allergyInput}
                onChange={(e) => setAllergyInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    addItem("allergies", allergyInput);
                    e.preventDefault();
                  }
                }}
              />
              <Button
                variant="contained"
                onClick={() => addItem("allergies", allergyInput)}
              >
                Add
              </Button>
            </Stack>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {preferences?.allergies.map((allergy, index) => (
                <Chip
                  key={index}
                  label={allergy}
                  onDelete={() => removeItem("allergies", index)}
                  color="error"
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>
        )}

        <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }}>
          Excluded Ingredients
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Add any ingredients you want to avoid in your meal plan
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Add ingredient to exclude (e.g., cilantro, mushrooms)"
            value={excludedInput}
            onChange={(e) => setExcludedInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                addItem("excludedIngredients", excludedInput);
                e.preventDefault();
              }
            }}
          />
          <Button
            variant="contained"
            onClick={() => addItem("excludedIngredients", excludedInput)}
          >
            Add
          </Button>
        </Stack>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {preferences?.excludedIngredients.map((ingredient, index) => (
            <Chip
              key={index}
              label={ingredient}
              onDelete={() => removeItem("excludedIngredients", index)}
              color="warning"
              variant="outlined"
            />
          ))}
        </Box>
      </FormGroup>

      {/* Nutritional Goals */}
      <Divider sx={{ my: 3 }} />
      <Typography variant="h6" sx={{ mb: 2 }}>
        Nutritional Goals
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Set your daily nutritional targets (leave blank for AI recommendations)
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Daily Calorie Goal"
            variant="outlined"
            name="calorieGoal"
            value={preferences?.calorieGoal}
            onChange={handleNumberInput}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">kcal</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Daily Protein Goal"
            variant="outlined"
            name="proteinGoal"
            value={preferences?.proteinGoal}
            onChange={handleNumberInput}
            InputProps={{
              endAdornment: <InputAdornment position="end">g</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Daily Carbohydrate Goal"
            variant="outlined"
            name="carbGoal"
            value={preferences?.carbGoal}
            onChange={handleNumberInput}
            InputProps={{
              endAdornment: <InputAdornment position="end">g</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Daily Fat Goal"
            variant="outlined"
            name="fatGoal"
            value={preferences?.fatGoal}
            onChange={handleNumberInput}
            InputProps={{
              endAdornment: <InputAdornment position="end">g</InputAdornment>,
            }}
          />
        </Grid>
      </Grid>

      {/* Generate Plan */}
      <Divider sx={{ my: 3 }} />
      <Box sx={{ textAlign: "center" }}>
        <Box sx={{ mb: 3 }}>
          <Icon
            icon="mdi:food-fork-drink"
            style={{ fontSize: 48, color: theme.palette.primary.main }}
          />
        </Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Generate Your Nutrition Plan
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Based on your preferences, we'll create a personalized weekly
          nutrition plan with delicious meals and recipes.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={generateNutritionPlan}
          disabled={generating}
          loading={generating}
          startIcon={
            generating ? "Generating..." : <Icon icon="mdi:chef-hat" />
          }
          sx={{ px: 4, py: 1.5 }}
        >
          {generating ? "Generating..." : "Generate Nutrition Plan"}
        </Button>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
        <Button onClick={savePreferences}>Save Preferences</Button>
      </Box>
    </Card>
  );
};
