// require npm packages
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
// require models
const db = require("./models");
//require controllers
const workoutsController = require("./controllers/workoutsController");
const viewsController = require("./controllers/viewsController");

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
app.use(workoutsController);
app.use(viewsController);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
