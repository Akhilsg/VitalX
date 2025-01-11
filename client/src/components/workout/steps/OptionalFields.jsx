import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const OptionalFields = ({
  formData,
  handleInputChange,
  handleCheckboxChange,
}) => {
  return (
    <>
      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
        *These fileds are optional, but can help us tailor your workout plan
        better.
      </Typography>
      <TextField
        label="What is your current activity level?"
        placeholder="Sedentary, Lightly active, Very active, etc."
        value={formData.currentActivityLevel}
        onChange={handleInputChange("currentActivityLevel")}
        fullWidth
        margin="normal"
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
      />
      <TextField
        label="What motivates you?"
        placeholder="e.g., Improve health, Look better, Feel stronger"
        value={formData.motivation}
        onChange={handleInputChange("motivation")}
        fullWidth
        margin="normal"
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
      />
      <FormControl component="fieldset" sx={{ mt: 2 }}>
        <FormGroup>
          <FormLabel component="legend">Workout Preferences</FormLabel>
          <FormControlLabel
            control={
              <Checkbox
                name="yoga"
                onChange={handleCheckboxChange}
                checked={formData.workoutPreferences.includes("yoga")}
              />
            }
            label="Yoga"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="strength-training"
                onChange={handleCheckboxChange}
                checked={formData.workoutPreferences.includes(
                  "strength-training"
                )}
              />
            }
            label="Strength Training"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="cardio"
                onChange={handleCheckboxChange}
                checked={formData.workoutPreferences.includes("cardio")}
              />
            }
            label="Cardio"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="flexibility"
                onChange={handleCheckboxChange}
                checked={formData.workoutPreferences.includes("flexibility")}
              />
            }
            label="Flexibility/Stretching"
          />
        </FormGroup>
      </FormControl>
    </>
  );
};

export default OptionalFields;
