const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema(
  {
    day: {
      type: Date,
      default: Date.now,
    },

    exercises: [
      {
        type: {
          type: String,
          required: true,
        },

        name: {
          type: String,
        },

        weight: {
          type: Number,
        },

        sets: {
          type: Number,
        },

        reps: {
          type: Number,
        },

        duration: {
          type: Number,
          required: true,
        },

        distance: {
          type: Number,
        },
      },
    ],

    // If we were to use an Exercise model, we could use the block below.
    // However, this architecture does not support the seeds data.
    // {
    //   type: Schema.Types.ObjectId,
    //   ref: "Exercise",
    // },
  },
  { toJSON: { virtuals: true } }
);

// total workout duration
WorkoutSchema.virtual("totalDuration").get(function () {
  return this.exercises.reduce((acc, curr) => acc + curr.duration, 0);
});

// numExercises is calculated by length on client side workout.js
// totalWeight is calculated on client side workout.js tally function
// totalSets is calculated on client side workout.js tally function
// totalReps is calculated on client side workout.js tally function
// totalDistance is calculated on client side workout.js tally function

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
