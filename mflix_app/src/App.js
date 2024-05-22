import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from './components/MovieList';
import { Container, TextField, Typography, Button, Stack, Box, CircularProgress } from '@mui/material';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMovies(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const fetchMovies = async (page, query = '') => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/movies/${page}`, {
        params: { q: query }
      });
      setMovies(response.data.payload.movies);
      setTotalPages(response.data.payload.totalPages);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPaginationButtons = () => {
    let buttons = [];

    // Add the first two pages
    for (let i = 1; i <= 2; i++) {
      buttons.push(
        <Button
          key={i}
          variant={currentPage === i ? 'contained' : 'outlined'}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Button>
      );
    }

    // Add the dots if current page is greater than 4
    if (currentPage > 4) {
      buttons.push(<span key="dots1">...</span>);
    }

    // Add the pages around the current page
    for (let i = Math.max(3, currentPage - 1); i <= Math.min(totalPages - 2, currentPage + 1); i++) {
      buttons.push(
        <Button
          key={i}
          variant={currentPage === i ? 'contained' : 'outlined'}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Button>
      );
    }

    // Add the dots if current page is less than totalPages - 3
    if (currentPage < totalPages - 3) {
      buttons.push(<span key="dots2">...</span>);
    }

    // Add the last two pages
    for (let i = totalPages - 1; i <= totalPages; i++) {
      if (i > 2) {
        buttons.push(
          <Button
            key={i}
            variant={currentPage === i ? 'contained' : 'outlined'}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Button>
        );
      }
    }

    return buttons;
  };

  return (
    <Container>
      <Typography variant="h3" component="h1" gutterBottom>
        Search a Movie
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        label="Type to search..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1); // Reset to first page when search term changes
        }}
      />
      <Typography variant="h6" component="h1" gutterBottom>
        Click a card to see more
      </Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <MovieList movies={movies} />
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginY: 4 }}>
            <Stack direction="row" spacing={2}>
              {renderPaginationButtons()}
            </Stack>
          </Box>
        </>
      )}
    </Container>
  );
};

export default App;