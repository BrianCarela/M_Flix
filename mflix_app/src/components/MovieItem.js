import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Modal, Box, useTheme } from '@mui/material';

const MovieItem = ({ movie }) => {
  const [open, setOpen] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);
  const theme = useTheme();

  const handleOpen = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/movies/details/${movie._id}`);
      const data = await response.json();
      setMovieDetails(data.payload);
      setOpen(true);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const handleClose = () => setOpen(false);

  const handleImageError = (event) => {
    event.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8PgItrmj9SWhclDBAmjlyFsC4w9tEKTcvDTbc2puQtQ&s';
  };

  return (
    <>
      <Card onClick={handleOpen} sx={{ maxWidth: 345, margin: '1rem', backgroundColor: theme.palette.primary.main, color: 'white', borderRadius: 2, marginBottom: 2 }}>
        <CardMedia
          component="img"
          height="140"
          image={movie.poster || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8PgItrmj9SWhclDBAmjlyFsC4w9tEKTcvDTbc2puQtQ&s'}
          alt={movie.title}
          onError={handleImageError}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {movie.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {movie.plot}
          </Typography>
        </CardContent>
      </Card>
      
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...modalStyle, maxHeight: '80vh', overflowY: 'auto', width: 400 }}>
          {movieDetails ? (
            <>
              <Typography variant="h4" component="h2">
                {movieDetails.title}
              </Typography>
              <img src={movieDetails.poster || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8PgItrmj9SWhclDBAmjlyFsC4w9tEKTcvDTbc2puQtQ&s'} alt={movieDetails.title} style={{ width: '100%', height: 'auto' }} onError={handleImageError} />
              <Typography variant="body1" sx={{ mt: 2 }}>
                {movieDetails.fullplot}
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Release Date: {new Date(movieDetails.released).toDateString()}
              </Typography>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Comments:
              </Typography>
              {movieDetails.comments && movieDetails.comments.length > 0 ? (
                movieDetails.comments.map(comment => (
                  <Box key={comment._id} sx={{ mt: 1, p: 1, border: '1px solid gray', borderRadius: '4px' }}>
                    <Typography variant="body2"><strong>{comment.name}</strong> ({comment.email})</Typography>
                    <Typography variant="body2">{comment.text}</Typography>
                  </Box>
                ))
              ) : (
                <Typography variant="body2">No comments available</Typography>
              )}
            </>
          ) : (
            <Typography variant="body1">Loading...</Typography>
          )}
        </Box>
      </Modal>
    </>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default MovieItem;