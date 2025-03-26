import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Box,
  Typography,
  Grid,
  useTheme,
  alpha,
  Checkbox,
} from "@mui/material";
import React from "react";
import { Icon } from "@iconify/react";
import { m } from "framer-motion";
import {
  CheckboxCheckedIcon,
  CheckboxIcon,
} from "../../../theme/icons/Checkbox";

const GoalSelection = ({ formData, handleInputChange, errors }) => {
  const theme = useTheme();

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    const currentGoals = formData.goal.split(",").filter(Boolean);

    // If trying to add a new goal but already at max limit
    if (checked && currentGoals.length >= 3 && !currentGoals.includes(name)) {
      return; // Don't add more than 3 goals
    }

    const updatedGoals = checked
      ? [...currentGoals, name]
      : currentGoals.filter((goal) => goal !== name);

    handleInputChange("goal")({ target: { value: updatedGoals.join(",") } });
  };

  const selectedGoals = formData.goal.split(",").filter(Boolean);
  const maxGoalsReached = selectedGoals.length >= 3;

  const goals = [
    {
      id: "weight-loss",
      label: "Lose Weight",
      icon: "mdi:weight",
      description: "Burn fat and reduce body weight",
    },
    {
      id: "muscle-gain",
      label: "Build Muscle",
      icon: "mdi:arm-flex",
      description: "Increase muscle mass and definition",
    },
    {
      id: "strength",
      label: "Increase Strength",
      icon: "mdi:weight-lifter",
      description: "Boost power and lifting capacity",
    },
    {
      id: "endurance",
      label: "Improve Endurance",
      icon: "mdi:run-fast",
      description: "Enhance stamina and cardiovascular fitness",
    },
    {
      id: "general-fitness",
      label: "Maintain General Fitness",
      icon: "mdi:heart-pulse",
      description: "Stay active and maintain overall health",
    },
    {
      id: "rehabilitation",
      label: "Rehabilitation from Injury",
      icon: "mdi:medical-bag",
      description: "Recover and strengthen after injury",
    },
    {
      id: "sport-specific",
      label: "Sport-Specific Training",
      icon: "mdi:trophy",
      description: "Improve performance in your sport",
    },
    {
      id: "stress-relief",
      label: "Relieve Stress",
      icon: "mdi:meditation",
      description: "Reduce stress and improve mental wellbeing",
    },
  ];

  return (
    <FormControl
      component="fieldset"
      error={!!errors.goal}
      sx={{ width: "100%" }}
    >
      <FormLabel
        component="legend"
        sx={{
          mb: 2,
          color: "text.primary",
          fontWeight: 500,
          fontSize: "1.1rem",
        }}
      >
        What are your fitness goals?
      </FormLabel>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 3,
          alignItems: "center",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Select up to 3 goals to create your personalized workout plan
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            px: 1.5,
            py: 0.5,
            borderRadius: 1,
            backgroundColor: maxGoalsReached
              ? alpha(theme.palette.warning.main, 0.1)
              : alpha(theme.palette.primary.main, 0.1),
          }}
        >
          <Typography
            variant="body2"
            fontWeight={500}
            color={maxGoalsReached ? "warning.main" : "primary.main"}
          >
            {selectedGoals.length} / 3 selected
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={2}>
        {goals.map((goal) => {
          const isSelected = selectedGoals.includes(goal.id);
          const isDisabled = maxGoalsReached && !isSelected;

          return (
            <Grid item xs={12} sm={6} key={goal.id}>
              <Box
                component={m.div}
                whileTap={!isDisabled ? { scale: 0.98 } : {}}
                onClick={() => {
                  if (!isDisabled) {
                    handleCheckboxChange({
                      target: {
                        name: goal.id,
                        checked: !isSelected,
                      },
                    });
                  }
                }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 2,
                  borderRadius: 2,
                  cursor: isDisabled ? "default" : "pointer",
                  border: `1px solid ${
                    isSelected
                      ? theme.palette.primary.main
                      : theme.palette.divider
                  }`,
                  backgroundColor: isSelected
                    ? alpha(theme.palette.primary.main, 0.08)
                    : isDisabled
                    ? alpha(theme.palette.action.disabled, 0.05)
                    : "transparent",
                  transition: "all 0.2s",
                  opacity: isDisabled ? 0.5 : 1,
                  "&:hover": {
                    borderColor: isDisabled
                      ? alpha(theme.palette.action.disabled, 0.3)
                      : isSelected
                      ? theme.palette.primary.main
                      : alpha(theme.palette.primary.main, 0.4),
                    backgroundColor: isDisabled
                      ? alpha(theme.palette.action.disabled, 0.05)
                      : isSelected
                      ? alpha(theme.palette.primary.main, 0.12)
                      : alpha(theme.palette.primary.main, 0.04),
                  },
                }}
              >
                <Box
                  sx={{
                    mr: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: isSelected
                      ? alpha(theme.palette.primary.main, 0.2)
                      : alpha(theme.palette.grey[500], 0.1),
                  }}
                >
                  <Icon
                    icon={goal.icon}
                    width={24}
                    height={24}
                    color={
                      isSelected
                        ? theme.palette.primary.main
                        : theme.palette.text.secondary
                    }
                  />
                </Box>

                <Box sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="subtitle1"
                    color={isSelected ? "primary.main" : "text.primary"}
                    fontWeight={isSelected ? 500 : 400}
                  >
                    {goal.label}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {goal.description}
                  </Typography>
                </Box>

                <Checkbox
                  checked={isSelected}
                  onChange={handleCheckboxChange}
                  icon={<CheckboxIcon />}
                  checkedIcon={<CheckboxCheckedIcon />}
                  name={goal.id}
                  disableRipple
                  disabled={isDisabled}
                  sx={{
                    color: isSelected ? "primary.main" : "action.disabled",
                    "&.Mui-checked": {
                      color: "primary.main",
                    },
                  }}
                />
              </Box>
            </Grid>
          );
        })}
      </Grid>

      {errors.goal && (
        <FormHelperText error sx={{ mt: 2, fontSize: "0.875rem" }}>
          {errors.goal}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default GoalSelection;
