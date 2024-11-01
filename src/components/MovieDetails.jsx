import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    // Fetch movie details based on ID
    const fetchMovie = async () => {
      const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=3571aff3`);
      const data = await response.json();
      setMovie(data);
    };

    fetchMovie();
  }, [id]);

  return (
    <div className="movie-details">
      {movie && (
        <>
          <img src={movie.Poster} alt={movie.Title} />
          <h2>{movie.Title}</h2>
          <p>{movie.Plot}</p>
          {/* Add more movie details as needed */}
          <button
            className="back-button px-4 py-2 bg-blue-500 text-white rounded mt-4"
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
