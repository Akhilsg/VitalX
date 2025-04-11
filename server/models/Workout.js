const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sets: { type: Number },
  reps: { type: String },
  rest: { type: String },
  duration: { type: String },
  needsVideo: { type: Boolean, required: true },
  videoId: { type: String },
  thumbnail: { type: String },
});

const DaySchema = new mongoose.Schema({
  day: { type: String, required: true },
  exercises: [ExerciseSchema],
});

const WeekSchema = new mongoose.Schema({
  weekNumber: { type: Number, required: true },
  days: [DaySchema],
});

const WorkoutPlanSchema = new mongoose.Schema({
  age: { type: Number, required: true },
  weight: { type: Number, required: true },
  heightInInches: { type: Number, required: true },
  goal: { type: String, required: true },
  gymAccess: { type: String, required: true },
  experienceLevel: { type: String, required: true },
  workoutDays: { type: [String], required: true },
  motivation: { type: String },
  workoutPreferences: { type: [String] },
  currentActivityLevel: { type: String },
  weeks: [WeekSchema],
  generationProgress: {
    isGenerating: Boolean,
    currentChapter: Number,
    currentTopic: Number,
    totalTopics: Number,
    completedTopics: Number,
  },
  goalSpecificData: Object,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("WorkoutPlan", WorkoutPlanSchema);
