import { Icon } from "@iconify/react";
import { Avatar, Box, Card, Grid, Stack, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import Chart from "react-apexcharts";

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
  metrics = [
    { date: "2025-03-30", weight: 241 },
    { date: "2025-03-20", weight: 242 },
    { date: "2025-03-10", weight: 246 },
    { date: "2025-03-01", weight: 249 },
  ];
  workoutStats = {
    totalWorkouts: 20,
    completedWorkouts: 17,
    completionRate: 85,
    lastWorkoutDate: "2025-03-30",
  };
  workoutCompletionSeries = [17, 3]; // 17 completed, 3 missed
  weightChartSeries = [
    {
      name: "Weight",
      data: [249, 246, 242, 241],
    },
  ];
  aiAnalysis = {
    summary:
      "Your recent activity shows consistent effort and steady weight loss. Great job maintaining an 85% workout completion rate!",
    recommendations: [
      "Try increasing workout frequency to 4 days/week to accelerate results.",
      "Include more protein-rich meals to support muscle growth.",
      "Consider rest days with light activity like walking or stretching.",
    ],
  };

  weightChartOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
      background: "transparent",
      foreColor: theme.palette.text.primary,
    },
    tooltip: {
      theme: "dark",
      style: {
        fontSize: "14px",
      },
      marker: {
        show: false,
      },
      y: {
        formatter: (val) => `${val} lbs`,
      },
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 4,
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        shadeIntensity: 0.6,
        gradientToColors: [theme.palette.primary.main],
        opacityFrom: 0.4,
        opacityTo: 0.05,
        stops: [0, 90, 100],
      },
    },
    colors: [theme.palette.primary.light],
    xaxis: {
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
  };

  workoutCompletionOptions = {
    chart: {
      type: "donut",
      toolbar: { show: false },
      background: "transparent",
      foreColor: theme.palette.text.primary,
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: (val) => `${val} sessions`,
      },
    },
    labels: ["Completed", "Missed"],
    dataLabels: {
      enabled: true,
      dropShadow: { enabled: false },
      style: {
        fontSize: "15px",
        fontWeight: "bold",
        colors: ["#FFFFFF"],
      },
      formatter: (val) => `${Math.floor(val)}%`,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "50%",
          background: "transparent",
        },
        expandOnClick: true,
        offsetX: 0,
        offsetY: 0,
      },
    },
    colors: [theme.palette.success.main, theme.palette.error.main],
    stroke: {
      show: false,
      width: 0,
    },
    legend: {
      show: false,
    },
  };

  return (
    <Box>
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              transition: "transform 0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
              },
            }}
          >
            <Box
              sx={{
                p: 3,
                background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
                color: "white",
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h6" fontWeight="bold">
                  Current Weight
                </Typography>
                <Icon icon="mdi:weight" width={28} height={28} />
              </Stack>
              <Typography variant="h3" fontWeight="bold" mt={2}>
                {metrics && Array.isArray(metrics) && metrics.length > 0
                  ? `${metrics[0].weight}`
                  : "N/A"}
                <Typography
                  component="span"
                  variant="h6"
                  sx={{ ml: 1, opacity: 0.8 }}
                >
                  lbs
                </Typography>
              </Typography>
            </Box>
            <Box sx={{ p: 2, bgcolor: "background.paper" }}>
              <Typography variant="body2" color="text.secondary">
                {metrics && Array.isArray(metrics) && metrics.length > 1
                  ? `${metrics[0].weight > metrics[1].weight ? "+" : ""}${
                      metrics[0].weight - metrics[1].weight
                    } lbs since last entry`
                  : "No previous data"}
              </Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              transition: "transform 0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "rgba(0, 0, 0, 0.2) 0px 20px 30px",
              },
            }}
          >
            <Box
              sx={{
                p: 3,
                background: `linear-gradient(135deg, ${theme.palette.success.light}, ${theme.palette.success.main})`,
                color: "white",
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h6" fontWeight="bold">
                  Workout Completion
                </Typography>
                <Icon icon="mdi:check-circle" width={28} height={28} />
              </Stack>
              <Typography variant="h3" fontWeight="bold" mt={2}>
                {workoutStats
                  ? `${Math.round(workoutStats.completionRate)}`
                  : "N/A"}
                <Typography
                  component="span"
                  variant="h6"
                  sx={{ ml: 1, opacity: 0.8 }}
                >
                  %
                </Typography>
              </Typography>
            </Box>
            <Box sx={{ p: 2, bgcolor: "background.paper" }}>
              <Typography variant="body2" color="text.secondary">
                {workoutStats
                  ? `${workoutStats.completedWorkouts} of ${workoutStats.totalWorkouts} workouts completed`
                  : "No data available"}
              </Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              transition: "transform 0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "rgba(0, 0, 0, 0.2) 0px 20px 30px",
              },
            }}
          >
            <Box
              sx={{
                p: 3,
                background: `linear-gradient(135deg, ${theme.palette.info.light}, ${theme.palette.info.main})`,
                color: "white",
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h6" fontWeight="bold">
                  Workouts Completed
                </Typography>
                <Icon icon="mdi:dumbbell" width={28} height={28} />
              </Stack>
              <Typography variant="h3" fontWeight="bold" mt={2}>
                {workoutStats ? workoutStats.completedWorkouts : "N/A"}
              </Typography>
            </Box>
            <Box sx={{ p: 2, bgcolor: "background.paper" }}>
              <Typography variant="body2" color="text.secondary">
                {workoutStats && workoutStats.lastWorkoutDate
                  ? `Last workout: ${moment(
                      workoutStats.lastWorkoutDate
                    ).fromNow()}`
                  : "No recent workouts"}
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              p: 3,
              height: "100%",
              borderRadius: 3,
            }}
          >
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Weight Progress
            </Typography>
            <Box sx={{ height: 300, mt: 2 }}>
              {metrics && metrics.length > 0 ? (
                <Chart
                  options={weightChartOptions}
                  series={weightChartSeries}
                  type="area"
                  height="100%"
                />
              ) : (
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    bgcolor: "rgba(0,0,0,0.02)",
                    borderRadius: 2,
                  }}
                >
                  <Icon
                    icon="mdi:chart-line"
                    width={40}
                    height={40}
                    color={theme.palette.text.secondary}
                  />
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    No weight data available
                  </Typography>
                </Box>
              )}
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              p: 3,
              height: "100%",
              borderRadius: 3,
            }}
          >
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Workout Completion
            </Typography>
            <Box sx={{ height: 300, mt: 2 }}>
              {workoutStats ? (
                <Chart
                  options={workoutCompletionOptions}
                  series={workoutCompletionSeries}
                  type="donut"
                  height="100%"
                />
              ) : (
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    bgcolor: "rgba(0,0,0,0.02)",
                    borderRadius: 2,
                  }}
                >
                  <Icon
                    icon="mdi:chart-pie"
                    width={40}
                    height={40}
                    color={theme.palette.text.secondary}
                  />
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    No workout data available
                  </Typography>
                </Box>
              )}
            </Box>
          </Card>
        </Grid>
      </Grid>

      {aiAnalysis && (
        <Card
          sx={{
            p: 3,
            mt: 3,
            borderRadius: 3,
            background: `linear-gradient(to right, ${theme.palette.background.paper}, ${theme.palette.background.paper} 50%, rgba(25, 118, 210, 0.05))`,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1} mb={2}>
            <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
              <Icon icon="mdi:robot" width={24} height={24} color="white" />
            </Avatar>
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
                    <Card
                      sx={{
                        p: 2,
                        borderLeft: `4px solid ${theme.palette.primary.main}`,
                        boxShadow: "none",
                        bgcolor: "background.paper",
                      }}
                    >
                      <Typography variant="body2">{rec}</Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Card>
      )}
    </Box>
  );
};

export default AnalyticsOverview;
