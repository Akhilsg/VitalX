const express = require("express");
const router = express.Router();
const db = require("../models");

const Workout = db.workout;
const UserProgress = db.progress;

router.get("/initialize/:userId/:planId", async (req, res) => {
  try {
    const { planId, userId } = req.params;

    const plan = await Workout.findById(planId);
    if (!plan) {
      return res.status(404).json({ error: "Workout plan not found." });
    }

    let userProgress = await UserProgress.findOne({
      user: userId,
      planId,
    });

    if (!userProgress) {
      const workouts = [];
      plan.weeks.forEach((week) => {
        week.days.forEach((day) => {
          const eventId = `${week.weekNumber}-${day.day}`;
          const exercises = day.exercises.map((exercise, exerciseIdx) => ({
            exerciseIndex: exerciseIdx,
            name: exercise.name,
            sets: Array.from({ length: exercise.sets }).map((_, i) => ({
              setIndex: i,
              weight: 0,
              reps: 0,
              completed: false,
            })),
          }));

          workouts.push({
            eventId,
            completed: false,
            exercises,
          });
        });
      });

      userProgress = new UserProgress({
        user: userId,
        planId,
        workouts,
      });
      await userProgress.save();
    }

    res.json({ userProgress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error." });
  }
});

router.post("/mark-complete/:userId", async (req, res) => {
  try {
    const { planId, eventId } = req.body;
    const { userId } = req.params;

    const userProgress = await UserProgress.findOne({
      user: userId,
      planId,
    });

    if (!userProgress) {
      return res.status(404).json({ error: "Progress not found." });
    }

    const workout = userProgress.workouts.find((w) => w.eventId === eventId);
    if (!workout) {
      return res.status(404).json({ error: "Workout not found in progress." });
    }

    workout.completed = true;

    workout.exercises.forEach((ex) => {
      ex.sets.forEach((s) => {
        s.completed = true;
      });
    });

    await userProgress.save();
    res.json({ message: "Workout marked as complete.", userProgress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error." });
  }
});

router.patch("/update-set/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const {
      planId,
      eventId,
      exerciseIndex,
      setIndex,
      weight,
      reps,
      completed,
    } = req.body;

    const userProgress = await UserProgress.findOne({
      user: userId,
      planId,
    });

    if (!userProgress) {
      return res.status(404).json({ error: "Progress not found." });
    }

    const workout = userProgress.workouts.find((w) => w.eventId === eventId);
    if (!workout) {
      return res.status(404).json({ error: "Workout not found in progress." });
    }

    const exercise = workout.exercises.find(
      (e) => e.exerciseIndex === exerciseIndex
    );
    if (!exercise) {
      return res.status(404).json({ error: "Exercise not found." });
    }

    const setToUpdate = exercise.sets.find((s) => s.setIndex === setIndex);
    if (!setToUpdate) {
      return res.status(404).json({ error: "Set not found." });
    }

    if (weight !== undefined) setToUpdate.weight = weight;
    if (reps !== undefined) setToUpdate.reps = reps;
    if (completed !== undefined) setToUpdate.completed = completed;

    const allSetsCompleted = exercise.sets.every((s) => s.completed);
    if (allSetsCompleted) {
    }

    const allExercisesDone = workout.exercises.every((ex) =>
      ex.sets.every((s) => s.completed)
    );
    if (allExercisesDone) {
      workout.completed = true;
    }

    await userProgress.save();
    res.json({ message: "Set updated", userProgress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
