import { useState, useEffect, useCallback } from 'react';
import { movieApi } from '../services/api';

export function useMovies(type = 'trending', page = 1, genre = '', year = '') {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      if (genre || year) {
        const response = await movieApi.discover(page, genre, year);

        setMovies((prevMovies) =>
          page === 1
            ? (response.data?.results || [])
            : [...prevMovies, ...(response.data?.results || [])]
        );

        return;
      }

      const apiMap = {
        trending: movieApi.trending,
        popular: movieApi.popular,
        topRated: movieApi.topRated,
        upcoming: movieApi.upcoming,
      };

      const api = apiMap[type];

      if (!api) {
        throw new Error(`Unknown movie type: ${type}`);
      }

      const response = await api(page);

      setMovies((prevMovies) =>
        page === 1
          ? (response.data?.results || [])
          : [...prevMovies, ...(response.data?.results || [])]
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [type, page, genre, year]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const retry = useCallback(() => {
    fetchMovies();
  }, [fetchMovies]);

  return { movies, loading, error, retry };
}