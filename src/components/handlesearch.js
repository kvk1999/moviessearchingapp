// App.js
import React, { useState } from 'react';
import SearchBar from './SearchBar';

const App = () => {
  const [movie, setMovie] = useState(null);

  const handleSearch = (input) => {
    // Check if the input is likely an IMDb ID
    const isImdbId = input.startsWith('tt') && input.length === 9;
    
    // Construct the URL based on whether we're using an IMDb ID or title
    const url = isImdbId
      ? `https://www.omdbapi.com/?i=${input}&apikey=3571aff3`  // IMDb ID search
      : `https://www.omdbapi.com/?t=${input}&apikey=3571aff3`;  // Title search

    // Fetch movie data from the OMDB API
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.Response === "True") {
          // Movie found, update state to display movie details
          setMovie(data);
        } else {
          alert("Movie not found. Please check the title or IMDb ID.");
          setMovie(null); // Clear any previous movie data
        }
      })
      .catch((error) => console.error("Error fetching movie details:", error));
  };

  return (
    <div className="app-container">
      <h1 className="text-center text-yellow-400 text-4xl mb-8">MoviezBonanza</h1>
      <SearchBar onSearch={handleSearch} />
      {movie && (
        <div className="movie-details mt-8">
          <h2 className="text-2xl font-bold">{movie.Title}</h2>
          <p><strong>Year:</strong> {movie.Year}</p>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
          <img src={movie.Poster} alt={`${movie.Title} Poster`} className="mt-4"/>
        </div>
      )}
    </div>
  );
};

export default App;
