import { Icon } from "@iconify/react";
import {
  Box,
  Container,
  Fade,
  Paper,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import { m } from "framer-motion";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../api/axios";
import AIAnalysis from "../components/analytics/AIAnalysis";
import AnalyticsOverview from "../components/analytics/AnalyticsOverview";
import BodyMetrics from "../components/analytics/BodyMetrics";
import WorkoutStats from "../components/analytics/WorkoutStats";
import { CustomTabs } from "../common/tabs";

const Analytics = () => {
  const theme = useTheme();
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState(0);
  const [metrics, setMetrics] = useState(null);
  const [workoutStats, setWorkoutStats] = useState(null);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

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

    // Set page loaded after a small delay to trigger animations
    setTimeout(() => {
      setPageLoaded(true);
    }, 100);
  }, [user]);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      // Updated endpoint to match server routes
      const response = await api.get(`/analytics/metrics/${user.id}`);
      setMetrics(response.data);
    } catch (error) {
      console.error("Error fetching metrics:", error);
    }
  };

  const fetchWorkoutStats = async () => {
    try {
      // Updated endpoint to match server routes
      const response = await api.get("/progress/stats");
      setWorkoutStats(response.data);
    } catch (error) {
      console.error("Error fetching workout stats:", error);
    }
  };

  const fetchAiAnalysis = async () => {
    try {
      // Updated endpoint to match server routes
      const response = await api.get(`/analytics/ai-analysis/${user.id}`);
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
      // Updated endpoint to match server routes
      await api.post(`/analytics/metrics/${user.id}`, newMetric);
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
      height: "100%",
      parentHeightOffset: 0,
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
        custom: ({ series, seriesIndex, dataPointIndex, w }) => {
          return `<div style="padding: 12px; background: ${theme.palette.background.paper}; border: 1px solid ${theme.palette.divider}; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            <div style="color: ${theme.palette.text.primary}; font-weight: 600; margin-bottom: 8px;">
              ${w.globals.labels[dataPointIndex]}
            </div>
            <div style="color: ${theme.palette.primary.main}; font-size: 16px; font-weight: 700;">
              ${series[seriesIndex][dataPointIndex]} lbs
            </div>
          </div>`;
        },
      },
    },
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
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
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
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "16px",
              fontFamily: theme.typography.fontFamily,
              fontWeight: 600,
              color: theme.palette.text.primary,
            },
            value: {
              show: true,
              fontSize: "20px",
              fontFamily: theme.typography.fontFamily,
              fontWeight: 700,
              color: theme.palette.text.primary,
            },
            total: {
              show: true,
              label: "Total",
              fontSize: "14px",
              fontFamily: theme.typography.fontFamily,
              fontWeight: 600,
              color: theme.palette.text.secondary,
            },
          },
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
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
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
      markers: {
        width: 12,
        height: 12,
        strokeWidth: 0,
        radius: 12,
        offsetX: 0,
        offsetY: 0,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5,
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
        colors: ["#fff"],
      },
      background: {
        enabled: true,
        foreColor: "#000",
        padding: 4,
        borderRadius: 4,
        borderWidth: 0,
        opacity: 0.7,
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 2,
        color: "rgba(0,0,0,0.3)",
        opacity: 0.5,
      },
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: "60%",
        },
      },
    },
    states: {
      hover: {
        filter: {
          type: "darken",
          value: 0.9,
        },
      },
    },
    stroke: {
      width: 2,
      colors: ["#fff"],
    },
    tooltip: {
      style: {
        fontSize: "14px",
        fontFamily: theme.typography.fontFamily,
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
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 2,
      curve: "smooth",
      dashArray: [0, 0, 0, 0, 0],
    },
    grid: {
      borderColor: theme.palette.divider,
      row: {
        colors: ["transparent"],
        opacity: 0.5,
      },
      padding: {
        top: 0,
        right: 10,
        bottom: 0,
        left: 10,
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
          fontSize: "12px",
          fontFamily: theme.typography.fontFamily,
        },
        offsetY: 2,
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
          fontSize: "12px",
          fontFamily: theme.typography.fontFamily,
        },
        formatter: function (val) {
          return val.toFixed(1) + '"';
        },
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + '"';
        },
      },
      style: {
        fontSize: "12px",
        fontFamily: theme.typography.fontFamily,
      },
      marker: {
        show: true,
        fillColors: [
          theme.palette.primary.main,
          theme.palette.secondary.main,
          theme.palette.success.main,
          theme.palette.warning.main,
          theme.palette.error.main,
        ],
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      fontFamily: theme.typography.fontFamily,
      labels: {
        colors: theme.palette.text.secondary,
      },
      markers: {
        width: 12,
        height: 12,
        strokeWidth: 0,
        radius: 12,
        offsetX: 0,
        offsetY: 0,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5,
      },
    },
    colors: [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.success.main,
      theme.palette.warning.main,
      theme.palette.error.main,
    ],
    markers: {
      size: 5,
      hover: {
        size: 7,
        sizeOffset: 3,
      },
    },
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

  // Animation variants for page elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const tabVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <m.div
      initial="hidden"
      animate={pageLoaded ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <m.div variants={itemVariants}>
          <Typography variant="h4" fontWeight="bold" mb={1}>
            Analytics Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>
            Track your fitness progress and get insights
          </Typography>
        </m.div>

        <m.div variants={tabVariants}>
          <Paper
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              mb: 4,
              transition: "box-shadow 0.3s",
            }}
          >
            <CustomTabs
              value={activeTab}
              onChange={handleTabChange}
              scrollButtons="false"
              variant="fullWidth"
            >
              {[
                { label: "Overview", icon: "mdi:view-dashboard" },
                { label: "Body Metrics", icon: "mdi:tape-measure" },
                { label: "Workout Stats", icon: "mdi:dumbbell" },
                { label: "AI Analysis", icon: "mdi:robot" },
              ].map((tab, index) => (
                <Tab
                  key={index}
                  label={tab.label}
                  icon={
                    <Icon
                      icon={tab.icon}
                      width={20}
                      height={20}
                      style={{
                        transition: "all 0.3s",
                        transform:
                          activeTab === index ? "scale(1.2)" : "scale(1)",
                      }}
                    />
                  }
                  iconPosition="start"
                  sx={{
                    transition: "all 0.3s",
                    transform:
                      activeTab === index ? "translateY(-2px)" : "none",
                  }}
                />
              ))}
            </CustomTabs>
          </Paper>
        </m.div>

        <Box sx={{ mt: 2 }}>
          <Fade in={activeTab === 0} timeout={500}>
            <Box sx={{ display: activeTab === 0 ? "block" : "none" }}>
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
            </Box>
          </Fade>
          <Fade in={activeTab === 1} timeout={500}>
            <Box sx={{ display: activeTab === 1 ? "block" : "none" }}>
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
            </Box>
          </Fade>
          <Fade in={activeTab === 2} timeout={500}>
            <Box sx={{ display: activeTab === 2 ? "block" : "none" }}>
              <WorkoutStats
                workoutStats={workoutStats}
                workoutChartOptions={workoutChartOptions}
                workoutChartSeries={workoutChartSeries}
                theme={theme}
              />
            </Box>
          </Fade>
          <Fade in={activeTab === 3} timeout={500}>
            <Box sx={{ display: activeTab === 3 ? "block" : "none" }}>
              <AIAnalysis
                aiAnalysis={aiAnalysis}
                theme={theme}
                setActiveTab={setActiveTab}
              />
            </Box>
          </Fade>
        </Box>
      </Container>
    </m.div>
  );
};

export default Analytics;
