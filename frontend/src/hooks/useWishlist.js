import { useState, useEffect, useCallback } from 'react';
import { wishlistApi } from '../services/api';

export function useWishlist() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWishlist = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await wishlistApi.list();
      setItems(response.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const addToWishlist = useCallback(async (movie) => {
    try {
      const response = await wishlistApi.add({
        movieId: movie.id,
        title: movie.title,
        posterUrl: movie.posterUrl,
        releaseDate: movie.releaseDate,
        rating: movie.rating,
      });
      setItems((prev) => [...prev, response.data]);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, []);

  const removeFromWishlist = useCallback(async (movieId) => {
    try {
      await wishlistApi.remove(movieId);
      setItems((prev) => prev.filter((item) => item.movieId !== Number(movieId)));
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, []);

  const isInWishlist = useCallback(
    (movieId) => items.some((item) => item.movieId === Number(movieId)),
    [items]
  );

  return {
    items,
    loading,
    error,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    refresh: fetchWishlist,
  };
}
