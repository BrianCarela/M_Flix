const express = require('express');
const router = express.Router();

const {
  getAllMovies,
  getOneMovie
} = require("../controllers/movies")

// Get all movies
router.get('/:page', getAllMovies);

// Get a single movie by ID
router.get('/details/:id', getOneMovie);

module.exports = router;