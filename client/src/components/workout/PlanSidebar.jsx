import { Icon } from "@iconify/react";
import {
  Avatar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { Scrollbar } from "../../common/scrollbar";

const PlanSidebar = ({ plan, weekRefs, expandedWeek, setExpandedWeek }) => {
  const theme = useTheme();

  const scrollToWeek = (weekNumber) => {
    weekRefs.current[weekNumber]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setExpandedWeek(weekNumber);
  };

  return (
    <Scrollbar>
      <Stack spacing={3}>
        <Box sx={{ px: 2.5, pt: 3 }}>
          <Typography
            variant="h5"
            sx={{
              mb: 1,
              background: "linear-gradient(45deg, #0C68E9, #6BB1F8)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 700,
            }}
          >
            Workout Plan
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {plan?.weeks.length} Weeks Program
          </Typography>
        </Box>

        <List sx={{ px: 1 }}>
          {plan?.weeks.map((week) => (
            <ListItem key={week.weekNumber} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => scrollToWeek(week.weekNumber)}
                sx={{
                  borderRadius: 2,
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  position: "relative",
                  overflow: "hidden",
                  py: 2,

                  ...(expandedWeek === week.weekNumber && {
                    background:
                      "linear-gradient(145deg, rgba(12, 104, 233, 0.2), rgba(107, 177, 248, 0.1))",
                    boxShadow: "0 4px 12px rgba(12, 104, 233, 0.1)",
                    "&:before": {
                      content: '""',
                      position: "absolute",
                      left: 0,
                      top: 0,
                      height: "100%",
                      width: "4px",
                      background:
                        "linear-gradient(to bottom, #0C68E9, #6BB1F8)",
                      borderRadius: "4px",
                    },
                  }),

                  "&:hover": {
                    transform: "translateX(8px)",
                  },
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  width="100%"
                >
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      backgroundColor:
                        expandedWeek === week.weekNumber
                          ? "primary.main"
                          : "background.neutral",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <Icon
                      icon={
                        expandedWeek === week.weekNumber
                          ? "game-icons:trophy"
                          : "solar:dumbbell-bold"
                      }
                      width={expandedWeek === week.weekNumber ? 20 : 26}
                    />
                  </Avatar>

                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight:
                          expandedWeek === week.weekNumber ? 700 : 500,
                        color:
                          expandedWeek === week.weekNumber
                            ? "primary.light"
                            : "text.primary",
                      }}
                    >
                      Week {week.weekNumber}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {week.days.length} Training Days
                    </Typography>
                  </Box>

                  <Box sx={{ flexGrow: 1 }} />
                  {expandedWeek === week.weekNumber && (
                    <Box
                      sx={{
                        ml: "auto",
                        display: "flex",
                        alignItems: "center",
                        height: "100%",
                      }}
                    >
                      <Icon
                        icon="solar:alt-arrow-right-linear"
                        width={20}
                        style={{ color: theme.palette.primary.main }}
                      />
                    </Box>
                  )}
                </Stack>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Stack>
    </Scrollbar>
  );
};

export default PlanSidebar;
