import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [episodes, setEpisodes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch movie/series details
    const fetchMovieDetails = async () => {
      const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=3571aff3`);
      const data = await response.json();

      if (data.Response === "False") {
        setError(data.Error);
        setMovie(null);
      } else {
        setMovie(data);
        setError(null);

        if (data.Type === "series") {
          // Set seasons based on the series' total seasons
          setSeasons(Array.from({ length: data.totalSeasons }, (_, i) => i + 1));
          fetchEpisodesForSeason(1); // Default to season 1
        }
      }
    };

    fetchMovieDetails();
  }, [id]);

  const fetchEpisodesForSeason = async (seasonNumber) => {
    const seasonResponse = await fetch(`https://www.omdbapi.com/?i=${id}&Season=${seasonNumber}&apikey=3571aff3`);
    const seasonData = await seasonResponse.json();

    if (seasonData.Response === "True") {
      setEpisodes(seasonData.Episodes);
      setSelectedSeason(seasonNumber);
    } else {
      setEpisodes([]);
    }
  };

  const handleSeasonChange = (e) => {
    const seasonNumber = Number(e.target.value);
    fetchEpisodesForSeason(seasonNumber);
  };

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
          
          {/* Show seasons dropdown if it's a series */}
          {movie.Type === "series" && (
  <div>
    <h2>Select Season</h2>
    <select 
      value={selectedSeason} 
      onChange={handleSeasonChange} 
      className="season-select border rounded px-4 py-2" // Add the class here
    >
      {seasons.map((season) => (
        <option key={season} value={season}>
          Season {season}
        </option>
      ))}
    </select>
  </div>
)}

          {/* Episodes List for the selected Season */}
          {movie.Type === "series" && episodes.length > 0 && (
            <div>
              <h2>Episodes for Season {selectedSeason}</h2>
              <ul>
                {episodes.map((episode) => (
                  <li key={episode.imdbID} className="episode-item">
                    <strong>
                      {`S${selectedSeason}.E${episode.Episode} ∙ ${episode.Title}`}
                    </strong>
                    <p>
                      {episode.Plot 
                        ? episode.Plot 
                        : "No description available for this episode."}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

        <Link to="/" className="back-button">Back to Search</Link>

        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default MovieDetailsPage;
