import { Icon } from "@iconify/react/dist/iconify.js";
import {
  alpha,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  LinearProgress,
  Typography,
  useTheme,
} from "@mui/material";
import { AnimatePresence, m } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

const TOTAL_WEEKS = 4;
const baseUrl = process.env.REACT_APP_API_URL;

const GenerationStatus = ({ workoutId, workoutDays, onShowPlan }) => {
  const theme = useTheme();
  const [status, setStatus] = useState({
    isGenerating: false,
    currentWeek: 0,
    currentDay: 0,
    totalDays: workoutDays.length * 4,
    completedDays: 0,
  });

  const handleStartGeneration = () => {
    try {
      const eventSource = new EventSource(
        `${baseUrl}/api/plans/generate/${workoutId}`
      );

      setStatus((prev) => ({ ...prev, isGenerating: true }));

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.type === "progress") {
          setStatus({
            isGenerating: true,
            currentWeek: data.data.currentGeneratingWeek,
            currentDay: data.data.currentGeneratingDay,
            totalDays: data.data.totalDays,
            completedDays:
              data.data.currentGeneratingWeek * workoutDays.length +
              data.data.currentGeneratingDay,
          });
        }

        if (data.type === "complete") {
          eventSource.close();
          toast.success("Workout plan generated successfully!");
          onShowPlan({ data: data.data });
          return;
        }
      };
    } catch (error) {
      toast.error("Failed to generate workout plan");
      setStatus((prev) => ({ ...prev, isGenerating: false }));
      eventSource.close();
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return (
          <Icon
            icon="mdi:clock-outline"
            color={theme.palette.text.secondary}
            width={20}
          />
        );
      case "loading":
        return (
          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 24,
              height: 24,
            }}
          >
            <CircularProgress
              size={20}
              thickness={5}
              sx={{
                color: "transparent",
                "& .MuiCircularProgress-circle": {
                  strokeLinecap: "round",
                  stroke: `url(#linearGradient)`,
                },
              }}
            />
            <svg width="0" height="0">
              <defs>
                <linearGradient
                  id="linearGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor={theme.palette.primary.main} />
                  <stop
                    offset="100%"
                    stopColor={theme.palette.secondary.main}
                  />
                </linearGradient>
              </defs>
            </svg>
          </Box>
        );
      case "done":
        return (
          <Icon icon="mdi:check-circle" color={theme.palette.success.main} />
        );
      default:
        return null;
    }
  };

  const getDayStatus = (day, dayIndex) => {
    if (!status.isGenerating) return "pending";

    const currentOverallDay =
      status.currentWeek * workoutDays.length + status.currentDay;
    const thisDayOverall = dayIndex;

    if (thisDayOverall < currentOverallDay) return "done";
    if (thisDayOverall === currentOverallDay) return "loading";
    return "pending";
  };

  return (
    <AnimatePresence mode="wait">
      <Box
        component={m.div}
        initial={{ rotateX: 0 }}
        exit={{ rotateX: 90 }}
        transition={{ duration: 0.8, ease: "anticipate" }}
      >
        <Box
          sx={{
            background: theme.palette.background.default,
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          <CardContent sx={{ pl: 0 }}>
            <Box
              sx={{
                mb: 4,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                  }}
                >
                  Workout Generation
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Creating your personalized {TOTAL_WEEKS}-week training program
                </Typography>
              </Box>

              <Button
                variant="contained"
                onClick={handleStartGeneration}
                size="large"
                sx={{
                  borderRadius: 2,
                  background:
                    !status.isGenerating &&
                    `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                  "&:hover": { boxShadow: theme.shadows[10] },
                }}
                startIcon={<Icon icon="mdi:play" />}
                loading={status.isGenerating}
              >
                Generate Plan
              </Button>
            </Box>

            {status.isGenerating && (
              <Box sx={{ mb: 4 }}>
                <LinearProgress
                  variant="determinate"
                  value={(status.completedDays / status.totalDays) * 100}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    "& .MuiLinearProgress-bar": {
                      borderRadius: 5,
                      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                    },
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    mt: 1,
                    textAlign: "center",
                    color: "text.secondary",
                  }}
                >
                  {status.completedDays || 0} of {status.totalDays} workouts
                  generated
                </Typography>
              </Box>
            )}

            {Array.from({ length: TOTAL_WEEKS }).map((_, weekIndex) => (
              <Box
                key={weekIndex}
                sx={{
                  mb: 4,
                  p: 3,
                  borderRadius: 3,
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  backgroundColor: alpha(theme.palette.background.paper, 0.5),
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    mb: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Icon
                    icon="solar:calendar-minimalistic-bold"
                    style={{
                      color: theme.palette.primary.main,
                      fontSize: 24,
                    }}
                  />
                  &nbsp;Week {weekIndex + 1}
                </Typography>

                <Grid container spacing={2}>
                  {workoutDays.map((day, dayIndex) => {
                    const dayStatus = getDayStatus(
                      day,
                      weekIndex * workoutDays.length + dayIndex
                    );
                    return (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={workoutDays.length <= 4 ? 6 : 4}
                        key={`${weekIndex}-${day}`}
                      >
                        <Card
                          sx={{
                            p: 2,
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            borderRadius: 2,
                            transition: "all 0.3s ease",
                            position: "relative",
                            overflow: "hidden",
                            border: `1px solid ${alpha(
                              theme.palette.divider,
                              0.1
                            )}`,
                            bgcolor:
                              dayStatus === "done"
                                ? alpha(theme.palette.success.main, 0.1)
                                : dayStatus === "loading"
                                ? "transparent"
                                : alpha(theme.palette.background.paper, 0.5),
                            "&:hover": {
                              transform: "translateY(-2px)",
                              boxShadow: theme.shadows[4],
                            },
                          }}
                        >
                          {dayStatus === "loading" && (
                            <Box
                              component={m.div}
                              animate={{
                                background: [
                                  `linear-gradient(45deg, ${theme.palette.primary.main}22, ${theme.palette.secondary.main}22)`,
                                  `linear-gradient(225deg, ${theme.palette.primary.main}22, ${theme.palette.secondary.main}22)`,
                                ],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                              sx={{
                                position: "absolute",
                                inset: 0,
                                filter: "blur(1px)",
                              }}
                            />
                          )}
                          {dayStatus === "loading" && (
                            <Box
                              component={m.div}
                              animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.6, 0.3],
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                              sx={{
                                position: "absolute",
                                inset: 0,
                                background: `radial-gradient(circle at 50% 50%, ${theme.palette.primary.main}15, transparent 70%)`,
                              }}
                            />
                          )}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                              position: "relative",
                            }}
                          >
                            <Box
                              component={m.div}
                              animate={
                                dayStatus === "loading"
                                  ? {
                                      rotate: [-10, 10, -10],
                                      scale: [1, 1.1, 1],
                                    }
                                  : {}
                              }
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <Icon
                                icon="solar:dumbbell-large-bold"
                                width={24}
                                style={{
                                  color:
                                    dayStatus === "loading"
                                      ? theme.palette.primary.main
                                      : dayStatus === "done"
                                      ? theme.palette.success.main
                                      : theme.palette.text.secondary,
                                }}
                              />
                              <svg width="0" height="0">
                                <defs>
                                  <linearGradient
                                    id="dumbbellGradient"
                                    x1="0%"
                                    y1="0%"
                                    x2="100%"
                                    y2="100%"
                                  >
                                    <stop
                                      offset="0%"
                                      stopColor={theme.palette.primary.main}
                                    />
                                    <stop
                                      offset="100%"
                                      stopColor={theme.palette.secondary.main}
                                    />
                                  </linearGradient>
                                </defs>
                              </svg>
                            </Box>
                            <Typography
                              variant="subtitle1"
                              sx={{ fontWeight: 500 }}
                            >
                              {day}
                            </Typography>
                          </Box>
                          {getStatusIcon(dayStatus)}
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            ))}
          </CardContent>
        </Box>
      </Box>
    </AnimatePresence>
  );
};

export default GenerationStatus;
