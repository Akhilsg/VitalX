import { Icon } from "@iconify/react/dist/iconify.js";
import { Box, Typography, useTheme } from "@mui/material";
import { m } from "framer-motion";
import React from "react";

const Finalize = () => {
  const theme = useTheme();

  return (
    <Box sx={{ textAlign: "center" }}>
      <Box
        component={m.div}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        sx={{
          mb: 4,
          pt: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Box
          sx={{
            p: 2,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${theme.palette.primary.main}22, ${theme.palette.secondary.main}22)`,
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              inset: -2,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              borderRadius: "50%",
              opacity: 0.5,
              filter: "blur(10px)",
            },
          }}
        >
          <Icon
            icon="solar:rocket-bold"
            width="60"
            height="60"
            style={{
              filter: `drop-shadow(0 0 20px rgba(${theme.palette.primary.mainChannel} / 0.4))`,
              marginBottom: -8,
            }}
          />
        </Box>

        <Typography
          variant="h4"
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: 700,
            mb: 1,
          }}
        >
          Ready to Transform Your Fitness Journey!
        </Typography>

        <Typography
          variant="body1"
          sx={{
            maxWidth: "600px",
            mx: "auto",
            color: theme.palette.text.secondary,
            lineHeight: 1.8,
          }}
        >
          We've analyzed your profile and are ready to create a personalized
          workout plan tailored specifically for you. Our AI will consider your
          goals, experience level, and preferences to design the perfect routine
          that will help you achieve maximum results.
        </Typography>
      </Box>
    </Box>
  );
};

export default Finalize;
