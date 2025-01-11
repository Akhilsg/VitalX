import { Box, FormHelperText, Typography } from "@mui/material";
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
          gap: 3,
          justifyContent: "center",
        }}
      >
        {days.map((day, index) => (
          <Box
            key={day}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              onClick={() => handleDayToggle(day)}
              sx={{
                padding: 2,
                borderRadius: "50%",
                display: "inline-flex",
                boxSizing: "border-box",
                alignItems: "center",
                cursor: "pointer",
                fontSize: "15px",
                justifyContent: "center",
                height: "32px",
                width: "32px",
                fontWeight: 600,
                transition: "all 0.1s ease-in-out",
                ...(value.includes(day)
                  ? {
                      border: "1px solid transparent",
                      color: "black",
                      bgcolor: "primary.main",
                      "&:hover": {
                        bgcolor: "primary.main",
                        color: "black",
                      },
                    }
                  : {
                      border: "1px solid rgba(145, 158, 171, 0.2)",
                      "&:hover": {
                        bgcolor: "rgba(145, 158, 171, 0.08)",
                      },
                    }),
              }}
            >
              {day.charAt(0)}
            </Box>
            <Typography
              variant="caption"
              sx={{
                mt: 1,
                color: value.includes(day) ? "primary.main" : "text.secondary",
              }}
            >
              {day.slice(0, 3)}
            </Typography>
          </Box>
        ))}
      </Box>
      {error && <FormHelperText error>{error}</FormHelperText>}
    </Box>
  );
};

export default DaySelector;
