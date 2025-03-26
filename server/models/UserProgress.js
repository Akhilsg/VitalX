const mongoose = require("mongoose");

const SetProgressSchema = new mongoose.Schema({
  setIndex: Number,
  weight: Number,
  reps: Number,
  completed: Boolean,
});

const ExerciseProgressSchema = new mongoose.Schema({
  exerciseIndex: Number,
  name: String,
  sets: [SetProgressSchema],
});

const WorkoutProgressSchema = new mongoose.Schema({
  eventId: String,
  completed: { type: Boolean, default: false },
  exercises: [ExerciseProgressSchema],
});

const UserProgressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: "Plan" },
  workouts: [WorkoutProgressSchema],
});

module.exports = mongoose.model("UserProgress", UserProgressSchema);
