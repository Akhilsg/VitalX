import { Icon } from "@iconify/react";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import React from "react";
import Chart from "react-apexcharts";

const BodyMetrics = ({
  metrics,
  newMetric,
  handleInputChange,
  handleSubmitMetrics,
  loading,
  measurementsChartOptions,
  measurementsChartSeries,
  theme,
}) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={5}>
        <Card
          sx={{
            p: 3,
            borderRadius: 3,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1} mb={3}>
            <Icon
              icon="mdi:tape-measure"
              width={24}
              height={24}
              color={theme.palette.primary.main}
            />
            <Typography variant="h6" fontWeight="bold">
              Record Body Measurements
            </Typography>
          </Stack>
          <form onSubmit={handleSubmitMetrics}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Weight (lbs)"
                  name="weight"
                  type="number"
                  value={newMetric.weight}
                  onChange={handleInputChange}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <Box sx={{ mr: 1, color: "text.secondary" }}>
                        <Icon icon="mdi:weight" width={20} height={20} />
                      </Box>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Body Fat %"
                  name="bodyFat"
                  type="number"
                  value={newMetric.bodyFat}
                  onChange={handleInputChange}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <Box sx={{ mr: 1, color: "text.secondary" }}>
                        <Icon icon="mdi:percent" width={20} height={20} />
                      </Box>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Measurements (inches)
                  </Typography>
                </Divider>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Chest"
                  name="measurements.chest"
                  type="number"
                  value={newMetric.measurements.chest}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Waist"
                  name="measurements.waist"
                  type="number"
                  value={newMetric.measurements.waist}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Hips"
                  name="measurements.hips"
                  type="number"
                  value={newMetric.measurements.hips}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Arms"
                  name="measurements.arms"
                  type="number"
                  value={newMetric.measurements.arms}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Thighs"
                  name="measurements.thighs"
                  type="number"
                  value={newMetric.measurements.thighs}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Notes"
                  name="notes"
                  multiline
                  rows={3}
                  value={newMetric.notes}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  sx={{
                    mt: 2,
                    py: 1.5,
                    fontWeight: "bold",
                    boxShadow: "0 8px 16px rgba(25, 118, 210, 0.3)",
                    "&:hover": {
                      boxShadow: "0 12px 20px rgba(25, 118, 210, 0.4)",
                    },
                  }}
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Save Measurements"
                  )}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Card>
      </Grid>
      <Grid item xs={12} md={7}>
        <Card
          sx={{
            p: 3,
            borderRadius: 3,
            height: "100%",
          }}
        >
          <Typography variant="h6" fontWeight="bold" mb={3}>
            Body Measurements History
          </Typography>
          <Box sx={{ height: 400 }}>
            {metrics && Array.isArray(metrics) && metrics.length > 0 ? (
              <Chart
                options={measurementsChartOptions}
                series={measurementsChartSeries}
                type="line"
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
                  No measurement data available
                </Typography>
              </Box>
            )}
          </Box>
        </Card>
      </Grid>

      {metrics && Array.isArray(metrics) && metrics.length > 0 && (
        <Grid item xs={12}>
          <Card
            sx={{
              p: 3,
              borderRadius: 3,
              mt: 2,
            }}
          >
            <Typography variant="h6" fontWeight="bold" mb={3}>
              Measurement History
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
                    <th
                      style={{
                        padding: "12px 16px",
                        textAlign: "left",
                      }}
                    >
                      Date
                    </th>
                    <th
                      style={{
                        padding: "12px 16px",
                        textAlign: "right",
                      }}
                    >
                      Weight
                    </th>
                    <th
                      style={{
                        padding: "12px 16px",
                        textAlign: "right",
                      }}
                    >
                      Body Fat
                    </th>
                    <th
                      style={{
                        padding: "12px 16px",
                        textAlign: "right",
                      }}
                    >
                      Chest
                    </th>
                    <th
                      style={{
                        padding: "12px 16px",
                        textAlign: "right",
                      }}
                    >
                      Waist
                    </th>
                    <th
                      style={{
                        padding: "12px 16px",
                        textAlign: "right",
                      }}
                    >
                      Hips
                    </th>
                    <th
                      style={{
                        padding: "12px 16px",
                        textAlign: "right",
                      }}
                    >
                      Arms
                    </th>
                    <th
                      style={{
                        padding: "12px 16px",
                        textAlign: "right",
                      }}
                    >
                      Thighs
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {metrics.slice(0, 5).map((metric, index) => (
                    <tr
                      key={index}
                      style={{
                        borderBottom: `1px solid ${theme.palette.divider}`,
                      }}
                    >
                      <td
                        style={{
                          padding: "12px 16px",
                          fontWeight: 500,
                        }}
                      >
                        {moment(metric.date).format("MMM DD, YYYY")}
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          textAlign: "right",
                        }}
                      >
                        {metric.weight ? `${metric.weight} lbs` : "-"}
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          textAlign: "right",
                        }}
                      >
                        {metric.bodyFat ? `${metric.bodyFat}%` : "-"}
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          textAlign: "right",
                        }}
                      >
                        {metric.measurements?.chest
                          ? `${metric.measurements.chest}"`
                          : "-"}
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          textAlign: "right",
                        }}
                      >
                        {metric.measurements?.waist
                          ? `${metric.measurements.waist}"`
                          : "-"}
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          textAlign: "right",
                        }}
                      >
                        {metric.measurements?.hips
                          ? `${metric.measurements.hips}"`
                          : "-"}
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          textAlign: "right",
                        }}
                      >
                        {metric.measurements?.arms
                          ? `${metric.measurements.arms}"`
                          : "-"}
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          textAlign: "right",
                        }}
                      >
                        {metric.measurements?.thighs
                          ? `${metric.measurements.thighs}"`
                          : "-"}
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

export default BodyMetrics;
