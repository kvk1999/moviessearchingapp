import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => (
  <Link to={`/movies/${movie.imdbID}`} className="movie-card">
    <img src={movie.Poster} alt={movie.Title} className="w-full h-64 object-cover" />
    <h3 className="text-lg font-semibold">{movie.Title}</h3>
    <p>{movie.Year}</p>
  </Link>
);

export default MovieCard;
