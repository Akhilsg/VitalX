import { Icon } from "@iconify/react/dist/iconify.js";
import { Container, Stack, styled, useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { usePathname } from "../hooks/use-pathname";
import { useScrollOffSetTop } from "../hooks/use-scroll-offset-top";
import { bgBlur } from "../theme/mixins";
import { NavItem } from "./NavItem";
import { toast } from "sonner";

const StyledElevation = styled("span")(() => ({
  left: 0,
  right: 0,
  bottom: 0,
  margin: "auto",
  height: 24,
  zIndex: -1,
  opacity: 0.48,
  borderRadius: "50%",
  position: "absolute",
  width: "calc(100% - 48px)",
  boxShadow: "0 8px 16px 0 rgba(0 0 0 / 0.16)",
}));

const links = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Dashboard",
    path: "/dashboard",
    isAuthenticated: true,
  },
  {
    title: "Workout",
    path: "/workout",
    isAuthenticated: true,
  },
  {
    title: "Nutrition",
    path: "/nutrition",
    isAuthenticated: true,
  },
  {
    title: "Analytics",
    path: "/analytics",
    isAuthenticated: true,
  },
];

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { offsetTop } = useScrollOffSetTop();

  const theme = useTheme();
  const location = usePathname();

  const isBaseLink = ["/", "/login", "/register"].includes(location);

  const toolbarStyles = {
    default: {
      minHeight: "auto",
      height: "80px",
      transition: theme.transitions.create(["height", "background-color"], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter,
      }),
      [theme.breakpoints.up("sm")]: {
        minHeight: "auto",
      },
      [theme.breakpoints.up("md")]: {
        height: "80px",
      },
    },
    offset: {
      ...bgBlur({
        color: isBaseLink ? "transparent" : "rgba(20 26 33 / 0.8)",
      }),
    },
  };

  return (
    <AppBar
      position={isBaseLink ? "fixed" : "sticky"}
      color="transparent"
      sx={{ boxShadow: "none", zIndex: 1101 }}
    >
      <Toolbar
        disableGutters
        sx={{
          ...toolbarStyles.default,
          ...(!isBaseLink && toolbarStyles.offset),
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            height: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Icon
            icon="solar:dumbbell-large-minimalistic-broken"
            color="#0C68E9"
            width="36"
            height="36"
          />
          <Box
            sx={{ display: "flex", flex: "1 1 auto", justifyContent: "center" }}
          />

          {isAuthenticated ? (
            <Stack direction="row" alignItems="center" spacing={5}>
              {links.map((link, index) => (
                <NavItem
                  key={index}
                  title={link.title}
                  path={link.path}
                  active={link.path === location}
                />
              ))}
            </Stack>
          ) : (
            <Button
              size="large"
              variant="contained"
              color="primary"
              onClick={() => navigate("/register")}
            >
              Join Us
            </Button>
          )}
        </Container>
      </Toolbar>
      {offsetTop && location !== "/" && <StyledElevation />}
    </AppBar>
  );
};

export default Navbar;
