import { Box, Paper, Typography } from "@mui/material";
import React from "react";

const AnalyticCard = ({
  title,
  value,
  icon,
  color,
  gradientColor,
  iconComponent,
}) => {
  return (
    <Paper
      sx={{
        backgroundImage: "none",
        boxShadow:
          "rgba(0, 0, 0, 0.2) 0px 0px 2px 0px, rgba(0, 0, 0, 0.12) 0px 12px 24px -4px",
        borderRadius: 3,
        overflow: "hidden",
        position: "relative",
        padding: "24px 20px 24px 24px",
        zIndex: 0,
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "2rem",
            lineHeight: 1.5,
          }}
        >
          {value}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {title}
        </Typography>
      </Box>
      {iconComponent ? (
        <Box
          sx={{
            top: "24px",
            right: "15px",
            position: "absolute",
            color: color,
          }}
        >
          {iconComponent}
        </Box>
      ) : (
        <Box
          sx={{
            width: "40px",
            height: "40px",
            display: "inline-flex",
            mask: `url(${icon}) center center / contain no-repeat`,
            top: "24px",
            right: "17px",
            position: "absolute",
            background: color,
          }}
        />
      )}
      <Box
        sx={{
          top: "-44px",
          width: "160px",
          zIndex: -1,
          height: "160px",
          right: "-104px",
          opacity: 0.12,
          borderRadius: "24px",
          position: "absolute",
          transform: "rotate(40deg)",
          background: `linear-gradient(to right, ${gradientColor} 0%, rgba(255 171 0 / 0) 100%)`,
        }}
      />
    </Paper>
  );
};

export default AnalyticCard;
