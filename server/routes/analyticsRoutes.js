const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const db = require("../models");

const UserMetrics = db.metrics;
const UserProgress = db.progress;
const WorkoutPlan = db.workout;

// Get Google API key from environment variables
const googleKeys = [
  process.env.GOOGLE_API_KEY_0,
  process.env.GOOGLE_API_KEY_1,
  process.env.GOOGLE_API_KEY_2,
  process.env.GOOGLE_API_KEY_3,
  process.env.GOOGLE_API_KEY_4,
];

let currentGoogleKeyIndex = 0;
let callCounter = 0;

function getNextGoogleKey() {
  const key = googleKeys[currentGoogleKeyIndex];
  callCounter++;

  if (callCounter >= 6) {
    callCounter = 0;
    currentGoogleKeyIndex = (currentGoogleKeyIndex + 1) % googleKeys.length;
  }
  return key;
}

// Add CORS headers
router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// Record user metrics (weight, body measurements)
router.post("/metrics/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const metricData = req.body;

    const newMetric = new UserMetrics({
      user: userId,
      ...metricData,
    });

    await newMetric.save();
    res.status(201).json(newMetric);
  } catch (error) {
    console.error("Error saving metrics:", error);
    res.status(500).json({ error: "Failed to save metrics" });
  }
});

// Get user metrics history
router.get("/metrics/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const metrics = await UserMetrics.find({ user: userId }).sort({ date: -1 });
    res.json(metrics);
  } catch (error) {
    console.error("Error fetching metrics:", error);
    res.status(500).json({ error: "Failed to fetch metrics" });
  }
});

// Get workout completion statistics
router.get("/workout-stats/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const userProgress = await UserProgress.findOne({ user: userId });

    if (!userProgress) {
      return res.status(404).json({ error: "No progress data found" });
    }

    const totalWorkouts = userProgress.workouts.length;
    const completedWorkouts = userProgress.workouts.filter(
      (w) => w.completed
    ).length;
    const completionRate =
      totalWorkouts > 0 ? (completedWorkouts / totalWorkouts) * 100 : 0;

    // Calculate exercise statistics
    const exerciseStats = {};
    userProgress.workouts.forEach((workout) => {
      workout.exercises.forEach((exercise) => {
        if (!exerciseStats[exercise.name]) {
          exerciseStats[exercise.name] = {
            totalSets: 0,
            completedSets: 0,
            totalWeight: 0,
            totalReps: 0,
            count: 0,
          };
        }

        exercise.sets.forEach((set) => {
          exerciseStats[exercise.name].totalSets++;
          if (set.completed) {
            exerciseStats[exercise.name].completedSets++;
            exerciseStats[exercise.name].totalWeight += set.weight || 0;
            exerciseStats[exercise.name].totalReps += set.reps || 0;
            exerciseStats[exercise.name].count++;
          }
        });
      });
    });

    // Calculate averages
    Object.keys(exerciseStats).forEach((exercise) => {
      const stats = exerciseStats[exercise];
      stats.avgWeight = stats.count > 0 ? stats.totalWeight / stats.count : 0;
      stats.avgReps = stats.count > 0 ? stats.totalReps / stats.count : 0;
      stats.completionRate =
        stats.totalSets > 0 ? (stats.completedSets / stats.totalSets) * 100 : 0;

      // Clean up temporary calculation fields
      delete stats.totalWeight;
      delete stats.totalReps;
      delete stats.count;
    });

    res.json({
      totalWorkouts,
      completedWorkouts,
      completionRate,
      exerciseStats,
    });
  } catch (error) {
    console.error("Error fetching workout statistics:", error);
    res.status(500).json({ error: "Failed to fetch workout statistics" });
  }
});

// Get AI analysis of user progress
router.get("/ai-analysis/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Get user metrics
    const metrics = await UserMetrics.find({ user: userId }).sort({ date: 1 });

    // Get workout progress
    const userProgress = await UserProgress.findOne({ user: userId });
    if (!userProgress) {
      return res.status(404).json({ error: "No progress data found" });
    }

    // Get workout plan
    const workoutPlan = await WorkoutPlan.findById(userProgress.planId);
    if (!workoutPlan) {
      return res.status(404).json({ error: "No workout plan found" });
    }

    // Prepare data for AI analysis
    const weightData = metrics.map((m) => ({ date: m.date, weight: m.weight }));

    const exerciseProgress = {};
    userProgress.workouts.forEach((workout) => {
      workout.exercises.forEach((exercise) => {
        if (!exerciseProgress[exercise.name]) {
          exerciseProgress[exercise.name] = [];
        }

        const workoutData = {
          eventId: workout.eventId,
          completed: workout.completed,
          sets: exercise.sets.map((set) => ({
            weight: set.weight,
            reps: set.reps,
            completed: set.completed,
          })),
        };

        exerciseProgress[exercise.name].push(workoutData);
      });
    });

    // Generate AI analysis
    const currentKey = getNextGoogleKey();
    const genAI = new GoogleGenerativeAI(currentKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const prompt = `
      Analyze this fitness data and provide personalized insights and recommendations:
      
      User Goals: ${workoutPlan.goal}
      Experience Level: ${workoutPlan.experienceLevel}
      
      Weight Tracking Data: ${JSON.stringify(weightData)}
      
      Exercise Progress Data: ${JSON.stringify(exerciseProgress)}
      
      Please provide:
      1. A summary of overall progress
      2. Identification of strengths (exercises/areas where the user is performing well)
      3. Areas that need improvement
      4. Specific recommendations to improve results
      5. Suggestions for exercise modifications based on performance data
      
      Format the response as JSON with these sections.
    `;

    const result = await model.generateContent(prompt);
    const analysis = JSON.parse(result.response.text());

    res.json(analysis);
  } catch (error) {
    console.error("Error generating AI analysis:", error);
    res.status(500).json({
      error: "Failed to generate AI analysis",
      message: error.message,
    });
  }
});

module.exports = router;
