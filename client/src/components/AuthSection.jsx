import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import loginImage from "../assets/login.png";
import registerImage from "../assets/register.png";
import { usePathname } from "../hooks/use-pathname";
import { bgGradient } from "../theme/mixins";

const Section = ({ title, subtitle, image }) => {
  const theme = useTheme();
  const location = usePathname();

  return (
    <Box
      sx={{
        ...bgGradient({
          color: "0deg, rgba(20, 26, 33, 0.92), rgba(20, 26, 33, 0.92)",
          imgUrl:
            "https://assets.minimals.cc/public/assets/background/background-3-blur.webp",
        }),
        height: "100vh",
        px: 3,
        pb: 3,
        width: 1,
        maxWidth: 480,
        display: "none",
        position: "relative",
        pt: "72px",
        [theme.breakpoints.up("md")]: {
          gap: 8,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        },
      }}
    >
      <div>
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          {title}
        </Typography>

        <Typography
          sx={{ color: "text.secondary", textAlign: "center", mt: 2 }}
        >
          {subtitle}
        </Typography>
      </div>

      <Box
        component="img"
        alt="Login"
        src={location === "/login" ? loginImage : registerImage}
        sx={{ width: 1 }}
      />
    </Box>
  );
};

export default Section;
