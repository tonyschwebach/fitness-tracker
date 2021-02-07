// require npm packages
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
// require models
const db = require("./models");
//require controllers
// const workoutsController = require("./controllers/workoutsController");

// create an instance of express
const app = express();

// create a port
const PORT = process.env.PORT || 8080;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

// connect to mongodb
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Mongoose successfully connected.");
});

connection.on("error", (err) => {
  console.log("Mongoose connection error: " + err);
});

// use routes on controllers
// app.use(workoutsController);

// TODO: ABSTRACT THESE PLACES ROUTES OUT INTO A CONTROLLER
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "/index.html"));
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "/exercise.html"));
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "/stats.html"));
});

// get all workouts
// index page gets all workouts then returns the last workout (length-1)
app.get("/api/workouts", (req, res) => {
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
app.post("/api/workouts", (req, res) => {
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
app.put("/api/workouts/:id", (req, res) => {
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
app.get("/api/workouts/range", (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
