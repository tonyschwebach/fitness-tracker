// require npm packages
const express = require("express");
const mongoose = require("mongoose");
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
  res.redirect("/index.html");
});

app.get("/exercise", (req, res) => {
  res.redirect("/exercise.html");
});

app.get("/stats", (req, res) => {
  res.redirect("/stats.html");
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
app.get("/api/workouts", (req, res) => {
  db.Workout.find()
    .then((allWorkouts) => {
      console.log(allWorkouts)
      res.json(allWorkouts);
    })
    .catch((err) => {
      console.log(err)
      res.json(err);
    });
});

// post new workout
app.post("/api/workouts", (req, res) => {
  db.Workout.create(req.body)
    .then((newWorkout) => {
      console.log(newWorkout)
      res.json(newWorkout);
    })
    .catch((err) => {
      console.log(err)
      res.json(err);
    });
});

// app.put("/api/workouts");

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
