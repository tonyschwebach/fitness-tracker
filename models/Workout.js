const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema(
  {
    day: {
      type: Date,
      default: Date.now,
    },

    exercises: [
      //   {
      //   type: Array,
      // },
      {
        type: {
          type: String,
          required: true,
        },
      },
      {
        name: {
          type: String,
        },
      },
      {
        weight: {
          type: Number,
        },
      },
      {
        sets: {
          type: Number,
        },
      },
      {
        reps: {
          type: Number,
        },
      },
      {
        duration: {
          type: Number,
          required: true,
        },
      },
      {
        distance: {
          type: Number,
        },
      },
    ],

    // {
    //   type: Schema.Types.ObjectId,
    //   ref: "Exercise",
    // },
  },
  { toJSON: { virtuals: true } }
);

// total workout duration
// TODO: this isn't totaling correctly
WorkoutSchema.virtual("totalDuration").get(function () {
  // let totalDuration = 0;
  // for (let i = 0; i < this.exercises.length; i++) {
  //   console.log(i)
  //   // console.log(this.exercises[i])
  //   console.log(this.exercises[i].duration)
  //   totalDuration += this.exercises[i].duration;
  //   i++;
  // }
  // return totalDuration;

  return this.exercises.reduce((acc, curr) => acc + curr.duration);
});

// numExercises is calculated by length on client side workout.js
// totalWeight is calculated on client side workout.js tally function
// totalSets is calculated on client side workout.js tally function
// totalReps is calculated on client side workout.js tally function
// totalDistance is calculated on client side workout.js tally function

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
