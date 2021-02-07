const express = require("express");
const db = require("../models");

// Creates a new router object
const router = express.Router();

// get all workouts
// index page gets all workouts then returns the last workout (length-1)
router.get("/api/workouts", (req, res) => {
  db.Workout.find()
    // .populate("exercises")
    .then((allWorkouts) => {
      res.json(allWorkouts);
    })
    .catch((err) => {
      res.json(err);
    });
});

// post new workout
// on exercise page, initExercise creates a workout
router.post("/api/workouts", (req, res) => {
  db.Workout.create(req.body)
    .then((newWorkout) => {
      res.json(newWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

// update workout
// add exercises when user clicks add or complete button
router.put("/api/workouts/:id", (req, res) => {
  db.Workout.findByIdAndUpdate(req.params.id, {
    $push: { exercises: req.body },
  })
    .then((newExercise) => {
      res.json(newExercise);
    })
    .catch((err) => {
      res.json(err);
    });
});

// workouts in range
// sort by day and limit to one week (7 days)
router.get("/api/workouts/range", (req, res) => {
  let oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 8);
  // let oneWeekAgoUnix = Date.parse(oneWeekAgo);
  db.Workout.find({})
    .sort({ day: 1 })
    .where("day")
    .gte(oneWeekAgo)
    // .where("day").gte(oneWeekAgoUnix)
    // .limit(7)

    .then((weekWorkouts) => {
      res.json(weekWorkouts);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;