const mongoose = require('mongoose');
const Movie = require('../models/movie');
const Comment = require('../models/comment');
require('dotenv').config()

async function updateMoviesWithComments() {
  await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  const movies = await Movie.find({});
  for (const movie of movies) {
    const comments = await Comment.find({ movie_id: movie._id });
    movie.comments = comments.map(comment => comment._id);
    await movie.save();
  }
  console.log('Movies updated with comments');
  mongoose.disconnect();
}

updateMoviesWithComments();