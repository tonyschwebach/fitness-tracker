// require npm packages

const express = require("express");
const mongoose = require("mongoose");

// require all models
// const Place = require("./models/Place");
// const db = require("./models");

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
// app.use(UserController);

// TODO: ABSTRACT THESE PLACES ROUTES OUT INTO A CONTROLLER
app.get("/",(req,res)=>{
  res.send("/index.html")
})

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

// TODO: ADD PUT AND DELETE ROUTES

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});