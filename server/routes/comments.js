const express = require('express');
const router = express.Router();

const {
  getOneComment
} = require("../controllers/comments")

// Get comments for a movie
router.get('/:movieId', getOneComment);

module.exports = router;