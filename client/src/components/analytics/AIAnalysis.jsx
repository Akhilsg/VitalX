import { Icon } from "@iconify/react";
import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import React from "react";

const AIAnalysis = ({ aiAnalysis, theme, setActiveTab }) => {
  return (
    <Box>
      {aiAnalysis ? (
        <>
          <Card
            sx={{
              p: 3,
              borderRadius: 3,
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
              mb: 3,
            }}
          >
            <Typography variant="h6" fontWeight="bold" mb={3}>
              AI Analysis
            </Typography>
            <Typography variant="body1" mb={3}>
              {aiAnalysis.summary}
            </Typography>

            {aiAnalysis.progressAnalysis && (
              <Card
                sx={{
                  p: 3,
                  borderRadius: 2,
                  boxShadow: "none",
                  bgcolor: "rgba(0,0,0,0.02)",
                  mb: 3,
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                  Progress Analysis
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {aiAnalysis.progressAnalysis}
                </Typography>

                {aiAnalysis.progressMetrics && (
                  <Grid container spacing={2} mt={1}>
                    {Object.entries(aiAnalysis.progressMetrics).map(
                      ([key, value], index) => (
                        <Grid item xs={6} md={3} key={index}>
                          <Card
                            sx={{
                              p: 2,
                              textAlign: "center",
                              boxShadow: "none",
                              bgcolor: "background.paper",
                              borderRadius: 2,
                            }}
                          >
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              textTransform="uppercase"
                            >
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </Typography>
                            <Typography variant="h6" fontWeight="bold" mt={0.5}>
                              {typeof value === "number"
                                ? value.toFixed(1)
                                : value}
                              {key.includes("Percent")
                                ? "%"
                                : key.includes("Weight")
                                ? " lbs"
                                : ""}
                            </Typography>
                          </Card>
                        </Grid>
                      )
                    )}
                  </Grid>
                )}
              </Card>
            )}

            <Grid container spacing={3} mb={3}>
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    boxShadow: "none",
                    bgcolor: "rgba(0,0,0,0.02)",
                    height: "100%",
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                    <Icon
                      icon="mdi:thumb-up"
                      width={20}
                      height={20}
                      color={theme.palette.success.main}
                    />
                    <Typography variant="subtitle1" fontWeight="bold">
                      Strengths
                    </Typography>
                  </Stack>
                  {aiAnalysis.strengths &&
                  Array.isArray(aiAnalysis.strengths) ? (
                    <ul style={{ paddingLeft: "20px", margin: "8px 0" }}>
                      {aiAnalysis.strengths.map((strength, index) => (
                        <li key={index} style={{ marginBottom: "8px" }}>
                          <Typography variant="body2">{strength}</Typography>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No strength analysis available
                    </Typography>
                  )}
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    boxShadow: "none",
                    bgcolor: "rgba(0,0,0,0.02)",
                    height: "100%",
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                    <Icon
                      icon="mdi:alert-circle"
                      width={20}
                      height={20}
                      color={theme.palette.warning.main}
                    />
                    <Typography variant="subtitle1" fontWeight="bold">
                      Areas for Improvement
                    </Typography>
                  </Stack>
                  {aiAnalysis.areasForImprovement &&
                  Array.isArray(aiAnalysis.areasForImprovement) ? (
                    <ul style={{ paddingLeft: "20px", margin: "8px 0" }}>
                      {aiAnalysis.areasForImprovement.map((area, index) => (
                        <li key={index} style={{ marginBottom: "8px" }}>
                          <Typography variant="body2">{area}</Typography>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No improvement areas analysis available
                    </Typography>
                  )}
                </Card>
              </Grid>
            </Grid>

            {aiAnalysis.recommendations && (
              <Card
                sx={{
                  p: 3,
                  borderRadius: 2,
                  boxShadow: "none",
                  bgcolor: "rgba(0,0,0,0.02)",
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                  <Icon
                    icon="mdi:lightbulb"
                    width={20}
                    height={20}
                    color={theme.palette.info.main}
                  />
                  <Typography variant="subtitle1" fontWeight="bold">
                    Personalized Recommendations
                  </Typography>
                </Stack>
                <Grid container spacing={2}>
                  {aiAnalysis.recommendations.map((rec, index) => (
                    <Grid item xs={12} md={6} key={index}>
                      <Card
                        sx={{
                          p: 2,
                          borderLeft: `4px solid ${theme.palette.primary.main}`,
                          boxShadow: "none",
                          bgcolor: "background.paper",
                          transition: "transform 0.2s",
                          "&:hover": {
                            transform: "translateY(-3px)",
                          },
                        }}
                      >
                        <Typography variant="body2">{rec}</Typography>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Card>
            )}

            {aiAnalysis.recommendations &&
            Array.isArray(aiAnalysis.recommendations) ? (
              <Card
                sx={{
                  p: 3,
                  mt: 3,
                  borderRadius: 2,
                  boxShadow: "none",
                  bgcolor: "rgba(0,0,0,0.02)",
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                  <Icon
                    icon="mdi:target"
                    width={20}
                    height={20}
                    color={theme.palette.error.main}
                  />
                  <Typography variant="subtitle1" fontWeight="bold">
                    Predicted Goals
                  </Typography>
                </Stack>
                <Grid container spacing={2}>
                  {Object.entries(aiAnalysis.predictedGoals).map(
                    ([key, value], index) => (
                      <Grid item xs={12} md={4} key={index}>
                        <Card
                          sx={{
                            p: 2,
                            boxShadow: "none",
                            bgcolor: "background.paper",
                            borderRadius: 2,
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            fontWeight="bold"
                            mb={1}
                          >
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </Typography>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                          >
                            <Box
                              sx={{
                                width: 50,
                                height: 50,
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                bgcolor: `${theme.palette.primary.main}20`,
                                color: theme.palette.primary.main,
                                fontWeight: "bold",
                              }}
                            >
                              {typeof value === "number"
                                ? value.toFixed(0)
                                : value}
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                              {key.includes("Weight")
                                ? "lbs by " +
                                  moment().add(30, "days").format("MMM DD")
                                : key.includes("Strength")
                                ? "% increase in 4 weeks"
                                : "target"}
                            </Typography>
                          </Stack>
                        </Card>
                      </Grid>
                    )
                  )}
                </Grid>
              </Card>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No recommendations available
              </Typography>
            )}
          </Card>

          {aiAnalysis.workoutSuggestions && (
            <Grid item xs={12}>
              <Card
                sx={{
                  p: 3,
                  borderRadius: 3,
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                  mt: 3,
                }}
              >
                <Typography variant="h6" fontWeight="bold" mb={3}>
                  AI Workout Suggestions
                </Typography>
                <Grid container spacing={2}>
                  {aiAnalysis.workoutSuggestions.map((workout, index) => (
                    <Grid item xs={12} md={4} key={index}>
                      <Card
                        sx={{
                          borderRadius: 2,
                          overflow: "hidden",
                          boxShadow:
                            "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
                          transition: "transform 0.3s",
                          "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow:
                              "rgba(0, 0, 0, 0.1) 0px 10px 30px 0px, rgba(0, 0, 0, 0.1) 0px 0px 0px 1px",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            p: 2,
                            background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
                            color: "white",
                          }}
                        >
                          <Typography variant="subtitle1" fontWeight="bold">
                            {workout.name}
                          </Typography>
                          <Typography variant="caption" sx={{ opacity: 0.8 }}>
                            {workout.type} • {workout.duration} min •{" "}
                            {workout.difficulty}
                          </Typography>
                        </Box>
                        <Box sx={{ p: 2 }}>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            mb={1}
                          >
                            {workout.description}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            fontWeight="bold"
                          >
                            FOCUS AREAS:
                          </Typography>
                          <Stack
                            direction="row"
                            spacing={1}
                            mt={0.5}
                            flexWrap="wrap"
                            useFlexGap
                          >
                            {workout.focusAreas.map((area, idx) => (
                              <Box
                                key={idx}
                                sx={{
                                  px: 1,
                                  py: 0.5,
                                  bgcolor: `${theme.palette.primary.main}15`,
                                  color: theme.palette.primary.main,
                                  borderRadius: 1,
                                  fontSize: "0.75rem",
                                  mb: 0.5,
                                }}
                              >
                                {area}
                              </Box>
                            ))}
                          </Stack>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Card>
            </Grid>
          )}
        </>
      ) : (
        <Box
          sx={{
            p: 4,
            textAlign: "center",
            bgcolor: "rgba(0,0,0,0.02)",
            borderRadius: 2,
          }}
        >
          <Icon
            icon="mdi:robot-confused"
            width={60}
            height={60}
            color={theme.palette.text.secondary}
          />
          <Typography variant="h6" color="text.secondary" mt={2} mb={1}>
            No AI Analysis Available Yet
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ maxWidth: 500, mx: "auto" }}
          >
            Add more workout and body measurement data to receive personalized
            AI insights. Our AI needs at least 2 weeks of consistent data to
            generate meaningful analysis.
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            sx={{ mt: 3 }}
            onClick={() => setActiveTab(1)}
            startIcon={<Icon icon="mdi:plus" width={20} height={20} />}
          >
            Add Body Measurements
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default AIAnalysis;
