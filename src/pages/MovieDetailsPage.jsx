import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  const fetchMovieDetails = async () => {
    const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=3571aff3`);
    const data = await response.json();
    
    if (data.Response === "False") {
      setError(data.Error);
      setMovie(null);
    } else {
      setMovie(data);
      setError(null);
    }
  };

  const navigateToSearch = () => {
    navigate('/');
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  return (
    <div>
      {error ? (
        <div className="error-message">{error}</div>
      ) : movie ? (
        <div className="movie-details">
          <img src={movie.Poster} alt={movie.Title} />
          <h1>{movie.Title}</h1>
          <p>Release Year: {movie.Year}</p>
          <p>Genre: {movie.Genre}</p>
          <p>Plot: {movie.Plot}</p>
          <p>Ratings: {movie.Ratings.map(rating => `${rating.Source}: ${rating.Value}`).join(', ')}</p>
          
          <button className="back-to-search-button" onClick={navigateToSearch}>
            Back to Search
          </button>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default MovieDetailsPage;
