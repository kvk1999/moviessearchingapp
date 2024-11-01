import axios from 'axios';

const API_KEY = '3571aff3';
const API_URL = 'https://www.omdbapi.com/';

export const searchMovies = async (query, page = 1, type = '') => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        apikey: API_KEY,
        s: query,
        page: page,
        type: type
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching movies');
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        apikey: API_KEY,
        i: id,
        plot: 'full'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching movie details');
  }
};
