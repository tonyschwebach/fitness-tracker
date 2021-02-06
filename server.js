// require npm packages

const express = require("express");
const mongoose = require("mongoose");
// const workoutsController = require("./controllers/workoutsController");

// require models
// const Workout = require("./models/Workout");

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
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitness_tracker", {
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
app.get("/",(req,res)=>{
  res.redirect("/index.html")
})

app.get("/exercise",(req,res)=>{
  res.redirect("/exercise.html")
})

app.get("/stats",(req,res)=>{
  res.redirect("/stats.html")
})


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});