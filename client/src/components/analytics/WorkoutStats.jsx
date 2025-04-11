import { Icon } from "@iconify/react";
import { Box, Card, Grid, Stack, Typography, Fade, Grow } from "@mui/material";
import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { m } from "framer-motion";

const WorkoutStats = ({
  workoutStats,
  workoutChartOptions,
  workoutChartSeries,
  theme,
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
        ease: "easeOut"
      }
    })
  };

  const EmptyStateIcon = ({ icon, text }) => (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{ width: '100%', height: '100%' }}
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
            stiffness: 200
          }}
        >
          <Box
            sx={{
              p: 2,
              borderRadius: '50%',
              bgcolor: `${theme.palette.primary.main}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2
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
          sx={{ textAlign: 'center' }}
        >
          {text}
        </Typography>
      </Box>
    </m.div>
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <m.div
          initial="hidden"
          animate={animate ? "visible" : "hidden"}
          variants={cardVariants}
          custom={0}
        >
          <Card
            sx={{
              p: 3,
              borderRadius: 3,
              boxShadow: "0 6px 15px rgba(0,0,0,0.05)",
              height: "100%",
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 12px 20px rgba(0,0,0,0.1)"
              }
            }}
          >
            <Typography variant="h6" fontWeight="bold" mb={3}>
              Workout Distribution
            </Typography>
            <Box sx={{ height: 300 }}>
              {workoutStats ? (
                <Fade in={animate} timeout={800}>
                  <Box>
                    <Chart
                      options={workoutChartOptions}
                      series={workoutChartSeries}
                      type="pie"
                      height="100%"
                    />
                  </Box>
                </Fade>
              ) : (
                <EmptyStateIcon 
                  icon="mdi:chart-pie" 
                  text="No workout data available yet. Complete different types of workouts to see your distribution."
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
          variants={cardVariants}
          custom={1}
        >
          <Card
            sx={{
              p: 3,
              borderRadius: 3,
              boxShadow: "0 6px 15px rgba(0,0,0,0.05)",
              height: "100%",
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 12px 20px rgba(0,0,0,0.1)"
              }
            }}
          >
            <Typography variant="h6" fontWeight="bold" mb={3}>
              Workout Statistics
            </Typography>
            {workoutStats ? (
              <Grid container spacing={2}>
                {[
                  {
                    title: "TOTAL WORKOUTS",
                    value: workoutStats.totalWorkouts,
                    icon: "mdi:calendar-check",
                    color: theme.palette.primary.main
                  },
                  {
                    title: "COMPLETION RATE",
                    value: `${Math.round(workoutStats.completionRate)}%`,
                    icon: "mdi:percent",
                    color: theme.palette.success.main
                  },
                  {
                    title: "AVG. DURATION",
                    value: `${workoutStats.avgDuration} min`,
                    icon: "mdi:clock-outline",
                    color: theme.palette.warning.main
                  },
                  {
                    title: "MOST COMMON",
                    value: workoutStats.mostCommonType,
                    icon: "mdi:star",
                    color: theme.palette.info.main
                  }
                ].map((stat, index) => (
                  <Grid item xs={6} key={index}>
                    <m.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + (index * 0.1) }}
                    >
                      <Card
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          boxShadow: "none",
                          bgcolor: "rgba(0,0,0,0.02)",
                          transition: "transform 0.2s, box-shadow 0.2s",
                          "&:hover": {
                            transform: "translateY(-3px)",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
                            bgcolor: `${stat.color}08`
                          }
                        }}
                      >
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Box
                            sx={{
                              p: 1,
                              borderRadius: '50%',
                              bgcolor: `${stat.color}15`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <Icon icon={stat.icon} width={18} height={18} color={stat.color} />
                          </Box>
                          <Typography variant="caption" color="text.secondary">
                            {stat.title}
                          </Typography>
                        </Stack>
                        <Typography variant="h5" fontWeight="bold" mt={1}>
                          {stat.value}
                        </Typography>
                      </Card>
                    </m.div>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <EmptyStateIcon 
                icon="mdi:dumbbell" 
                text="No workout statistics available yet. Complete workouts to see your stats."
              />
            )}
          </Card>
        </m.div>
      </Grid>

      {workoutStats && workoutStats.recentWorkouts && Array.isArray(workoutStats.recentWorkouts) && (
        <Grid item xs={12}>
          <Grow in={animate} timeout={800} style={{ transformOrigin: '0 0 0' }}>
            <Card
              sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: "0 6px 15px rgba(0,0,0,0.05)",
                transition: "box-shadow 0.3s",
                "&:hover": {
                  boxShadow: "0 12px 20px rgba(0,0,0,0.1)"
                }
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
                      <m.tr
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + (index * 0.05) }}
                        style={{
                          borderBottom: `1px solid ${theme.palette.divider}`,
                          backgroundColor: index % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.01)'
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
                        <td style={{ padding: "12px 16px", textAlign: "right" }}>
                          {workout.duration} min
                        </td>
                        <td style={{ padding: "12px 16px", textAlign: "center" }}>
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
                      </m.tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            </Card>
          </Grow>
        </Grid>
      )}
    </Grid>
  );
};

export default WorkoutStats;
