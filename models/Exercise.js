const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  type: {
    type: String,
    trim: true,
  },
  name: {
    type: String,
    trim: true,
  },
  duration: {
    type: Number,
    trim: true,
  },

  // type: "resistance",
  // name: "Bicep Curl",
  // duration: 20,
  // weight: 100,
  // reps: 10,
  // sets: 4,

  // type: "cardio",
  // name: "Running",
  // duration: 25,
  // distance: 4
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;
