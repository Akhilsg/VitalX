import { Icon } from "@iconify/react";
import { Box, Card, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import Chart from "react-apexcharts";

const WorkoutStats = ({
  workoutStats,
  workoutChartOptions,
  workoutChartSeries,
  theme,
}) => {
  // Mock workoutStats for before and after transformation
  workoutStats = {
    totalWorkouts: 20,
    completionRate: 87,
    avgDuration: 45,
    mostCommonType: "HIIT",
    recentWorkouts: [
      {
        date: "2025-03-01",
        name: "Full Body Burn",
        type: "HIIT",
        duration: 45,
        completed: true,
      },
      {
        date: "2025-03-03",
        name: "Cardio Blast",
        type: "Cardio",
        duration: 40,
        completed: true,
      },
      {
        date: "2025-03-06",
        name: "Upper Body Power",
        type: "Strength",
        duration: 50,
        completed: true,
      },
      {
        date: "2025-03-10",
        name: "Core Crusher",
        type: "HIIT",
        duration: 45,
        completed: false,
      },
      {
        date: "2025-03-15",
        name: "Leg Day",
        type: "Strength",
        duration: 60,
        completed: true,
      },
      {
        date: "2025-03-20",
        name: "HIIT Madness",
        type: "HIIT",
        duration: 45,
        completed: true,
      },
      {
        date: "2025-03-25",
        name: "Cardio & Core",
        type: "Cardio",
        duration: 35,
        completed: true,
      },
      {
        date: "2025-03-30",
        name: "Final Burn",
        type: "HIIT",
        duration: 50,
        completed: true,
      },
    ],
    weightProgress: [
      { date: "2025-03-01", weight: 249 },
      { date: "2025-03-10", weight: 245 },
      { date: "2025-03-20", weight: 241 },
      { date: "2025-03-30", weight: 238 },
    ],
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card
          sx={{
            p: 3,
            borderRadius: 3,
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            height: "100%",
          }}
        >
          <Typography variant="h6" fontWeight="bold" mb={3}>
            Workout Distribution
          </Typography>
          <Box sx={{ height: 300 }}>
            {workoutStats ? (
              <Chart
                options={workoutChartOptions}
                series={workoutChartSeries}
                type="pie"
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
      <Grid item xs={12} md={6}>
        <Card
          sx={{
            p: 3,
            borderRadius: 3,
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            height: "100%",
          }}
        >
          <Typography variant="h6" fontWeight="bold" mb={3}>
            Workout Statistics
          </Typography>
          {workoutStats ? (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Card
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    boxShadow: "none",
                    bgcolor: "rgba(0,0,0,0.02)",
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    TOTAL WORKOUTS
                  </Typography>
                  <Typography variant="h5" fontWeight="bold" mt={1}>
                    {workoutStats.totalWorkouts}
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    boxShadow: "none",
                    bgcolor: "rgba(0,0,0,0.02)",
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    COMPLETION RATE
                  </Typography>
                  <Typography variant="h5" fontWeight="bold" mt={1}>
                    {Math.round(workoutStats.completionRate)}%
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    boxShadow: "none",
                    bgcolor: "rgba(0,0,0,0.02)",
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    AVG. DURATION
                  </Typography>
                  <Typography variant="h5" fontWeight="bold" mt={1}>
                    {workoutStats.avgDuration} min
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    boxShadow: "none",
                    bgcolor: "rgba(0,0,0,0.02)",
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    MOST COMMON
                  </Typography>
                  <Typography variant="h5" fontWeight="bold" mt={1}>
                    {workoutStats.mostCommonType}
                  </Typography>
                </Card>
              </Grid>
            </Grid>
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
                py: 4,
              }}
            >
              <Icon
                icon="mdi:dumbbell"
                width={40}
                height={40}
                color={theme.palette.text.secondary}
              />
              <Typography variant="body2" color="text.secondary" mt={1}>
                No workout statistics available
              </Typography>
            </Box>
          )}
        </Card>
      </Grid>

      {workoutStats &&
        workoutStats.recentWorkouts &&
        Array.isArray(workoutStats.recentWorkouts) && (
          <Grid item xs={12}>
            <Card
              sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
              }}
            >
              <Typography variant="h6" fontWeight="bold" mb={3}>
                Recent Workouts
              </Typography>
              <Box sx={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "0.875rem",
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        backgroundColor: "rgba(0,0,0,0.02)",
                        borderBottom: `1px solid ${theme.palette.divider}`,
                      }}
                    >
                      <th style={{ padding: "12px 16px", textAlign: "left" }}>
                        Date
                      </th>
                      <th style={{ padding: "12px 16px", textAlign: "left" }}>
                        Workout
                      </th>
                      <th style={{ padding: "12px 16px", textAlign: "left" }}>
                        Type
                      </th>
                      <th style={{ padding: "12px 16px", textAlign: "right" }}>
                        Duration
                      </th>
                      <th style={{ padding: "12px 16px", textAlign: "center" }}>
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {workoutStats.recentWorkouts.map((workout, index) => (
                      <tr
                        key={index}
                        style={{
                          borderBottom: `1px solid ${theme.palette.divider}`,
                        }}
                      >
                        <td style={{ padding: "12px 16px", fontWeight: 500 }}>
                          {workout.date}
                        </td>
                        <td style={{ padding: "12px 16px" }}>{workout.name}</td>
                        <td style={{ padding: "12px 16px" }}>
                          <Box
                            sx={{
                              display: "inline-block",
                              px: 1.5,
                              py: 0.5,
                              borderRadius: 1,
                              fontSize: "0.75rem",
                              bgcolor: `${theme.palette.primary.main}15`,
                              color: theme.palette.primary.main,
                            }}
                          >
                            {workout.type}
                          </Box>
                        </td>
                        <td
                          style={{ padding: "12px 16px", textAlign: "right" }}
                        >
                          {workout.duration} min
                        </td>
                        <td
                          style={{ padding: "12px 16px", textAlign: "center" }}
                        >
                          {workout.completed ? (
                            <Box
                              sx={{
                                display: "inline-flex",
                                alignItems: "center",
                                color: theme.palette.success.main,
                              }}
                            >
                              <Icon
                                icon="mdi:check-circle"
                                width={20}
                                height={20}
                              />
                              <Typography
                                variant="caption"
                                sx={{ ml: 0.5, fontWeight: 500 }}
                              >
                                Completed
                              </Typography>
                            </Box>
                          ) : (
                            <Box
                              sx={{
                                display: "inline-flex",
                                alignItems: "center",
                                color: theme.palette.error.main,
                              }}
                            >
                              <Icon
                                icon="mdi:close-circle"
                                width={20}
                                height={20}
                              />
                              <Typography
                                variant="caption"
                                sx={{ ml: 0.5, fontWeight: 500 }}
                              >
                                Missed
                              </Typography>
                            </Box>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            </Card>
          </Grid>
        )}
    </Grid>
  );
};

export default WorkoutStats;
