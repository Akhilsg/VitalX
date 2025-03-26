import { alpha, Box, FormHelperText, Typography } from "@mui/material";
import React from "react";

const DaySelector = ({ value = [], onChange, error }) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const handleDayToggle = (day) => {
    const newSelection = value.includes(day)
      ? value.filter((d) => d !== day)
      : [...value, day];
    onChange(newSelection);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: { xs: 1, sm: 2 },
          justifyContent: "center",
          borderRadius: 3,
        }}
      >
        {days.map((day) => (
          <Box
            key={day}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
              p: 0.8,
            }}
          >
            <Box
              onClick={() => handleDayToggle(day)}
              sx={(theme) => ({
                padding: 2,
                borderRadius: 2,
                display: "inline-flex",
                alignItems: "center",
                cursor: "pointer",
                fontSize: theme.typography.body2.fontSize,
                justifyContent: "center",
                height: 44,
                width: 44,
                fontWeight: theme.typography.fontWeightBold,
                transition: theme.transitions.create(
                  ["transform", "box-shadow", "background-color"],
                  {
                    duration: theme.transitions.duration.shorter,
                  }
                ),
                ...(value.includes(day)
                  ? {
                      bgcolor: "primary.main",
                      color: "primary.contrastText",
                      boxShadow: (theme) =>
                        `0 8px 16px ${theme.palette.primary.main}40`,
                      "&:hover": {
                        boxShadow: (theme) =>
                          `0 12px 20px ${theme.palette.primary.main}30`,
                        bgcolor: "primary.dark",
                      },
                    }
                  : {
                      bgcolor: "background.paper",
                      color: "text.primary",
                      "&:hover": {
                        bgcolor: alpha(theme.palette.background.paper, 0.4),
                      },
                    }),
              })}
            >
              {day.charAt(0)}
            </Box>
            <Typography
              variant="caption"
              sx={{
                mt: 1.5,
                fontWeight: (theme) =>
                  value.includes(day)
                    ? theme.typography.fontWeightBold
                    : theme.typography.fontWeightMedium,
                color: value.includes(day) ? "primary.main" : "text.secondary",
                transition: (theme) => theme.transitions.create("all"),
              }}
            >
              {day.slice(0, 3)}
            </Typography>
          </Box>
        ))}
      </Box>
      {error && (
        <FormHelperText
          error
          sx={{
            mt: 2,
            textAlign: "center",
            fontSize: (theme) => theme.typography.caption.fontSize,
            fontWeight: (theme) => theme.typography.fontWeightMedium,
          }}
        >
          {error}
        </FormHelperText>
      )}
    </Box>
  );
};

export default DaySelector;
