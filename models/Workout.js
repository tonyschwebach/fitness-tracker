const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema(
  {
    day: {
      type: Date,
      default: Date.now,
    },

    exercises: [
      // {
      //   type: Schema.Types.ObjectId,
      //   ref: "Exercise",
      // },
    ],
  },
  { toJSON: { virtuals: true } }
);

// total workout duration
WorkoutSchema.virtual("totalDuration").get(function () {
  let totalDuration = 0;
  for (let i = 0; i < this.exercises.length; i++) {
    totalDuration+=this.exercises[i].duration;
    i++
  }
  return totalDuration;
});

// exercised performed
// total distance
// total weight

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
