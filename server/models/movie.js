const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  plot: String,
  genres: [String],
  runtime: Number,
  cast: [String],
  poster: String,
  fullplot: String,
  languages: [String],
  released: Date,
  directors: [String],
  rated: String,
  awards: {
    wins: Number,
    nominations: Number,
    text: String
  },
  year: Number,
  imdb: {
    rating: Number,
    votes: Number,
    id: Number
  },
  countries: [String],
  type: String,
  tomatoes: {
    viewer: {
      rating: Number,
      numReviews: Number,
      meter: Number
    },
    fresh: Number,
    critic: {
      rating: Number,
      numReviews: Number,
      meter: Number
    },
    rotten: Number,
    lastUpdated: Date
  },
  num_mflix_comments: Number,
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
});

// Create a text index on the 'title' and 'plot' fields
movieSchema.index({ title: 'text', plot: 'text' });

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;