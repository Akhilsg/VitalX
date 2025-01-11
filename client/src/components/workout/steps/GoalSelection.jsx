import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Checkbox,
} from "@mui/material";
import React from "react";

const GoalSelection = ({ formData, handleInputChange, errors }) => {
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    const updatedGoals = checked
      ? [...formData.goal.split(",").filter(Boolean), name]
      : formData.goal.split(",").filter((goal) => goal !== name);

    handleInputChange("goal")({ target: { value: updatedGoals.join(",") } });
  };

  const selectedGoals = formData.goal.split(",").filter(Boolean);

  return (
    <FormControl component="fieldset" error={!!errors.goal}>
      <FormLabel component="legend">
        What are your fitness goals? (Select all that apply)
      </FormLabel>
      <FormControlLabel
        control={
          <Checkbox
            checked={selectedGoals.includes("weight-loss")}
            onChange={handleCheckboxChange}
            name="weight-loss"
          />
        }
        label="Lose Weight"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={selectedGoals.includes("muscle-gain")}
            onChange={handleCheckboxChange}
            name="muscle-gain"
          />
        }
        label="Build Muscle"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={selectedGoals.includes("strength")}
            onChange={handleCheckboxChange}
            name="strength"
          />
        }
        label="Increase Strength"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={selectedGoals.includes("endurance")}
            onChange={handleCheckboxChange}
            name="endurance"
          />
        }
        label="Improve Endurance"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={selectedGoals.includes("general-fitness")}
            onChange={handleCheckboxChange}
            name="general-fitness"
          />
        }
        label="Maintain General Fitness"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={selectedGoals.includes("rehabilitation")}
            onChange={handleCheckboxChange}
            name="rehabilitation"
          />
        }
        label="Rehabilitation from Injury"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={selectedGoals.includes("sport-specific")}
            onChange={handleCheckboxChange}
            name="sport-specific"
          />
        }
        label="Sport-Specific Training"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={selectedGoals.includes("stress-relief")}
            onChange={handleCheckboxChange}
            name="stress-relief"
          />
        }
        label="Relieve Stress"
      />
      {errors.goal && <FormHelperText>{errors.goal}</FormHelperText>}
    </FormControl>
  );
};

export default GoalSelection;
