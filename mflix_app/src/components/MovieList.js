import React from 'react';
import MovieItem from './MovieItem';
import { Grid } from '@mui/material';

const MovieList = ({ movies }) => {
  return (
    <Grid container spacing={2}>
      {movies.map((movie) => (
        <Grid item xs={12} sm={6} md={4} lg={2} key={movie._id}>
          <MovieItem movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieList;
