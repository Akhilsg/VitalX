import { Icon } from "@iconify/react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Drawer,
  Grid,
  IconButton,
  LinearProgress,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { AnimatePresence, m } from "framer-motion";
import { useRef, useState } from "react";
import PlanSidebar from "./PlanSidebar";

const MotionCard = m(Card);
const MotionBox = m(Box);

const DisplayWorkoutPlan = ({ plan }) => {
  const [expandedWeek, setExpandedWeek] = useState(1);
  const weekRefs = useRef([]);

  if (!plan?.weeks) return null;

  const getExerciseColor = (exerciseName) => {
    const name = exerciseName.toLowerCase();
    if (name.includes("cardio")) return "error";
    if (name.includes("stretch")) return "info";
    if (name.includes("core")) return "warning";
    if (name.includes("strength")) return "success";
    return "primary";
  };

  return (
    <Box sx={{ display: "flex", width: "100vw" }}>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 340,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 340,
            marginTop: "80px",
            zIndex: (theme) => theme.zIndex.appBar - 1,
            boxSizing: "border-box",
            background: "rgba(28, 37, 46, 0.85)",
            backdropFilter: "blur(8px)",
            borderRight: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "inset -1px 0 0 0 rgba(255, 255, 255, 0.05)",
          },
        }}
      >
        <PlanSidebar
          plan={plan}
          weekRefs={weekRefs}
          expandedWeek={expandedWeek}
          setExpandedWeek={setExpandedWeek}
        />
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, width: "100%", px: 3, mb: { xs: "110px", md: 0 } }}
      >
        <AnimatePresence mode="wait">
          <Box
            component={m.div}
            key="display"
            initial={{ rotateX: 90 }}
            animate={{ rotateX: 0 }}
            transition={{ duration: 0.8, ease: "anticipate", delay: 0.3 }}
          >
            <AnimatePresence>
              {plan?.weeks.map((week) => (
                <MotionBox
                  key={week.weekNumber}
                  id={`week-${week.weekNumber}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <Accordion
                    square
                    expanded={expandedWeek === week.weekNumber}
                    onChange={(event, isExpanded) =>
                      setExpandedWeek(isExpanded ? week.weekNumber : -1)
                    }
                    sx={{
                      width: '100%',
                      mb: 3,
                      background: "rgba(28, 37, 46, 0.85)",
                      "&:before": { display: "none" },
                      boxShadow: "rgb(0 0 0 / 24%) -8px 8px 32px -8px",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "rgb(0 0 0 / 30%) -12px 12px 40px -8px",
                      },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <Icon icon="solar:alt-arrow-down-linear" width="20" />
                      }
                      sx={{
                        "& .MuiAccordionSummary-content": {
                          margin: "20px 0",
                        },
                      }}
                    >
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar
                          sx={{
                            bgcolor: "primary.main",
                            color: "background.paper",
                            width: 48,
                            height: 48,
                          }}
                        >
                          <Icon icon="game-icons:trophy" width="24" />
                        </Avatar>
                        <Box>
                          <Typography
                            variant="h5"
                            fontWeight="bold"
                            color="primary"
                          >
                            Week {week.weekNumber}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {week.days.length} Training Days
                          </Typography>
                        </Box>
                      </Stack>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 3 }}>
                      <Grid container spacing={3}>
                        {week.days.map((day, dayIndex) => (
                          <Grid item xs={12} md={6} key={day.day}>
                            <MotionCard
                              initial={{ opacity: 0, y: 20 }}
                              animate={
                                expandedWeek === week.weekNumber
                                  ? { opacity: 1, y: 0 }
                                  : {}
                              }
                              transition={{
                                duration:
                                  expandedWeek === week.weekNumber ? 0.3 : 0,
                                delay:
                                  expandedWeek === week.weekNumber
                                    ? dayIndex * 0.1
                                    : 0,
                              }}
                              sx={{
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                position: "relative",
                                overflow: "visible",
                                transition: "all 0.3s ease-in-out",
                              }}
                            >
                              <Box
                                sx={{
                                  position: "absolute",
                                  top: -15,
                                  left: 20,
                                  bgcolor: "primary.main",
                                  color: "primary.contrastText",
                                  py: 1,
                                  px: 3,
                                  borderRadius: 2,
                                  boxShadow: 3,
                                }}
                              >
                                <Typography variant="h6" fontWeight="bold">
                                  {day.day}
                                </Typography>
                              </Box>
                              <CardContent sx={{ pt: 6 }}>
                                <Stack spacing={2}>
                                  {day.exercises.map((exercise, index) => (
                                    <Box
                                      key={index}
                                      sx={{
                                        p: 2,
                                        borderRadius: 2,
                                        bgcolor: "background.neutral",
                                        border: "1px solid",
                                        borderColor: "divider",
                                      }}
                                    >
                                      <Stack spacing={2}>
                                        <Stack
                                          direction="row"
                                          justifyContent="space-between"
                                          alignItems="center"
                                        >
                                          <Typography
                                            variant="subtitle1"
                                            fontWeight="bold"
                                            sx={{
                                              display: "flex",
                                              alignItems: "center",
                                              gap: 1,
                                            }}
                                          >
                                            <Icon
                                              icon="solar:dumbbell-large-bold"
                                              width="24"
                                              color="primary"
                                            />
                                            {exercise.name}
                                          </Typography>
                                          {exercise.needsVideo && (
                                            <Tooltip title="Watch Tutorial">
                                              <IconButton
                                                sx={{
                                                  bgcolor: "background.paper",
                                                  "&:hover": {
                                                    bgcolor: "primary.main",
                                                    "& svg": {
                                                      color: "white",
                                                    },
                                                  },
                                                }}
                                              >
                                                <Icon
                                                  icon="mdi:play-circle-outline"
                                                  width="24"
                                                />
                                              </IconButton>
                                            </Tooltip>
                                          )}
                                        </Stack>

                                        <Stack
                                          direction="row"
                                          flexWrap="wrap"
                                          alignItems="start"
                                          gap={1}
                                        >
                                          <Chip
                                            icon={
                                              <Icon
                                                icon="mdi:speedometer"
                                                width="20"
                                              />
                                            }
                                            label={`${exercise.sets} sets × ${exercise.reps}`}
                                            color={getExerciseColor(
                                              exercise.name
                                            )}
                                            sx={{ borderRadius: 1 }}
                                          />
                                          <Chip
                                            color=""
                                            icon={
                                              <Icon
                                                icon="mdi:timer-outline"
                                                width="20"
                                              />
                                            }
                                            label={`Rest: ${exercise.rest}`}
                                            sx={{ borderRadius: 1 }}
                                          />
                                          {exercise.duration && (
                                            <Chip
                                              icon={
                                                <Icon
                                                  icon="mdi:fire"
                                                  width="20"
                                                />
                                              }
                                              label={exercise.duration}
                                              color="secondary"
                                              sx={{ borderRadius: 1 }}
                                            />
                                          )}
                                        </Stack>

                                        <LinearProgress
                                          variant="determinate"
                                          value={
                                            ((index + 1) /
                                              day.exercises.length) *
                                            100
                                          }
                                          sx={{
                                            height: 6,
                                            borderRadius: 1,
                                            bgcolor: "background.paper",
                                          }}
                                        />
                                      </Stack>
                                    </Box>
                                  ))}
                                </Stack>
                              </CardContent>
                            </MotionCard>
                          </Grid>
                        ))}
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </MotionBox>
              ))}
            </AnimatePresence>
          </Box>
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default DisplayWorkoutPlan;
