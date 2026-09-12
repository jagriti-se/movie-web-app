import { useState, useEffect, useCallback } from 'react';
import { movieApi } from '../services/api';

export function useMovies(type = 'trending', page = 1) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const apiMap = {
        trending: movieApi.trending,
        popular: movieApi.popular,
        topRated: movieApi.topRated,
        upcoming: movieApi.upcoming,
      };

      const api = apiMap[type];
      if (!api) throw new Error(`Unknown movie type: ${type}`);

      const response = await api(page);
      setMovies(response.results || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [type, page]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const retry = useCallback(() => {
    fetchMovies();
  }, [fetchMovies]);

  return { movies, loading, error, retry };
}
