import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Typography,
  useTheme,
  alpha,
  Divider,
} from "@mui/material";
import { m } from "framer-motion";
import React from "react";
import { Icon } from "@iconify/react";
import DaySelector from "../DaySelector";

const ExperienceLevel = ({
  formData,
  setFormData,
  handleInputChange,
  errors,
}) => {
  const theme = useTheme();

  const experienceLevels = [
    {
      value: "beginner",
      label: "Beginner",
      icon: "mdi:baby-face-outline",
      description: "New to fitness or returning after a long break",
      level: 1,
    },
    {
      value: "intermediate",
      label: "Intermediate",
      icon: "mdi:run",
      description: "Regular exercise for 6+ months with good form",
      level: 2,
    },
    {
      value: "advanced",
      label: "Advanced",
      icon: "mdi:weight-lifter",
      description: "Consistent training for 2+ years with excellent form",
      level: 3,
    },
  ];

  return (
    <Box
      component={m.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Experience Level Section */}
      <Box sx={{ mb: 4 }}>
        <FormControl
          component="fieldset"
          error={!!errors.experienceLevel}
          sx={{ width: "100%" }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                mr: 2,
              }}
            >
              <Icon icon="mdi:arm-flex" width={24} height={24} color="#fff" />
            </Box>
            <Typography variant="h6" fontWeight={600}>
              Experience Level
            </Typography>
          </Box>

          {/* Experience level cards */}
          <Grid container spacing={2}>
            {experienceLevels.map((level, index) => (
              <Grid item xs={12} md={4} key={level.value}>
                <Box
                  component={m.div}
                  whileTap={{ scale: 0.98 }}
                  sx={{
                    p: 3,
                    height: "100%",
                    borderRadius: 3,
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                    backgroundColor:
                      formData.experienceLevel === level.value
                        ? alpha(theme.palette.background.neutral, 0.6)
                        : alpha(theme.palette.background.paper, 0.2),
                    backdropFilter: "blur(8px)",
                    border: `1px solid ${
                      formData.experienceLevel === level.value
                        ? alpha(theme.palette.primary.main, 0.3)
                        : "transparent"
                    }`,
                    transition: "all 0.3s ease",
                  }}
                  onClick={() =>
                    handleInputChange("experienceLevel")({
                      target: { value: level.value },
                    })
                  }
                >
                  {/* Glowing corner effect */}
                  {formData.experienceLevel === level.value && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: -30,
                        right: -30,
                        width: 100,
                        height: 100,
                        borderRadius: "50%",
                        background: `radial-gradient(circle, ${alpha(
                          theme.palette.primary.main,
                          0.8
                        )}, transparent 70%)`,
                        filter: "blur(20px)",
                        opacity: 0.6,
                      }}
                    />
                  )}

                  <Box sx={{ position: "relative", zIndex: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 45,
                          height: 45,
                          borderRadius: "12px",
                          backgroundColor:
                            formData.experienceLevel === level.value
                              ? alpha(theme.palette.primary.main, 0.2)
                              : alpha(theme.palette.background.neutral, 0.6),
                          mr: 2,
                        }}
                      >
                        <Icon
                          icon={level.icon}
                          width={26}
                          height={26}
                          color={
                            formData.experienceLevel === level.value
                              ? theme.palette.primary.main
                              : theme.palette.text.secondary
                          }
                        />
                      </Box>
                      <Typography
                        variant="h6"
                        fontWeight={
                          formData.experienceLevel === level.value ? 600 : 500
                        }
                      >
                        {level.label}
                      </Typography>
                    </Box>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {level.description}
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {Array.from({ length: 3 }).map((_, i) => (
                        <Box
                          key={i}
                          sx={{
                            width: i < level.level ? 24 : 12,
                            height: 4,
                            borderRadius: 2,
                            mr: 0.5,
                            backgroundColor:
                              i < level.level
                                ? formData.experienceLevel === level.value
                                  ? i === 0
                                    ? theme.palette.primary.main
                                    : i === 1
                                    ? theme.palette.primary.light
                                    : theme.palette.secondary.main
                                  : alpha(theme.palette.primary.main, 0.3)
                                : alpha(theme.palette.text.disabled, 0.2),
                            transition: "all 0.3s ease",
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Box
            sx={{
              position: "relative",
              height: 6,
              borderRadius: 3,
              backgroundColor: alpha(theme.palette.background.neutral, 0.6),
              mt: 7,
            }}
          >
            {/* Progress track */}
            <Box
              sx={{
                position: "absolute",
                left: 0,
                top: 0,
                height: "100%",
                width:
                  formData.experienceLevel === "beginner"
                    ? "25%"
                    : formData.experienceLevel === "intermediate"
                    ? "75%"
                    : formData.experienceLevel === "advanced"
                    ? "100%"
                    : "0%",
                borderRadius: 3,
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                transition: "width 0.5s ease",
              }}
            />

            {/* Level markers */}
            {experienceLevels.map((level, index) => {
              const isActive =
                (formData.experienceLevel === "beginner" && index === 0) ||
                (formData.experienceLevel === "intermediate" && index <= 1) ||
                formData.experienceLevel === "advanced";

              return (
                <Box
                  key={level.value}
                  component={m.div}
                  sx={{
                    position: "absolute",
                    left: index === 0 ? "0%" : index === 1 ? "50%" : "100%",
                    top: "50%",
                    transform: "translate(0%, -50%)",
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    backgroundColor: isActive
                      ? index === 0
                        ? theme.palette.primary.main
                        : index === 1
                        ? theme.palette.primary.light
                        : theme.palette.secondary.main
                      : theme.palette.background.paper,
                    border: `2px solid ${
                      isActive
                        ? "transparent"
                        : alpha(theme.palette.primary.main, 0.3)
                    }`,
                    cursor: "pointer",
                    zIndex: 2,
                    transition: "all 0.3s ease",
                    boxShadow: isActive
                      ? `0 0 10px ${alpha(theme.palette.primary.main, 0.5)}`
                      : "none",
                  }}
                  onClick={() =>
                    handleInputChange("experienceLevel")({
                      target: { value: level.value },
                    })
                  }
                />
              );
            })}
          </Box>

          {errors.experienceLevel && (
            <FormHelperText error sx={{ mt: 2 }}>
              {errors.experienceLevel}
            </FormHelperText>
          )}
        </FormControl>
      </Box>

      {/* Workout Schedule Section */}
      <Box
        sx={{
          mt: 5,
          pt: 4,
          position: "relative",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              mr: 2,
            }}
          >
            <Icon
              icon="mdi:calendar-check"
              width={24}
              height={24}
              color="#fff"
            />
          </Box>
          <Typography variant="h6" fontWeight={600}>
            Weekly Schedule
          </Typography>
        </Box>

        <FormControl
          component="fieldset"
          error={!!errors.workoutDays}
          sx={{ width: "100%" }}
        >
          <FormLabel
            component="legend"
            sx={{ color: "text.secondary", mb: 2, fontSize: "1rem" }}
          >
            Which days of the week can you commit to working out?
          </FormLabel>
          <DaySelector
            value={formData.workoutDays}
            onChange={(newDays) => {
              setFormData({ ...formData, workoutDays: newDays });
            }}
            error={errors.workoutDays}
          />
          {errors.workoutDays && (
            <FormHelperText error sx={{ mt: 1 }}>
              {errors.workoutDays}
            </FormHelperText>
          )}
        </FormControl>
      </Box>
    </Box>
  );
};

export default ExperienceLevel;
