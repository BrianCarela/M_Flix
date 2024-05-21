const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  movie_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie'
  },
  name: String,
  email: String,
  text: String,
  date: Date,
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;