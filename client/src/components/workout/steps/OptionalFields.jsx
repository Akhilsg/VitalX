import { Icon } from "@iconify/react";
import {
  alpha,
  Box,
  Chip,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { m } from "framer-motion";
import React from "react";

const OptionalFields = ({
  formData,
  handleInputChange,
  handleCheckboxChange,
}) => {
  const theme = useTheme();

  const lifestyleOptions = [
    { value: "sedentary", label: "Sedentary", icon: "mdi:desk" },
    { value: "lightly-active", label: "Lightly Active", icon: "mdi:walk" },
    { value: "moderately-active", label: "Moderately Active", icon: "mdi:run" },
    { value: "very-active", label: "Very Active", icon: "mdi:run-fast" },
    { value: "super-active", label: "Super Active", icon: "mdi:weight-lifter" },
  ];

  const motivationTags = [
    { value: "health", label: "Better Health", icon: "mdi:heart-pulse" },
    {
      value: "confidence",
      label: "Self Confidence",
      icon: "mdi:emoticon-cool",
    },
    { value: "energy", label: "More Energy", icon: "mdi:lightning-bolt" },
    { value: "stress", label: "Stress Relief", icon: "mdi:meditation" },
    { value: "lifestyle", label: "Lifestyle Change", icon: "mdi:leaf" },
    { value: "performance", label: "Athletic Performance", icon: "mdi:trophy" },
    { value: "mental", label: "Mental Clarity", icon: "mdi:brain" },
    { value: "social", label: "Social Support", icon: "mdi:account-group" },
  ];

  return (
    <Box
      component={m.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 1,
          display: "flex",
          alignItems: "center",
          gap: 1,
          color: "primary.main",
          fontWeight: 600,
        }}
      >
        <Icon icon="mdi:star-circle" width={24} height={24} />
        Additional Details
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Help us understand your lifestyle better to create a more personalized
        experience
      </Typography>

      <Stack spacing={4}>
        {/* Activity Level Section */}
        <Box>
          <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
            Daily Activity Level
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1.5,
            }}
          >
            {lifestyleOptions.map((option) => (
              <Paper
                key={option.value}
                component={m.div}
                whileHover={{ y: -2, boxShadow: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  handleInputChange("currentActivityLevel")({
                    target: { value: option.value },
                  })
                }
                sx={{
                  p: 2,
                  flex: "1 1 150px",
                  minWidth: 150,
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                  borderRadius: 2,
                  border: `1px solid ${
                    formData.currentActivityLevel === option.value
                      ? theme.palette.primary.main
                      : theme.palette.divider
                  }`,
                  backgroundColor:
                    formData.currentActivityLevel === option.value
                      ? alpha(theme.palette.primary.main, 0.1)
                      : "transparent",
                  transition: "all 0.2s",
                }}
              >
                <Box
                  sx={{
                    p: 1,
                    borderRadius: "50%",
                    aspectRatio: "1 / 1",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor:
                      formData.currentActivityLevel === option.value
                        ? alpha(theme.palette.primary.main, 0.2)
                        : alpha(theme.palette.background.neutral, 0.4),
                  }}
                >
                  <Icon
                    icon={option.icon}
                    width={24}
                    height={24}
                    color={
                      formData.currentActivityLevel === option.value
                        ? theme.palette.primary.main
                        : theme.palette.text.secondary
                    }
                  />
                </Box>
                <Typography
                  variant="body2"
                  fontWeight={
                    formData.currentActivityLevel === option.value ? 600 : 400
                  }
                  color={
                    formData.currentActivityLevel === option.value
                      ? "primary.main"
                      : "text.primary"
                  }
                  textAlign="center"
                >
                  {option.label}
                </Typography>
                {/* {option.value === "sedentary" && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    align="center"
                  >
                    Little or no exercise
                  </Typography>
                )} */}
              </Paper>
            ))}
          </Box>
        </Box>

        {/* Motivation Section */}
        <Box>
          <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
            What drives you? (Select all that apply)
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {motivationTags.map((tag) => (
              <Chip
                key={tag.value}
                icon={<Icon icon={tag.icon} width={20} height={20} />}
                label={tag.label}
                onClick={() => {
                  const currentMotivations = formData.motivation
                    ? formData.motivation.split(",")
                    : [];
                  const newMotivations = currentMotivations.includes(tag.value)
                    ? currentMotivations.filter((m) => m !== tag.value)
                    : [...currentMotivations, tag.value];
                  handleInputChange("motivation")({
                    target: { value: newMotivations.join(",") },
                  });
                }}
                color={
                  formData.motivation?.includes(tag.value)
                    ? "primary"
                    : "default"
                }
                variant={
                  formData.motivation?.includes(tag.value)
                    ? "filled"
                    : "outlined"
                }
                sx={{
                  py: 2,
                  borderRadius: 2,
                  transition: "all 0.2s",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: `0 4px 8px ${alpha(
                      theme.palette.primary.main,
                      0.2
                    )}`,
                  },
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Additional Notes */}
        <TextField
          label="Any additional notes for our AI?"
          placeholder="E.g., previous injuries, specific concerns, or preferences"
          multiline
          rows={3}
          value={formData.additionalNotes || ""}
          onChange={handleInputChange("additionalNotes")}
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              backgroundColor: alpha(theme.palette.background.neutral, 0.4),
            },
          }}
        />
      </Stack>
    </Box>
  );
};

export default OptionalFields;
