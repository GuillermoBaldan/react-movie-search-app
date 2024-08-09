// src/MovieSearch.js
import React, { useState } from 'react';

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const API_KEY = 'baf4c27c'; // Reemplaza esto con tu API key de OMDb API

  const searchMovies = async () => {
    if (query.trim() === '') {
      setError('Please enter a movie name.');
      setMovies([]);
      return;
    }

    try {
      const response = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
      const data = await response.json();

      if (data.Response === 'False') {
        throw new Error(data.Error);
      }

      setMovies(data.Search);
      setError(null);
    } catch (err) {
      setError(err.message);
      setMovies([]);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Movie Search App</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter movie name"
        style={{ padding: '10px', fontSize: '16px' }}
      />
      <button onClick={searchMovies} style={{ marginLeft: '10px', padding: '10px 20px', fontSize: '16px' }}>
        Search
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px' }}>
        {movies.map(movie => (
          <div key={movie.imdbID} style={{ margin: '10px', textAlign: 'left' }}>
            <img src={movie.Poster} alt={movie.Title} style={{ width: '150px', height: 'auto' }} />
            <h3>{movie.Title}</h3>
            <p>Year: {movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSearch;
