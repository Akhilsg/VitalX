import { Icon } from "@iconify/react";
import {
  Box,
  Container,
  Paper,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AnalyticsOverview from "../components/analytics/AnalyticsOverview";
import BodyMetrics from "../components/analytics/BodyMetrics";
import AIAnalysis from "../components/analytics/AIAnalysis";
import WorkoutStats from "../components/analytics/WorkoutStats";

const Analytics = () => {
  const theme = useTheme();
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState(0);
  const [metrics, setMetrics] = useState(null);
  const [workoutStats, setWorkoutStats] = useState(null);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const [newMetric, setNewMetric] = useState({
    weight: "",
    bodyFat: "",
    measurements: {
      chest: "",
      waist: "",
      hips: "",
      arms: "",
      thighs: "",
    },
    notes: "",
  });

  useEffect(() => {
    if (user) {
      fetchMetrics();
      fetchWorkoutStats();
      fetchAiAnalysis();
    }
  }, [user]);

  const fetchMetrics = async () => {
    try {
      const response = await axios.get("/api/metrics");
      setMetrics(response.data);
    } catch (error) {
      console.error("Error fetching metrics:", error);
    }
  };

  const fetchWorkoutStats = async () => {
    try {
      const response = await axios.get("/api/workouts/stats");
      setWorkoutStats(response.data);
    } catch (error) {
      console.error("Error fetching workout stats:", error);
    }
  };

  const fetchAiAnalysis = async () => {
    try {
      const response = await axios.get("/api/ai/analysis");
      setAiAnalysis(response.data);
    } catch (error) {
      console.error("Error fetching AI analysis:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setNewMetric({
        ...newMetric,
        [parent]: {
          ...newMetric[parent],
          [child]: value,
        },
      });
    } else {
      setNewMetric({
        ...newMetric,
        [name]: value,
      });
    }
  };

  const handleSubmitMetrics = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/metrics", newMetric);
      setNewMetric({
        weight: "",
        bodyFat: "",
        measurements: {
          chest: "",
          waist: "",
          hips: "",
          arms: "",
          thighs: "",
        },
        notes: "",
      });
      fetchMetrics();
    } catch (error) {
      console.error("Error saving metrics:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Chart options for weight progress
  const weightChartOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    grid: {
      borderColor: theme.palette.divider,
      row: {
        colors: ["transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories:
        metrics && Array.isArray(metrics) && metrics.length > 0
          ? metrics
              .slice(0, 10)
              .reverse()
              .map((metric) => moment(metric.date).format("MMM DD"))
          : [],
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
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
    tooltip: {
      x: {
        format: "dd MMM yyyy",
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 100],
      },
    },
    colors: [theme.palette.primary.main],
  };

  const weightChartSeries = [
    {
      name: "Weight",
      data:
        metrics && Array.isArray(metrics) && metrics.length > 0
          ? metrics
              .slice(0, 10)
              .reverse()
              .map((metric) => metric.weight)
          : [],
    },
  ];

  // Chart options for workout completion
  const workoutCompletionOptions = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    labels: ["Completed", "Missed"],
    colors: [theme.palette.success.main, theme.palette.error.light],
    legend: {
      position: "bottom",
      fontFamily: theme.typography.fontFamily,
      labels: {
        colors: theme.palette.text.secondary,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return Math.round(val) + "%";
      },
      style: {
        fontSize: "14px",
        fontFamily: theme.typography.fontFamily,
        fontWeight: "bold",
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "60%",
        },
      },
    },
  };

  const workoutCompletionSeries = workoutStats
    ? [
        Math.round(workoutStats.completionRate),
        100 - Math.round(workoutStats.completionRate),
      ]
    : [0, 0];

  // Chart options for workout types
  const workoutChartOptions = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    labels: workoutStats ? workoutStats.workoutTypes : [],
    colors: [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.success.main,
      theme.palette.warning.main,
      theme.palette.error.main,
      theme.palette.info.main,
    ],
    legend: {
      position: "bottom",
      fontFamily: theme.typography.fontFamily,
      labels: {
        colors: theme.palette.text.secondary,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        return opts.w.config.labels[opts.seriesIndex];
      },
      style: {
        fontSize: "12px",
        fontFamily: theme.typography.fontFamily,
        fontWeight: "bold",
      },
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
      },
    },
  };

  const workoutChartSeries = workoutStats ? workoutStats.workoutTypeCounts : [];

  // Chart options for measurements
  const measurementsChartOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 2,
      curve: "smooth",
    },
    grid: {
      borderColor: theme.palette.divider,
      row: {
        colors: ["transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories:
        metrics && Array.isArray(metrics) && metrics.length > 0
          ? metrics
              .slice(0, 10)
              .reverse()
              .map((metric) => moment(metric.date).format("MMM DD"))
          : [],
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
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
    tooltip: {
      y: {
        formatter: function (val) {
          return val + '"';
        },
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      fontFamily: theme.typography.fontFamily,
      labels: {
        colors: theme.palette.text.secondary,
      },
    },
    colors: [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.success.main,
      theme.palette.warning.main,
      theme.palette.error.main,
    ],
  };

  const measurementsChartSeries =
    metrics && Array.isArray(metrics)
      ? [
          {
            name: "Chest",
            data: metrics
              .slice(0, 10)
              .reverse()
              .map((metric) => metric.measurements?.chest || null),
          },
          {
            name: "Waist",
            data: metrics
              .slice(0, 10)
              .reverse()
              .map((metric) => metric.measurements?.waist || null),
          },
          {
            name: "Hips",
            data: metrics
              .slice(0, 10)
              .reverse()
              .map((metric) => metric.measurements?.hips || null),
          },
          {
            name: "Arms",
            data: metrics
              .slice(0, 10)
              .reverse()
              .map((metric) => metric.measurements?.arms || null),
          },
          {
            name: "Thighs",
            data: metrics
              .slice(0, 10)
              .reverse()
              .map((metric) => metric.measurements?.thighs || null),
          },
        ]
      : [];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={1}>
        Analytics Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Track your fitness progress and get insights
      </Typography>

      <Paper
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          mb: 4,
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            bgcolor: "background.paper",
            borderBottom: 1,
            borderColor: "divider",
            "& .MuiTab-root": {
              py: 2,
              minHeight: "auto",
            },
          }}
        >
          <Tab
            label="Overview"
            icon={<Icon icon="mdi:view-dashboard" width={20} height={20} />}
            iconPosition="start"
          />
          <Tab
            label="Body Metrics"
            icon={<Icon icon="mdi:tape-measure" width={20} height={20} />}
            iconPosition="start"
          />
          <Tab
            label="Workout Stats"
            icon={<Icon icon="mdi:dumbbell" width={20} height={20} />}
            iconPosition="start"
          />
          <Tab
            label="AI Analysis"
            icon={<Icon icon="mdi:robot" width={20} height={20} />}
            iconPosition="start"
          />
        </Tabs>
      </Paper>

      <Box sx={{ mt: 2 }}>
        {activeTab === 0 && (
          <AnalyticsOverview
            metrics={metrics}
            workoutStats={workoutStats}
            aiAnalysis={aiAnalysis}
            weightChartOptions={weightChartOptions}
            weightChartSeries={weightChartSeries}
            workoutCompletionOptions={workoutCompletionOptions}
            workoutCompletionSeries={workoutCompletionSeries}
            theme={theme}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === 1 && (
          <BodyMetrics
            metrics={metrics}
            newMetric={newMetric}
            handleInputChange={handleInputChange}
            handleSubmitMetrics={handleSubmitMetrics}
            loading={loading}
            measurementsChartOptions={measurementsChartOptions}
            measurementsChartSeries={measurementsChartSeries}
            theme={theme}
          />
        )}
        {activeTab === 2 && (
          <WorkoutStats
            workoutStats={workoutStats}
            workoutChartOptions={workoutChartOptions}
            workoutChartSeries={workoutChartSeries}
            theme={theme}
          />
        )}
        {activeTab === 3 && (
          <AIAnalysis
            aiAnalysis={aiAnalysis}
            theme={theme}
            setActiveTab={setActiveTab}
          />
        )}
      </Box>
    </Container>
  );
};

export default Analytics;
