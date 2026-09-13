import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 15000,
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error?.response?.data?.error?.message ||
      error?.message ||
      'An unexpected error occurred';
    return Promise.reject(new Error(message));
  }
);

export const movieApi = {
  trending: (page = 1) => api.get(`/movies/trending?page=${page}`),
  popular: (page = 1) => api.get(`/movies/popular?page=${page}`),
  topRated: (page = 1) => api.get(`/movies/top-rated?page=${page}`),
  upcoming: (page = 1) => api.get(`/movies/upcoming?page=${page}`),
  search: (query, page = 1, sortBy = 'popularity') =>
    api.get(`/movies/search?q=${encodeURIComponent(query)}&page=${page}&sortBy=${encodeURIComponent(sortBy)}`),
  details: (id) => api.get(`/movies/${id}`),
  similar: (id, page = 1) => api.get(`/movies/${id}/similar?page=${page}`),
  discover: (page = 1, genre = '', year = '') =>
  api.get(`/movies/discover?page=${page}&genre=${encodeURIComponent(genre)}&year=${encodeURIComponent(year)}`),
};

export const wishlistApi = {
  list: () => api.get('/wishlist'),
  add: (movie) => api.post('/wishlist', movie),
  remove: (movieId) => api.delete(`/wishlist/${movieId}`),
};

export default api;
