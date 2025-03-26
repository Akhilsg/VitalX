import React from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Checkbox,
  Slider,
  Stack,
  Chip,
  Paper,
  Divider,
  useTheme,
  alpha,
} from "@mui/material";
import { m } from "framer-motion";
import { Icon } from "@iconify/react";

const GoalSpecificQuestions = ({ formData, setFormData }) => {
  const theme = useTheme();
  const selectedGoals = formData.goal.split(",").filter(Boolean);

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      goalSpecificData: {
        ...formData.goalSpecificData,
        [field]: event.target.value,
      },
    });
  };

  const handleCheckboxChange = (field) => (event) => {
    const { checked, name } = event.target;
    const currentValues = formData.goalSpecificData?.[field] || [];

    const updatedValues = checked
      ? [...currentValues, name]
      : currentValues.filter((item) => item !== name);

    setFormData({
      ...formData,
      goalSpecificData: {
        ...formData.goalSpecificData,
        [field]: updatedValues,
      },
    });
  };

  const handleSliderChange = (field) => (event, newValue) => {
    setFormData({
      ...formData,
      goalSpecificData: {
        ...formData.goalSpecificData,
        [field]: newValue,
      },
    });
  };

  // Goal icons mapping
  const goalIcons = {
    "weight-loss": "mdi:weight-lifter",
    "muscle-gain": "mdi:arm-flex",
    strength: "mdi:weight",
    endurance: "mdi:run-fast",
    "sport-specific": "mdi:basketball",
    rehabilitation: "mdi:medical-bag",
    "stress-relief": "mdi:meditation",
    "general-fitness": "mdi:heart-pulse",
  };

  return (
    <Box
      component={m.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Typography variant="h5" sx={{ mb: 2, ml: 1, fontWeight: 600 }}>
        Tell us more about your specific goals
      </Typography>
      <Typography
        variant="body1"
        sx={{ mb: 4, ml: 1, color: "text.secondary" }}
      >
        These details will help us create a more personalized workout plan
        tailored to your exact needs.
      </Typography>

      <Stack spacing={4}>
        {selectedGoals.map((goal, index) => (
          <Paper
            key={goal}
            component={m.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              background: `linear-gradient(145deg, ${alpha(
                theme.palette.background.paper,
                0.6
              )}, ${alpha(theme.palette.background.neutral, 0.4)})`,
              backdropFilter: "blur(8px)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                width: 80,
                height: 80,
                opacity: 0.1,
                transform: "translate(20%, -20%)",
              }}
            >
              <Icon
                icon={goalIcons[goal] || "solar:dumbbell-large-bold"}
                width={80}
                height={80}
              />
            </Box>

            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{ mb: 3 }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  color: "white",
                  boxShadow: `0 4px 12px ${alpha(
                    theme.palette.primary.main,
                    0.3
                  )}`,
                }}
              >
                <Icon
                  icon={goalIcons[goal] || "solar:"}
                  width={24}
                  height={24}
                />
              </Box>
              <Typography variant="h6" fontWeight="bold" color="primary.main">
                {goal === "weight-loss" && "Weight Loss Goals"}
                {goal === "muscle-gain" && "Muscle Building Goals"}
                {goal === "strength" && "Strength Goals"}
                {goal === "endurance" && "Endurance Goals"}
                {goal === "sport-specific" && "Sport-Specific Training"}
                {goal === "rehabilitation" && "Rehabilitation Goals"}
                {goal === "stress-relief" && "Stress Relief Goals"}
                {goal === "general-fitness" && "General Fitness Goals"}
              </Typography>
            </Stack>

            <Divider sx={{ mb: 3, opacity: 0.6 }} />

            {goal === "weight-loss" && (
              <Stack spacing={3}>
                <FormControl component="fieldset" sx={{ width: "100%" }}>
                  <FormLabel
                    component="legend"
                    sx={{ mb: 1, color: "text.primary", fontWeight: 500 }}
                  >
                    How quickly do you want to lose weight?
                  </FormLabel>
                  <RadioGroup
                    value={formData.goalSpecificData?.weightLossSpeed || ""}
                    onChange={handleChange("weightLossSpeed")}
                    sx={{
                      "& .MuiFormControlLabel-root": {
                        borderRadius: 1,
                        my: 0.5,
                        p: 1,
                        transition: "all 0.2s",
                        "&:hover": {
                          background: alpha(theme.palette.primary.main, 0.05),
                        },
                      },
                      "& .Mui-checked + span": {
                        fontWeight: 500,
                      },
                    }}
                  >
                    <FormControlLabel
                      value="gradual"
                      control={<Radio />}
                      label="Gradual (0.5-1 lb per week)"
                    />
                    <FormControlLabel
                      value="moderate"
                      control={<Radio />}
                      label="Moderate (1-2 lbs per week)"
                    />
                    <FormControlLabel
                      value="aggressive"
                      control={<Radio />}
                      label="Aggressive (2+ lbs per week)"
                    />
                  </RadioGroup>
                </FormControl>

                <FormControl component="fieldset" sx={{ width: "100%" }}>
                  <FormLabel
                    component="legend"
                    sx={{ mb: 1, color: "text.primary", fontWeight: 500 }}
                  >
                    Do you prefer cardio or resistance training for weight loss?
                  </FormLabel>
                  <RadioGroup
                    value={
                      formData.goalSpecificData?.weightLossPreference || ""
                    }
                    onChange={handleChange("weightLossPreference")}
                    sx={{
                      "& .MuiFormControlLabel-root": {
                        borderRadius: 1,
                        my: 0.5,
                        p: 1,
                        transition: "all 0.2s",
                        "&:hover": {
                          background: alpha(theme.palette.primary.main, 0.05),
                        },
                      },
                    }}
                  >
                    <FormControlLabel
                      value="mostly-cardio"
                      control={<Radio />}
                      label="Mostly cardio"
                    />
                    <FormControlLabel
                      value="mostly-resistance"
                      control={<Radio />}
                      label="Mostly resistance training"
                    />
                    <FormControlLabel
                      value="balanced"
                      control={<Radio />}
                      label="Balanced approach"
                    />
                  </RadioGroup>
                </FormControl>
              </Stack>
            )}

            {goal === "muscle-gain" && (
              <Stack spacing={3}>
                <FormControl component="fieldset" sx={{ width: "100%" }}>
                  <FormLabel
                    component="legend"
                    sx={{ mb: 1, color: "text.primary", fontWeight: 500 }}
                  >
                    Which muscle groups are your priority?
                  </FormLabel>
                  <Box
                    sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}
                  >
                    {["Arms", "Chest", "Back", "Shoulders", "Legs", "Core"].map(
                      (muscle) => (
                        <Chip
                          key={muscle}
                          label={muscle}
                          onClick={() => {
                            const current =
                              formData.goalSpecificData?.priorityMuscles || [];
                            const updated = current.includes(muscle)
                              ? current.filter((m) => m !== muscle)
                              : [...current, muscle];

                            setFormData({
                              ...formData,
                              goalSpecificData: {
                                ...formData.goalSpecificData,
                                priorityMuscles: updated,
                              },
                            });
                          }}
                          color={
                            formData.goalSpecificData?.priorityMuscles?.includes(
                              muscle
                            )
                              ? "primary"
                              : "default"
                          }
                          variant={
                            formData.goalSpecificData?.priorityMuscles?.includes(
                              muscle
                            )
                              ? "filled"
                              : "outlined"
                          }
                          sx={{
                            py: 2.5,
                            borderRadius: 2,
                            transition: "all 0.2s",
                            "&:hover": {
                              boxShadow: `0 4px 8px ${alpha(
                                theme.palette.primary.main,
                                0.2
                              )}`,
                            },
                            ...(formData.goalSpecificData?.priorityMuscles?.includes(
                              muscle
                            ) && {
                              boxShadow: `0 4px 8px ${alpha(
                                theme.palette.primary.main,
                                0.3
                              )}`,
                            }),
                          }}
                        />
                      )
                    )}
                  </Box>
                </FormControl>

                <FormControl component="fieldset" sx={{ width: "100%" }}>
                  <FormLabel
                    component="legend"
                    sx={{ mb: 1, color: "text.primary", fontWeight: 500 }}
                  >
                    How many days per week can you train?
                  </FormLabel>
                  <RadioGroup
                    value={formData.goalSpecificData?.trainingFrequency || ""}
                    onChange={handleChange("trainingFrequency")}
                    sx={{
                      "& .MuiFormControlLabel-root": {
                        borderRadius: 1,
                        my: 0.5,
                        p: 1,
                        transition: "all 0.2s",
                        "&:hover": {
                          background: alpha(theme.palette.primary.main, 0.05),
                        },
                      },
                    }}
                  >
                    <FormControlLabel
                      value="2-3"
                      control={<Radio />}
                      label="2-3 days per week"
                    />
                    <FormControlLabel
                      value="4-5"
                      control={<Radio />}
                      label="4-5 days per week"
                    />
                    <FormControlLabel
                      value="6+"
                      control={<Radio />}
                      label="6+ days per week"
                    />
                  </RadioGroup>
                </FormControl>

                <FormControl component="fieldset" sx={{ width: "100%" }}>
                  <FormLabel
                    component="legend"
                    sx={{ mb: 1, color: "text.primary", fontWeight: 500 }}
                  >
                    What is your preferred training style?
                  </FormLabel>
                  <RadioGroup
                    value={formData.goalSpecificData?.trainingStyle || ""}
                    onChange={handleChange("trainingStyle")}
                    sx={{
                      "& .MuiFormControlLabel-root": {
                        borderRadius: 1,
                        my: 0.5,
                        p: 1,
                        transition: "all 0.2s",
                        "&:hover": {
                          background: alpha(theme.palette.primary.main, 0.05),
                        },
                      },
                    }}
                  >
                    <FormControlLabel
                      value="volume"
                      control={<Radio />}
                      label="High volume (more sets and reps)"
                    />
                    <FormControlLabel
                      value="intensity"
                      control={<Radio />}
                      label="High intensity (heavier weights, fewer reps)"
                    />
                    <FormControlLabel
                      value="balanced"
                      control={<Radio />}
                      label="Balanced approach"
                    />
                  </RadioGroup>
                </FormControl>

                <FormControl component="fieldset" sx={{ width: "100%" }}>
                  <FormLabel
                    component="legend"
                    sx={{ mb: 1, color: "text.primary", fontWeight: 500 }}
                  >
                    Do you have any specific muscle building techniques you
                    prefer?
                  </FormLabel>
                  <Box
                    sx={{
                      mt: 1,
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                      gap: 1,
                    }}
                  >
                    {[
                      {
                        name: "supersets",
                        label: "Supersets",
                        icon: "mdi:repeat",
                      },
                      {
                        name: "dropsets",
                        label: "Drop Sets",
                        icon: "mdi:arrow-down-bold",
                      },
                      {
                        name: "giantsets",
                        label: "Giant Sets",
                        icon: "mdi:repeat-variant",
                      },
                      {
                        name: "restpause",
                        label: "Rest-Pause",
                        icon: "mdi:timer-pause",
                      },
                      {
                        name: "pyramidsets",
                        label: "Pyramid Sets",
                        icon: "mdi:triangle",
                      },
                      {
                        name: "traditional",
                        label: "Traditional Sets",
                        icon: "solar:",
                      },
                    ].map((technique) => (
                      <Paper
                        key={technique.name}
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          border: `1px solid ${
                            formData.goalSpecificData?.techniques?.includes(
                              technique.name
                            )
                              ? theme.palette.primary.main
                              : theme.palette.divider
                          }`,
                          background:
                            formData.goalSpecificData?.techniques?.includes(
                              technique.name
                            )
                              ? alpha(theme.palette.primary.main, 0.1)
                              : "transparent",
                          transition: "all 0.2s",
                          cursor: "pointer",
                          "&:hover": {
                            borderColor: theme.palette.primary.main,
                            background: alpha(theme.palette.primary.main, 0.05),
                          },
                        }}
                        onClick={() => {
                          const current =
                            formData.goalSpecificData?.techniques || [];
                          const updated = current.includes(technique.name)
                            ? current.filter((item) => item !== technique.name)
                            : [...current, technique.name];

                          setFormData({
                            ...formData,
                            goalSpecificData: {
                              ...formData.goalSpecificData,
                              techniques: updated,
                            },
                          });
                        }}
                      >
                        <Icon
                          icon={technique.icon}
                          width={24}
                          height={24}
                          color={
                            formData.goalSpecificData?.techniques?.includes(
                              technique.name
                            )
                              ? theme.palette.primary.main
                              : theme.palette.text.secondary
                          }
                          style={{ marginRight: theme.spacing(1.5) }}
                        />
                        <Typography
                          variant="body1"
                          color={
                            formData.goalSpecificData?.techniques?.includes(
                              technique.name
                            )
                              ? "primary.main"
                              : "text.primary"
                          }
                          fontWeight={
                            formData.goalSpecificData?.techniques?.includes(
                              technique.name
                            )
                              ? 500
                              : 400
                          }
                        >
                          {technique.label}
                        </Typography>
                      </Paper>
                    ))}
                  </Box>
                </FormControl>

                <FormControl component="fieldset" sx={{ width: "100%" }}>
                  <FormLabel
                    component="legend"
                    sx={{ mb: 1, color: "text.primary", fontWeight: 500 }}
                  >
                    How would you rate your recovery ability?
                  </FormLabel>
                  <Box sx={{ width: "90%", margin: "auto" }}>
                    <Slider
                      value={formData.goalSpecificData?.recoveryAbility || 3}
                      onChange={handleSliderChange("recoveryAbility")}
                      valueLabelDisplay="auto"
                      step={1}
                      marks={[
                        { value: 1, label: "Slow" },
                        { value: 3, label: "Average" },
                        { value: 5, label: "Fast" },
                      ]}
                      min={1}
                      max={5}
                      sx={{
                        "& .MuiSlider-markLabel": {
                          fontSize: "0.75rem",
                        },
                      }}
                    />
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1, textAlign: "center" }}
                  >
                    This affects how much rest you need between workouts
                  </Typography>
                </FormControl>
              </Stack>
            )}

            {goal === "strength" && (
              <Stack spacing={3}>
                <FormControl component="fieldset" sx={{ width: "100%" }}>
                  <FormLabel
                    component="legend"
                    sx={{ mb: 1, color: "text.primary", fontWeight: 500 }}
                  >
                    Which strength areas do you want to focus on?
                  </FormLabel>
                  <Box
                    sx={{
                      mt: 1,
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                      gap: 1,
                    }}
                  >
                    {[
                      {
                        name: "bench",
                        label: "Bench Press",
                        icon: "mdi:weight-lifter",
                      },
                      {
                        name: "squat",
                        label: "Squat",
                        icon: "mdi:human-handsdown",
                      },
                      {
                        name: "deadlift",
                        label: "Deadlift",
                        icon: "mdi:weight",
                      },
                      {
                        name: "overhead",
                        label: "Overhead Press",
                        icon: "mdi:arm-flex",
                      },
                      {
                        name: "pullups",
                        label: "Pull-ups",
                        icon: "mdi:human-handsup",
                      },
                      {
                        name: "core",
                        label: "Core Strength",
                        icon: "mdi:human",
                      },
                    ].map((lift) => (
                      <Paper
                        key={lift.name}
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          border: `1px solid ${
                            formData.goalSpecificData?.strengthFocus?.includes(
                              lift.name
                            )
                              ? theme.palette.primary.main
                              : theme.palette.divider
                          }`,
                          background:
                            formData.goalSpecificData?.strengthFocus?.includes(
                              lift.name
                            )
                              ? alpha(theme.palette.primary.main, 0.1)
                              : "transparent",
                          transition: "all 0.2s",
                          cursor: "pointer",
                          "&:hover": {
                            borderColor: theme.palette.primary.main,
                            background: alpha(theme.palette.primary.main, 0.05),
                          },
                        }}
                        onClick={() => {
                          const current =
                            formData.goalSpecificData?.strengthFocus || [];
                          const updated = current.includes(lift.name)
                            ? current.filter((item) => item !== lift.name)
                            : [...current, lift.name];

                          setFormData({
                            ...formData,
                            goalSpecificData: {
                              ...formData.goalSpecificData,
                              strengthFocus: updated,
                            },
                          });
                        }}
                      >
                        <Box sx={{ mr: 1.5 }}>
                          <Icon
                            icon={lift.icon}
                            width={24}
                            height={24}
                            color={
                              formData.goalSpecificData?.strengthFocus?.includes(
                                lift.name
                              )
                                ? theme.palette.primary.main
                                : theme.palette.text.secondary
                            }
                          />
                        </Box>
                        <Typography
                          variant="body1"
                          color={
                            formData.goalSpecificData?.strengthFocus?.includes(
                              lift.name
                            )
                              ? "primary.main"
                              : "text.primary"
                          }
                          fontWeight={
                            formData.goalSpecificData?.strengthFocus?.includes(
                              lift.name
                            )
                              ? 500
                              : 400
                          }
                        >
                          {lift.label}
                        </Typography>
                      </Paper>
                    ))}
                  </Box>
                </FormControl>

                <FormControl component="fieldset" sx={{ width: "100%" }}>
                  <FormLabel
                    component="legend"
                    sx={{ mb: 1, color: "text.primary", fontWeight: 500 }}
                  >
                    What is your primary strength goal?
                  </FormLabel>
                  <RadioGroup
                    value={formData.goalSpecificData?.strengthGoal || ""}
                    onChange={handleChange("strengthGoal")}
                    sx={{
                      "& .MuiFormControlLabel-root": {
                        borderRadius: 1,
                        my: 0.5,
                        p: 1,
                        transition: "all 0.2s",
                        "&:hover": {
                          background: alpha(theme.palette.primary.main, 0.05),
                        },
                      },
                    }}
                  >
                    <FormControlLabel
                      value="max-strength"
                      control={<Radio />}
                      label="Maximum strength (1-5 rep range)"
                    />
                    <FormControlLabel
                      value="hypertrophy"
                      control={<Radio />}
                      label="Hypertrophy/muscle building (8-12 rep range)"
                    />
                    <FormControlLabel
                      value="strength-endurance"
                      control={<Radio />}
                      label="Strength endurance (15+ rep range)"
                    />
                    <FormControlLabel
                      value="functional-strength"
                      control={<Radio />}
                      label="Functional strength for daily activities"
                    />
                  </RadioGroup>
                </FormControl>

                <FormControl component="fieldset" sx={{ width: "100%" }}>
                  <FormLabel
                    component="legend"
                    sx={{ mb: 1, color: "text.primary", fontWeight: 500 }}
                  >
                    How would you rate your current strength level?
                  </FormLabel>
                  <Box sx={{ width: "90%", margin: "auto" }}>
                    <Slider
                      value={
                        formData.goalSpecificData?.currentStrengthLevel || 3
                      }
                      onChange={handleSliderChange("currentStrengthLevel")}
                      valueLabelDisplay="auto"
                      step={1}
                      marks={[
                        { value: 1, label: "Beginner" },
                        { value: 3, label: "Intermediate" },
                        { value: 5, label: "Advanced" },
                      ]}
                      min={1}
                      max={5}
                      slotProps={{
                        track: {
                          sx: {
                            marginLeft: "-1%",
                          },
                        },
                      }}
                      sx={{
                        "& .MuiSlider-markLabel": {
                          fontSize: "0.75rem",
                        },
                        "& .MuiSlider-mark:first-of-type + .MuiSlider-markLabel":
                          {
                            transform: "translateX(10%)",
                            left: "10%",
                          },
                        "& .MuiSlider-mark:last-of-type + .MuiSlider-markLabel":
                          {
                            transform: "translateX(-100%)",
                            left: "100%",
                          },
                      }}
                    />
                  </Box>
                </FormControl>

                <FormControl component="fieldset" sx={{ width: "100%" }}>
                  <FormLabel
                    component="legend"
                    sx={{ mb: 1, color: "text.primary", fontWeight: 500 }}
                  >
                    What equipment do you have access to?
                  </FormLabel>
                  <Box
                    sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}
                  >
                    {[
                      { name: "barbell", label: "Barbell" },
                      { name: "dumbbells", label: "Dumbbells" },
                      { name: "machines", label: "Weight Machines" },
                      { name: "cables", label: "Cable System" },
                      { name: "kettlebells", label: "Kettlebells" },
                      { name: "bodyweight", label: "Bodyweight Only" },
                      { name: "bands", label: "Resistance Bands" },
                    ].map((equipment) => (
                      <Chip
                        key={equipment.name}
                        label={equipment.label}
                        onClick={() => {
                          const current =
                            formData.goalSpecificData?.equipment || [];
                          const updated = current.includes(equipment.name)
                            ? current.filter((a) => a !== equipment.name)
                            : [...current, equipment.name];

                          setFormData({
                            ...formData,
                            goalSpecificData: {
                              ...formData.goalSpecificData,
                              equipment: updated,
                            },
                          });
                        }}
                        color={
                          formData.goalSpecificData?.equipment?.includes(
                            equipment.name
                          )
                            ? "primary"
                            : "default"
                        }
                        variant={
                          formData.goalSpecificData?.equipment?.includes(
                            equipment.name
                          )
                            ? "filled"
                            : "outlined"
                        }
                        sx={{
                          py: 2.5,
                          borderRadius: 2,
                          transition: "all 0.2s",
                          "&:hover": {
                            boxShadow: `0 4px 8px ${alpha(
                              theme.palette.primary.main,
                              0.2
                            )}`,
                          },
                          ...(formData.goalSpecificData?.equipment?.includes(
                            equipment.name
                          ) && {
                            boxShadow: `0 4px 8px ${alpha(
                              theme.palette.primary.main,
                              0.3
                            )}`,
                          }),
                        }}
                      />
                    ))}
                  </Box>
                </FormControl>

                <FormControl component="fieldset" sx={{ width: "100%" }}>
                  <FormLabel
                    component="legend"
                    sx={{ mb: 1, color: "text.primary", fontWeight: 500 }}
                  >
                    How many days per week can you dedicate to strength
                    training?
                  </FormLabel>
                  <RadioGroup
                    value={formData.goalSpecificData?.strengthFrequency || ""}
                    onChange={handleChange("strengthFrequency")}
                    sx={{
                      "& .MuiFormControlLabel-root": {
                        borderRadius: 1,
                        my: 0.5,
                        p: 1,
                        transition: "all 0.2s",
                        "&:hover": {
                          background: alpha(theme.palette.primary.main, 0.05),
                        },
                      },
                    }}
                  >
                    <FormControlLabel
                      value="2-days"
                      control={<Radio />}
                      label="1-2 days per week"
                    />
                    <FormControlLabel
                      value="3-4-days"
                      control={<Radio />}
                      label="3-4 days per week"
                    />
                    <FormControlLabel
                      value="5-6-days"
                      control={<Radio />}
                      label="5-6 days per week"
                    />
                  </RadioGroup>
                </FormControl>
              </Stack>
            )}

            {goal === "endurance" && (
              <Stack spacing={3}>
                <FormControl component="fieldset" sx={{ width: "100%" }}>
                  <FormLabel
                    component="legend"
                    sx={{ mb: 1, color: "text.primary", fontWeight: 500 }}
                  >
                    What type of endurance are you focusing on?
                  </FormLabel>
                  <RadioGroup
                    value={formData.goalSpecificData?.enduranceType || ""}
                    onChange={handleChange("enduranceType")}
                    sx={{
                      "& .MuiFormControlLabel-root": {
                        borderRadius: 1,
                        my: 0.5,
                        p: 1,
                        transition: "all 0.2s",
                        "&:hover": {
                          background: alpha(theme.palette.primary.main, 0.05),
                        },
                      },
                    }}
                  >
                    <FormControlLabel
                      value="cardiovascular"
                      control={<Radio />}
                      label="Cardiovascular (running, cycling, etc.)"
                    />
                    <FormControlLabel
                      value="muscular"
                      control={<Radio />}
                      label="Muscular endurance (high-rep training)"
                    />
                    <FormControlLabel
                      value="both"
                      control={<Radio />}
                      label="Both types"
                    />
                  </RadioGroup>
                </FormControl>

                <Box>
                  <FormLabel
                    component="legend"
                    sx={{ mb: 1, color: "text.primary", fontWeight: 500 }}
                  >
                    Current endurance level (minutes of continuous activity)
                  </FormLabel>
                  <Box sx={{ px: 1 }}>
                    <Slider
                      value={formData.goalSpecificData?.currentEndurance || 30}
                      onChange={handleSliderChange("currentEndurance")}
                      valueLabelDisplay="auto"
                      step={5}
                      marks={[
                        { value: 5, label: "5" },
                        { value: 30, label: "30" },
                        { value: 60, label: "60" },
                        { value: 90, label: "90" },
                      ]}
                      min={5}
                      max={90}
                    />
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1, textAlign: "center" }}
                  >
                    {formData.goalSpecificData?.currentEndurance || 30} minutes
                  </Typography>
                </Box>
              </Stack>
            )}

            {goal === "sport-specific" && (
              <Stack spacing={3}>
                <FormControl component="fieldset" sx={{ width: "100%" }}>
                  <FormLabel
                    component="legend"
                    sx={{ mb: 1, color: "text.primary", fontWeight: 500 }}
                  >
                    Which sport are you training for?
                  </FormLabel>
                  <RadioGroup
                    value={formData.goalSpecificData?.sport || ""}
                    onChange={handleChange("sport")}
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                      gap: 1,
                      "& .MuiFormControlLabel-root": {
                        margin: 0,
                      },
                    }}
                  >
                    {[
                      {
                        value: "basketball",
                        label: "Basketball",
                        icon: "mdi:basketball",
                      },
                      { value: "soccer", label: "Soccer", icon: "mdi:soccer" },
                      { value: "running", label: "Running", icon: "mdi:run" },
                      {
                        value: "swimming",
                        label: "Swimming",
                        icon: "mdi:swim",
                      },
                      { value: "tennis", label: "Tennis", icon: "mdi:tennis" },
                      { value: "cycling", label: "Cycling", icon: "mdi:bike" },
                      { value: "golf", label: "Golf", icon: "mdi:golf" },
                      {
                        value: "other",
                        label: "Other",
                        icon: "mdi:dots-horizontal",
                      },
                    ].map((sport) => (
                      <Paper
                        key={sport.value}
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          border: `1px solid ${
                            formData.goalSpecificData?.sport === sport.value
                              ? theme.palette.primary.main
                              : theme.palette.divider
                          }`,
                          background:
                            formData.goalSpecificData?.sport === sport.value
                              ? alpha(theme.palette.primary.main, 0.1)
                              : "transparent",
                          transition: "all 0.2s",
                          cursor: "pointer",
                          "&:hover": {
                            borderColor: theme.palette.primary.main,
                            background: alpha(theme.palette.primary.main, 0.05),
                          },
                        }}
                        onClick={() => {
                          setFormData({
                            ...formData,
                            goalSpecificData: {
                              ...formData.goalSpecificData,
                              sport: sport.value,
                            },
                          });
                        }}
                      >
                        <Box sx={{ mr: 1.5 }}>
                          <Icon
                            icon={sport.icon}
                            width={24}
                            height={24}
                            color={
                              formData.goalSpecificData?.sport === sport.value
                                ? theme.palette.primary.main
                                : theme.palette.text.secondary
                            }
                          />
                        </Box>
                        <Typography
                          variant="body1"
                          color={
                            formData.goalSpecificData?.sport === sport.value
                              ? "primary.main"
                              : "text.primary"
                          }
                          fontWeight={
                            formData.goalSpecificData?.sport === sport.value
                              ? 500
                              : 400
                          }
                        >
                          {sport.label}
                        </Typography>
                      </Paper>
                    ))}
                  </RadioGroup>
                </FormControl>

                {formData.goalSpecificData?.sport === "other" && (
                  <TextField
                    fullWidth
                    label="Specify your sport"
                    variant="outlined"
                    value={formData.goalSpecificData?.otherSport || ""}
                    onChange={handleChange("otherSport")}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                )}

                <FormControl component="fieldset" sx={{ width: "100%" }}>
                  <FormLabel
                    component="legend"
                    sx={{ mb: 1, color: "text.primary", fontWeight: 500 }}
                  >
                    Which aspects of performance do you want to improve?
                  </FormLabel>
                  <Box
                    sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}
                  >
                    {[
                      { name: "speed", label: "Speed" },
                      { name: "power", label: "Power" },
                      { name: "agility", label: "Agility" },
                      { name: "coordination", label: "Coordination" },
                      { name: "reaction-time", label: "Reaction Time" },
                      { name: "sport-endurance", label: "Sport Endurance" },
                    ].map((aspect) => (
                      <Chip
                        key={aspect.name}
                        label={aspect.label}
                        onClick={() => {
                          const current =
                            formData.goalSpecificData?.sportAspects || [];
                          const updated = current.includes(aspect.name)
                            ? current.filter((a) => a !== aspect.name)
                            : [...current, aspect.name];

                          setFormData({
                            ...formData,
                            goalSpecificData: {
                              ...formData.goalSpecificData,
                              sportAspects: updated,
                            },
                          });
                        }}
                        color={
                          formData.goalSpecificData?.sportAspects?.includes(
                            aspect.name
                          )
                            ? "primary"
                            : "default"
                        }
                        variant={
                          formData.goalSpecificData?.sportAspects?.includes(
                            aspect.name
                          )
                            ? "filled"
                            : "outlined"
                        }
                        sx={{
                          py: 2.5,
                          borderRadius: 2,
                          transition: "all 0.2s",
                          "&:hover": {
                            boxShadow: `0 4px 8px ${alpha(
                              theme.palette.primary.main,
                              0.2
                            )}`,
                          },
                          ...(formData.goalSpecificData?.sportAspects?.includes(
                            aspect.name
                          ) && {
                            boxShadow: `0 4px 8px ${alpha(
                              theme.palette.primary.main,
                              0.3
                            )}`,
                          }),
                        }}
                      />
                    ))}
                  </Box>
                </FormControl>
              </Stack>
            )}

            {goal === "rehabilitation" && (
              <Stack spacing={3}>
                <FormControl component="fieldset" sx={{ width: "100%" }}>
                  <FormLabel
                    component="legend"
                    sx={{ mb: 1, color: "text.primary", fontWeight: 500 }}
                  >
                    Which area needs rehabilitation?
                  </FormLabel>
                  <RadioGroup
                    value={formData.goalSpecificData?.rehabArea || ""}
                    onChange={handleChange("rehabArea")}
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                      gap: 1,
                      "& .MuiFormControlLabel-root": {
                        margin: 0,
                      },
                    }}
                  >
                    {[
                      { value: "knee", label: "Knee", icon: "mdi:knee" },
                      {
                        value: "shoulder",
                        label: "Shoulder",
                        icon: "mdi:arm-flex",
                      },
                      { value: "back", label: "Back", icon: "mdi:human-male" },
                      {
                        value: "ankle",
                        label: "Ankle",
                        icon: "mdi:foot-print",
                      },
                      { value: "hip", label: "Hip", icon: "mdi:human-male" },
                      { value: "elbow", label: "Elbow", icon: "mdi:arm-flex" },
                      {
                        value: "wrist",
                        label: "Wrist",
                        icon: "mdi:hand-front-right",
                      },
                      {
                        value: "other",
                        label: "Other",
                        icon: "mdi:dots-horizontal",
                      },
                    ].map((area) => (
                      <Paper
                        key={area.value}
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          border: `1px solid ${
                            formData.goalSpecificData?.rehabArea === area.value
                              ? theme.palette.primary.main
                              : theme.palette.divider
                          }`,
                          background:
                            formData.goalSpecificData?.rehabArea === area.value
                              ? alpha(theme.palette.primary.main, 0.1)
                              : "transparent",
                          transition: "all 0.2s",
                          cursor: "pointer",
                          "&:hover": {
                            borderColor: theme.palette.primary.main,
                            background: alpha(theme.palette.primary.main, 0.05),
                          },
                        }}
                        onClick={() => {
                          setFormData({
                            ...formData,
                            goalSpecificData: {
                              ...formData.goalSpecificData,
                              rehabArea: area.value,
                            },
                          });
                        }}
                      >
                        <Box sx={{ mr: 1.5 }}>
                          <Icon
                            icon={area.icon}
                            width={24}
                            height={24}
                            color={
                              formData.goalSpecificData?.rehabArea ===
                              area.value
                                ? theme.palette.primary.main
                                : theme.palette.text.secondary
                            }
                          />
                        </Box>
                        <Typography
                          variant="body1"
                          color={
                            formData.goalSpecificData?.rehabArea === area.value
                              ? "primary.main"
                              : "text.primary"
                          }
                          fontWeight={
                            formData.goalSpecificData?.rehabArea === area.value
                              ? 500
                              : 400
                          }
                        >
                          {area.label}
                        </Typography>
                      </Paper>
                    ))}
                  </RadioGroup>
                </FormControl>

                {formData.goalSpecificData?.rehabArea === "other" && (
                  <TextField
                    fullWidth
                    label="Specify the area needing rehabilitation"
                    variant="outlined"
                    value={formData.goalSpecificData?.otherRehabArea || ""}
                    onChange={handleChange("otherRehabArea")}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                )}

                <FormControl component="fieldset" sx={{ width: "100%" }}>
                  <FormLabel
                    component="legend"
                    sx={{ mb: 1, color: "text.primary", fontWeight: 500 }}
                  >
                    Have you received medical clearance to exercise?
                  </FormLabel>
                  <RadioGroup
                    value={formData.goalSpecificData?.medicalClearance || ""}
                    onChange={handleChange("medicalClearance")}
                    sx={{
                      "& .MuiFormControlLabel-root": {
                        borderRadius: 1,
                        my: 0.5,
                        p: 1,
                        transition: "all 0.2s",
                        "&:hover": {
                          background: alpha(theme.palette.primary.main, 0.05),
                        },
                      },
                    }}
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Yes, I have medical clearance"
                    />
                    <FormControlLabel
                      value="limited"
                      control={<Radio />}
                      label="Yes, with limitations"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="No, not yet"
                    />
                  </RadioGroup>
                </FormControl>
              </Stack>
            )}

            {goal === "stress-relief" && (
              <Stack spacing={3}>
                <FormControl component="fieldset" sx={{ width: "100%" }}>
                  <FormLabel
                    component="legend"
                    sx={{ mb: 1, color: "text.primary", fontWeight: 500 }}
                  >
                    Which activities do you find most relaxing?
                  </FormLabel>
                  <Box
                    sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}
                  >
                    {[
                      { name: "yoga", label: "Yoga", icon: "mdi:yoga" },
                      { name: "walking", label: "Walking", icon: "mdi:walk" },
                      {
                        name: "stretching",
                        label: "Stretching",
                        icon: "mdi:human-handsup",
                      },
                      {
                        name: "meditation",
                        label: "Meditation",
                        icon: "mdi:meditation",
                      },
                      { name: "swimming", label: "Swimming", icon: "mdi:swim" },
                      { name: "cycling", label: "Cycling", icon: "mdi:bike" },
                    ].map((activity) => (
                      <Paper
                        key={activity.name}
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          border: `1px solid ${
                            formData.goalSpecificData?.relaxingActivities?.includes(
                              activity.name
                            )
                              ? theme.palette.primary.main
                              : theme.palette.divider
                          }`,
                          background:
                            formData.goalSpecificData?.relaxingActivities?.includes(
                              activity.name
                            )
                              ? alpha(theme.palette.primary.main, 0.1)
                              : "transparent",
                          transition: "all 0.2s",
                          cursor: "pointer",
                          "&:hover": {
                            borderColor: theme.palette.primary.main,
                            background: alpha(theme.palette.primary.main, 0.05),
                          },
                        }}
                        onClick={() => {
                          const current =
                            formData.goalSpecificData?.relaxingActivities || [];
                          const updated = current.includes(activity.name)
                            ? current.filter((a) => a !== activity.name)
                            : [...current, activity.name];

                          setFormData({
                            ...formData,
                            goalSpecificData: {
                              ...formData.goalSpecificData,
                              relaxingActivities: updated,
                            },
                          });
                        }}
                      >
                        <Box sx={{ mr: 1.5 }}>
                          <Icon
                            icon={activity.icon}
                            width={24}
                            height={24}
                            color={
                              formData.goalSpecificData?.relaxingActivities?.includes(
                                activity.name
                              )
                                ? theme.palette.primary.main
                                : theme.palette.text.secondary
                            }
                          />
                        </Box>
                        <Typography
                          variant="body1"
                          color={
                            formData.goalSpecificData?.relaxingActivities?.includes(
                              activity.name
                            )
                              ? "primary.main"
                              : "text.primary"
                          }
                          fontWeight={
                            formData.goalSpecificData?.relaxingActivities?.includes(
                              activity.name
                            )
                              ? 500
                              : 400
                          }
                        >
                          {activity.label}
                        </Typography>
                      </Paper>
                    ))}
                  </Box>
                </FormControl>

                <FormControl component="fieldset" sx={{ width: "100%" }}>
                  <FormLabel
                    component="legend"
                    sx={{ mb: 1, color: "text.primary", fontWeight: 500 }}
                  >
                    How often would you like to include stress-relief
                    activities?
                  </FormLabel>
                  <RadioGroup
                    value={
                      formData.goalSpecificData?.stressReliefFrequency || ""
                    }
                    onChange={handleChange("stressReliefFrequency")}
                    sx={{
                      "& .MuiFormControlLabel-root": {
                        borderRadius: 1,
                        my: 0.5,
                        p: 1,
                        transition: "all 0.2s",
                        "&:hover": {
                          background: alpha(theme.palette.primary.main, 0.05),
                        },
                      },
                    }}
                  >
                    <FormControlLabel
                      value="daily"
                      control={<Radio />}
                      label="Daily"
                    />
                    <FormControlLabel
                      value="few-times-week"
                      control={<Radio />}
                      label="A few times per week"
                    />
                    <FormControlLabel
                      value="once-week"
                      control={<Radio />}
                      label="Once per week"
                    />
                  </RadioGroup>
                </FormControl>
              </Stack>
            )}

            {goal === "general-fitness" && (
              <Stack spacing={3}>
                <FormControl component="fieldset" sx={{ width: "100%" }}>
                  <FormLabel
                    component="legend"
                    sx={{ mb: 1, color: "text.primary", fontWeight: 500 }}
                  >
                    What aspects of fitness are most important to you?
                  </FormLabel>
                  <Box
                    sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}
                  >
                    {[
                      {
                        name: "overall-health",
                        label: "Overall Health",
                        icon: "mdi:heart-pulse",
                      },
                      {
                        name: "energy-levels",
                        label: "Energy Levels",
                        icon: "mdi:lightning-bolt",
                      },
                      {
                        name: "functional-fitness",
                        label: "Functional Fitness",
                        icon: "mdi:human-handsup",
                      },
                      {
                        name: "appearance",
                        label: "Physical Appearance",
                        icon: "mdi:account",
                      },
                      {
                        name: "longevity",
                        label: "Longevity",
                        icon: "mdi:clock-time-eight",
                      },
                      {
                        name: "mood",
                        label: "Mood Improvement",
                        icon: "mdi:emoticon",
                      },
                    ].map((aspect) => (
                      <Paper
                        key={aspect.name}
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          border: `1px solid ${
                            formData.goalSpecificData?.fitnessAspects?.includes(
                              aspect.name
                            )
                              ? theme.palette.primary.main
                              : theme.palette.divider
                          }`,
                          background:
                            formData.goalSpecificData?.fitnessAspects?.includes(
                              aspect.name
                            )
                              ? alpha(theme.palette.primary.main, 0.1)
                              : "transparent",
                          transition: "all 0.2s",
                          cursor: "pointer",
                          "&:hover": {
                            borderColor: theme.palette.primary.main,
                            background: alpha(theme.palette.primary.main, 0.05),
                          },
                        }}
                        onClick={() => {
                          const current =
                            formData.goalSpecificData?.fitnessAspects || [];
                          const updated = current.includes(aspect.name)
                            ? current.filter((a) => a !== aspect.name)
                            : [...current, aspect.name];

                          setFormData({
                            ...formData,
                            goalSpecificData: {
                              ...formData.goalSpecificData,
                              fitnessAspects: updated,
                            },
                          });
                        }}
                      >
                        <Box sx={{ mr: 1.5 }}>
                          <Icon
                            icon={aspect.icon}
                            width={24}
                            height={24}
                            color={
                              formData.goalSpecificData?.fitnessAspects?.includes(
                                aspect.name
                              )
                                ? theme.palette.primary.main
                                : theme.palette.text.secondary
                            }
                          />
                        </Box>
                        <Typography
                          variant="body1"
                          color={
                            formData.goalSpecificData?.fitnessAspects?.includes(
                              aspect.name
                            )
                              ? "primary.main"
                              : "text.primary"
                          }
                          fontWeight={
                            formData.goalSpecificData?.fitnessAspects?.includes(
                              aspect.name
                            )
                              ? 500
                              : 400
                          }
                        >
                          {aspect.label}
                        </Typography>
                      </Paper>
                    ))}
                  </Box>
                </FormControl>

                <FormControl component="fieldset" sx={{ width: "100%" }}>
                  <FormLabel
                    component="legend"
                    sx={{ mb: 1, color: "text.primary", fontWeight: 500 }}
                  >
                    How would you describe your current activity level?
                  </FormLabel>
                  <Box sx={{ width: "90%", margin: "auto" }}>
                    <Slider
                      value={
                        formData.goalSpecificData?.currentActivityLevel || 3
                      }
                      onChange={handleSliderChange("currentActivityLevel")}
                      valueLabelDisplay="auto"
                      step={1}
                      marks={[
                        { value: 1, label: "Sedentary" },
                        { value: 3, label: "Moderate" },
                        { value: 5, label: "Very Active" },
                      ]}
                      min={1}
                      max={5}
                      slotProps={{
                        track: {
                          sx: {
                            marginLeft: "-1%",
                          },
                        },
                      }}
                      sx={{
                        "& .MuiSlider-markLabel": {
                          fontSize: "0.75rem",
                        },
                        "& .MuiSlider-mark:first-of-type + .MuiSlider-markLabel":
                          {
                            transform: "translateX(10%)",
                            left: "10%",
                          },
                        "& .MuiSlider-mark:last-of-type + .MuiSlider-markLabel":
                          {
                            transform: "translateX(-100%)",
                            left: "100%",
                          },
                      }}
                    />
                  </Box>
                </FormControl>

                <FormControl component="fieldset" sx={{ width: "100%" }}>
                  <FormLabel
                    component="legend"
                    sx={{ mb: 1, color: "text.primary", fontWeight: 500 }}
                  >
                    What type of workouts do you enjoy most?
                  </FormLabel>
                  <RadioGroup
                    value={
                      formData.goalSpecificData?.preferredWorkoutType || ""
                    }
                    onChange={handleChange("preferredWorkoutType")}
                    sx={{
                      "& .MuiFormControlLabel-root": {
                        borderRadius: 1,
                        my: 0.5,
                        p: 1,
                        transition: "all 0.2s",
                        "&:hover": {
                          background: alpha(theme.palette.primary.main, 0.05),
                        },
                      },
                    }}
                  >
                    <FormControlLabel
                      value="variety"
                      control={<Radio />}
                      label="Variety (mix of different activities)"
                    />
                    <FormControlLabel
                      value="structured"
                      control={<Radio />}
                      label="Structured (consistent routine)"
                    />
                    <FormControlLabel
                      value="classes"
                      control={<Radio />}
                      label="Group classes or guided workouts"
                    />
                    <FormControlLabel
                      value="sports"
                      control={<Radio />}
                      label="Sports and recreational activities"
                    />
                  </RadioGroup>
                </FormControl>
              </Stack>
            )}
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};

export default GoalSpecificQuestions;
