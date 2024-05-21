const express = require('express');
const router = express.Router();

const {
  getAllMovies,
  getOneMovie
} = require("../controllers/movies")

// Get all movies
router.get('/', getAllMovies);

// Get a single movie by ID
router.get('/:id', getOneMovie);

module.exports = router;