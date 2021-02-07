// require npm packages
const express = require("express");
const mongoose = require("mongoose");
const path = require("path")
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
  res.sendFile(path.join(__dirname,"public","/index.html"));
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname,"public","/exercise.html"));
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname,"public","/stats.html"));
});

// app.get("/api/places", (req, res) => {
//   Place.find().then((allPlaces) => {
//     res.json(allPlaces);
//   });
// });

// app.post("/api/places", (req, res) => {
//   Place.create(req.body).then((newPlace) => {
//     res.json(newPlace);
//   });
// });

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
app.post("/api/workouts", (req, res) => {
  console.log(req.body)
  db.Workout.create({ exercises: req.body })
    .then((newWorkout) => {
      res.json(newWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

// update workout
app.put("/api/workouts/:id", (req, res) => {
  console.log(req.params.id)
  console.log(req.body)
  db.Workout.findByIdAndUpdate(req.params.id, req.body)
    .then((newWorkout) => {
      res.json(newWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

// workouts in range
app.get("/api/workouts/range", (req, res) => {
  db.Workout.find()
    .then((allWorkouts) => {
      res.json(allWorkouts);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
