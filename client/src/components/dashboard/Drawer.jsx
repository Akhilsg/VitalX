import { Icon } from "@iconify/react";
import {
  alpha,
  Avatar,
  Box,
  cardClasses,
  Chip,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { m } from "framer-motion";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { Scrollbar } from "../../common/scrollbar";

const Drawer = ({ events }) => {
  const theme = useTheme();
  const { user } = useSelector((state) => state.auth);

  const today = new Date();
  const todayEvents = events?.filter(
    (event) => new Date(event.start).toDateString() === today.toDateString()
  );

  const upcomingEvents = events
    ?.filter((event) => new Date(event.start) > today)
    .slice(0, 3);

  return (
    <Box
      sx={{
        width: 1,
        display: { xs: "none", sm: "flex" },
        flexDirection: "column",
        px: { xs: 2, sm: 3, xl: 5 },
        pt: { lg: 8, xl: 10 },
        pb: { xs: 8, xl: 10 },
        flexShrink: { lg: 0 },
        gap: { xs: 3, lg: 5, xl: 8 },
        maxWidth: { lg: 350, xl: 400 },
        background: {
          lg: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.neutral} 100%)`,
        },
        [`& .${cardClasses.root}`]: {
          p: { xs: 3, lg: 0 },
          boxShadow: { lg: "none" },
          bgcolor: { lg: "transparent" },
        },
      }}
    >
      <Scrollbar>
        <Box
          sx={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box
                sx={{
                  width: "100%",
                  p: (theme) => theme.spacing(0, 3, 2, 3),
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    width: 96,
                    height: 96,
                    flexShrink: 0,
                    borderRadius: "50%",
                    position: "relative",
                    alignItems: "center",
                    display: "inline-flex",
                    justifyContent: "center",
                    mb: 2,
                  }}
                >
                  <Avatar
                    alt="My avatar"
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      color: "white",
                      fontWeight: 800,
                      fontSize: "2rem",
                      textTransform: "uppercase",
                      zIndex: 1,
                      width: "calc(100% - 10px)",
                      height: "calc(100% - 10px)",
                    }}
                  >
                    {user?.email.charAt(0)}
                    {user?.email.charAt(1)}
                  </Avatar>

                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      width: 1,
                      height: 1,
                      position: "absolute",
                      borderRadius: "inherit",
                      background: `linear-gradient(135deg, ${alpha(
                        theme.palette.primary.main,
                        0
                      )} 25%,${theme.palette.primary.main} 100%)`,
                      WebkitMask:
                        "linear-gradient(#FFF 0 0) content-box, linear-gradient(#FFF 0 0)",
                      maskComposite: "exclude",
                      WebkitMaskComposite: "xor",
                      p: "2px",
                      "@keyframes rotate": {
                        "0%": {
                          transform: "rotate(0deg)",
                        },
                        "100%": {
                          transform: "rotate(360deg)",
                        },
                      },
                      animation: "rotate 6s linear infinite",
                    }}
                  />
                </Box>
                <Typography
                  variant="h6"
                  align="center"
                  sx={{ fontWeight: 600, textTransform: "capitalize" }}
                  gutterBottom
                >
                  {user.email}
                </Typography>
                <Typography
                  align="center"
                  color="#637381"
                  variant="body2"
                  noWrap
                  sx={{ mb: 2 }}
                >
                  Member since {moment(user.createdAt).format("MMM YYYY")}
                </Typography>
              </Box>
            </m.div>
          </Box>

          {/* Today's Workouts with Enhanced UI */}
          <Box sx={{ mb: 4 }}>
            <Stack direction="row" alignItems="center" sx={{ mb: 2 }}>
              <Icon icon="solar:calendar-bold-duotone" width={24} />
              <Typography variant="h6" sx={{ ml: 1 }}>
                Today's Plan
              </Typography>
            </Stack>

            {todayEvents?.length ? (
              todayEvents.map((event) => (
                <m.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box
                    sx={{
                      p: 2,
                      mb: 2,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.primary.main, 0.08),
                      border: `1px solid ${alpha(
                        theme.palette.primary.main,
                        0.2
                      )}`,
                      "&:hover": {
                        bgcolor: alpha(theme.palette.primary.main, 0.12),
                        transition: "all 0.2s",
                      },
                    }}
                  >
                    <Stack direction="row" spacing={1}>
                      <Icon
                        icon="solar:dumbbells-bold-duotone"
                        fontSize={24}
                        style={{ color: theme.palette.primary.main }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          color: theme.palette.primary.main,
                          fontWeight: 700,
                        }}
                      >
                        {event.title}
                      </Typography>
                    </Stack>
                    <Typography
                      variant="body2"
                      sx={{ mt: 1, color: "text.secondary" }}
                    >
                      {event.description}
                    </Typography>
                  </Box>
                </m.div>
              ))
            ) : (
              <Box
                sx={{
                  p: 3,
                  textAlign: "center",
                  bgcolor: alpha(theme.palette.background.neutral, 0.4),
                  borderRadius: 2,
                }}
              >
                <Icon
                  icon="solar:cup-star-bold-duotone"
                  style={{ fontSize: 48, color: theme.palette.text.secondary }}
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Rest day! Take time to recover.
                </Typography>
              </Box>
            )}
          </Box>

          {upcomingEvents?.length > 0 && (
            <Box>
              <Stack direction="row" alignItems="center" sx={{ mb: 2 }}>
                <Icon icon="solar:calendar-mark-bold-duotone" width={24} />
                <Typography variant="h6" sx={{ ml: 1 }}>
                  Coming Up
                </Typography>
              </Stack>

              {upcomingEvents?.map((event, index) => (
                <m.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Box
                    sx={{
                      p: 2,
                      mb: 2,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.background.neutral, 0.4),
                      transition: "all 0.2s",
                      "&:hover": {
                        bgcolor: alpha(theme.palette.background.neutral, 0.6),
                        transform: "scale(1.02)",
                      },
                    }}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Icon icon="solar:calendar-minimalistic-bold-duotone" />
                        <Typography variant="subtitle2">
                          {event.title}
                        </Typography>
                      </Stack>
                      <Chip
                        size="small"
                        label={moment(event.start).fromNow()}
                        sx={{
                          color: "text.secondary",
                          "& .MuiChip-label": { px: 1 },
                          "&:hover": { color: "text.secondary" },
                          ...theme.typography.caption,
                        }}
                      />
                    </Stack>
                  </Box>
                </m.div>
              ))}
            </Box>
          )}
        </Box>
      </Scrollbar>
    </Box>
  );
};

export default Drawer;
