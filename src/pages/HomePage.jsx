import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [year, setYear] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const moviesPerPage = 10;
  const navigate = useNavigate();

  const fetchMovies = async (query, year, page) => {
    // Check if query is IMDb ID
    const isImdbId = query.startsWith('tt') && query.length === 9;
    const url = isImdbId 
      ? `https://www.omdbapi.com/?i=${query}&apikey=3571aff3`
      : `https://www.omdbapi.com/?s=${query}&y=${year}&page=${page}&apikey=3571aff3`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === 'True') {
      if (isImdbId) {
        // If it's an IMDb ID, navigate to the movie details page
        navigate(`/movies/${data.imdbID}`);
      } else {
        // If it's a search term, update movies list
        setMovies(data.Search);
        setTotalResults(parseInt(data.totalResults));
      }
    } else {
      setMovies([]);
      setTotalResults(0);
    }
  };

  useEffect(() => {
    if (query) {
      fetchMovies(query, year, currentPage);
    }
  }, [query, year, currentPage]);

  const handleSearch = (searchQuery, searchYear) => {
    setQuery(searchQuery);
    setYear(searchYear);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1 className="text-center text-yellow-400 text-4xl mb-8">Welcome to MoviezBonanza</h1>
      <SearchBar onSearch={handleSearch} />
      {movies.length > 0 ? (
        <>
          <div className="movie-list grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {movies.map(movie => (
              <Link key={movie.imdbID} to={`/movies/${movie.imdbID}`} className="movie-item">
                <img src={movie.Poster} alt={movie.Title} className="w-full h-auto" />
                <h2 className="text-lg mt-2">{movie.Title}</h2>
              </Link>
            ))}
          </div>
          <Pagination 
            currentPage={currentPage} 
            totalPages={Math.ceil(totalResults / moviesPerPage)} 
            onPageChange={handlePageChange} 
          />
          <div className="text-white text-center mt-5">
            Page {currentPage} of {Math.ceil(totalResults / moviesPerPage)} movies found
          </div>
        </>
      ) : (
        <div className="text-white text-center mt-5">
          {query ? (
            "No movies found. Please try a different title or IMDb ID."
          ) : (
            "Please enter a search query."
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
