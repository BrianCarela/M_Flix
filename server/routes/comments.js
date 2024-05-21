const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

// Get comments for a movie
router.get('/:movieId', async (req, res) => {
  try {
    const comments = await Comment.find({ movie_id: req.params.movieId });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;