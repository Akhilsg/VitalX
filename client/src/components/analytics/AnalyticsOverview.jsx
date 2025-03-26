import { Icon } from "@iconify/react";
import {
  Avatar,
  Box,
  Card,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
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
  setActiveTab
}) => {
  return (
    <Box>
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
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
                  ? `${
                      metrics[0].weight > metrics[1].weight ? "+" : ""
                    }${(metrics[0].weight - metrics[1].weight).toFixed(
                      1
                    )} lbs since last entry`
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
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
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
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
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
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
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
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    mt={1}
                  >
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
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
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
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    mt={1}
                  >
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
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            background: `linear-gradient(to right, ${theme.palette.background.paper}, ${theme.palette.background.paper} 50%, rgba(25, 118, 210, 0.05))`,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1} mb={2}>
            <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
              <Icon
                icon="mdi:robot"
                width={24}
                height={24}
                color="white"
              />
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