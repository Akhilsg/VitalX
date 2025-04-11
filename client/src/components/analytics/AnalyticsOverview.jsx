import { Icon } from "@iconify/react";
import {
  Avatar,
  Box,
  Card,
  Grid,
  Stack,
  Typography,
  Fade,
  Grow,
  Zoom,
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { m } from "framer-motion";

const AnalyticsOverview = ({
  metrics,
  workoutStats,
  aiAnalysis,
  weightChartOptions,
  weightChartSeries,
  workoutCompletionOptions,
  workoutCompletionSeries,
  theme,
  setActiveTab,
}) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const chartVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.3 },
    },
  };

  const EmptyStateIcon = ({ icon, text }) => (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{ width: "100%", height: "100%" }}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          bgcolor: "rgba(0,0,0,0.02)",
          borderRadius: 2,
          p: 3,
        }}
      >
        <m.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.3,
            type: "spring",
            stiffness: 200,
          }}
        >
          <Box
            sx={{
              p: 2,
              borderRadius: "50%",
              bgcolor: `${theme.palette.primary.main}15`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <Icon
              icon={icon}
              width={60}
              height={60}
              color={theme.palette.primary.main}
            />
          </Box>
        </m.div>
        <Typography
          variant="body1"
          color="text.secondary"
          mt={1}
          sx={{ textAlign: "center" }}
        >
          {text}
        </Typography>
      </Box>
    </m.div>
  );

  // if (
  //   !metrics || !Array.isArray(metrics) || metrics.length === 0 ||
  //   !workoutStats || !weightChartSeries || !workoutCompletionSeries
  // ) {
  //   return (
  //     <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
  //       <Typography variant="h6" color="text.secondary">Loading analytics...</Typography>
  //     </Box>
  //   );
  // }

  return (
    <Box>
      <Grid container spacing={3} mb={4}>
        {[
          {
            title: "Current Weight",
            icon: "mdi:weight",
            value:
              metrics && Array.isArray(metrics) && metrics.length > 0
                ? `${metrics[0].weight}`
                : "N/A",
            unit: "lbs",
            subtext:
              metrics && Array.isArray(metrics) && metrics.length > 1
                ? `${metrics[0].weight > metrics[1].weight ? "+" : ""}${(
                    metrics[0].weight - metrics[1].weight
                  ).toFixed(1)} lbs since last entry`
                : "No previous data",
            gradient: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
          },
          {
            title: "Workout Completion",
            icon: "mdi:check-circle",
            value: workoutStats
              ? `${Math.round(workoutStats.completionRate)}`
              : "N/A",
            unit: "%",
            subtext: workoutStats
              ? `${workoutStats.completedWorkouts} of ${workoutStats.totalWorkouts} workouts completed`
              : "No data available",
            gradient: `linear-gradient(135deg, ${theme.palette.success.light}, ${theme.palette.success.main})`,
          },
          {
            title: "Workouts Completed",
            icon: "mdi:dumbbell",
            value: workoutStats ? workoutStats.completedWorkouts : "N/A",
            unit: "",
            subtext:
              workoutStats && workoutStats.lastWorkoutDate
                ? `Last workout: ${moment(
                    workoutStats.lastWorkoutDate
                  ).fromNow()}`
                : "No recent workouts",
            gradient: `linear-gradient(135deg, ${theme.palette.info.light}, ${theme.palette.info.main})`,
          },
        ].map((card, index) => (
          <Grid item xs={12} md={4} key={index}>
            <m.div
              custom={index}
              initial="hidden"
              animate={animate ? "visible" : "hidden"}
              variants={cardVariants}
            >
              <Card
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 20px rgba(0,0,0,0.1)",
                  },
                  boxShadow: "0 6px 15px rgba(0,0,0,0.05)",
                }}
              >
                <Box
                  sx={{
                    p: 3,
                    background: card.gradient,
                    color: "white",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: -20,
                      right: -20,
                      width: 120,
                      height: 120,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.1)",
                      zIndex: 0,
                    }}
                  />
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ position: "relative", zIndex: 1 }}
                  >
                    <Typography variant="h6" fontWeight="bold">
                      {card.title}
                    </Typography>
                    <Box
                      sx={{
                        p: 1,
                        borderRadius: "50%",
                        bgcolor: "rgba(255,255,255,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon icon={card.icon} width={28} height={28} />
                    </Box>
                  </Stack>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    mt={2}
                    sx={{ position: "relative", zIndex: 1 }}
                  >
                    {card.value}
                    <Typography
                      component="span"
                      variant="h6"
                      sx={{ ml: 1, opacity: 0.8 }}
                    >
                      {card.unit}
                    </Typography>
                  </Typography>
                </Box>
                <Box sx={{ p: 2, bgcolor: "background.paper" }}>
                  <Typography variant="body2" color="text.secondary">
                    {card.subtext}
                  </Typography>
                </Box>
              </Card>
            </m.div>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <m.div
            initial="hidden"
            animate={animate ? "visible" : "hidden"}
            variants={chartVariants}
          >
            <Card
              sx={{
                p: 3,
                height: "100%",
                borderRadius: 3,
                boxShadow: "0 6px 15px rgba(0,0,0,0.05)",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  boxShadow: "0 12px 20px rgba(0,0,0,0.1)",
                },
              }}
            >
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Weight Progress
              </Typography>
              <Box sx={{ height: 300, mt: 2 }}>
                {metrics && metrics.length > 0 ? (
                  <Fade in={animate} timeout={800}>
                    <Box>
                      <Chart
                        options={weightChartOptions}
                        series={weightChartSeries}
                        type="area"
                        height="100%"
                      />
                    </Box>
                  </Fade>
                ) : (
                  <EmptyStateIcon
                    icon="mdi:chart-line"
                    text="No weight data available yet. Add your weight measurements to see your progress over time."
                  />
                )}
              </Box>
            </Card>
          </m.div>
        </Grid>
        <Grid item xs={12} md={6}>
          <m.div
            initial="hidden"
            animate={animate ? "visible" : "hidden"}
            variants={chartVariants}
          >
            <Card
              sx={{
                p: 3,
                height: "100%",
                borderRadius: 3,
                boxShadow: "0 6px 15px rgba(0,0,0,0.05)",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  boxShadow: "0 12px 20px rgba(0,0,0,0.1)",
                },
              }}
            >
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Workout Completion
              </Typography>
              <Box sx={{ height: 300, mt: 2 }}>
                {workoutStats ? (
                  <Fade in={animate} timeout={800}>
                    <Box>
                      <Chart
                        options={workoutCompletionOptions}
                        series={workoutCompletionSeries}
                        type="donut"
                        height="100%"
                      />
                    </Box>
                  </Fade>
                ) : (
                  <EmptyStateIcon
                    icon="mdi:chart-pie"
                    text="No workout data available yet. Complete your workouts to track your progress."
                  />
                )}
              </Box>
            </Card>
          </m.div>
        </Grid>
      </Grid>

      {aiAnalysis && (
        <Grow in={animate} timeout={800} style={{ transformOrigin: "0 0 0" }}>
          <Card
            sx={{
              p: 3,
              mt: 3,
              borderRadius: 3,
              background: `linear-gradient(to right, ${theme.palette.background.paper}, ${theme.palette.background.paper} 50%, rgba(25, 118, 210, 0.05))`,
              boxShadow: "0 6px 15px rgba(0,0,0,0.05)",
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                boxShadow: "0 12px 20px rgba(0,0,0,0.1)",
              },
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <Zoom in={animate} timeout={800}>
                <Avatar
                  sx={{
                    bgcolor: theme.palette.primary.main,
                    width: 48,
                    height: 48,
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  <Icon icon="mdi:robot" width={28} height={28} color="white" />
                </Avatar>
              </Zoom>
              <Typography variant="h6" fontWeight="bold">
                AI Insights
              </Typography>
            </Stack>
            <Typography variant="body1" mb={2} sx={{ lineHeight: 1.7 }}>
              {aiAnalysis.summary ||
                "No AI analysis available yet. Add more workout data to get personalized insights."}
            </Typography>
            {aiAnalysis.recommendations && (
              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  bgcolor: "rgba(0,0,0,0.02)",
                  borderRadius: 2,
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                  Recommendations:
                </Typography>
                <Grid container spacing={2}>
                  {aiAnalysis.recommendations.map((rec, index) => (
                    <Grid item xs={12} md={6} key={index}>
                      <m.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <Card
                          sx={{
                            p: 2,
                            borderLeft: `4px solid ${theme.palette.primary.main}`,
                            boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
                            bgcolor: "background.paper",
                            transition: "transform 0.2s",
                            "&:hover": {
                              transform: "translateX(5px)",
                            },
                          }}
                        >
                          <Typography variant="body2">{rec}</Typography>
                        </Card>
                      </m.div>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </Card>
        </Grow>
      )}
    </Box>
  );
};

export default AnalyticsOverview;
