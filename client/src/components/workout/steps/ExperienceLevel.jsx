import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";
import DaySelector from "../DaySelector";

const ExperienceLevel = ({
  formData,
  setFormData,
  handleInputChange,
  errors,
}) => {
  return (
    <>
      <FormControl component="fieldset" error={!!errors.experienceLevel}>
        <FormLabel component="legend">Experience Level</FormLabel>
        <RadioGroup
          value={formData.experienceLevel}
          onChange={handleInputChange("experienceLevel")}
        >
          <FormControlLabel
            value="beginner"
            control={<Radio />}
            label="Beginner"
          />
          <FormControlLabel
            value="intermediate"
            control={<Radio />}
            label="Intermediate"
          />
          <FormControlLabel
            value="advanced"
            control={<Radio />}
            label="Advanced"
          />
        </RadioGroup>
        {errors.experienceLevel && (
          <FormHelperText>{errors.experienceLevel}</FormHelperText>
        )}
        <FormControl fullWidth sx={{ mt: 4 }}>
          <FormLabel component="legend">Select Your Workout Days</FormLabel>
          <DaySelector
            value={formData.workoutDays}
            onChange={(newDays) => {
              setFormData({ ...formData, workoutDays: newDays });
            }}
            error={errors.workoutDays}
          />
        </FormControl>
      </FormControl>
    </>
  );
};

export default ExperienceLevel;
