const express = require("express");
const path = require("path");


// Creates a new router object
const router = express.Router();

// homepage
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "/index.html"));
});

// adding exercise
router.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "/exercise.html"));
});

// dashboard stats
router.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "/stats.html"));
});


module.exports = router;