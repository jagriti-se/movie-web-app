import React from 'react';
import { useWishlist } from '../hooks/useWishlist';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import MovieCard from '../components/MovieCard';

function Wishlist() {
  const { items, loading, error, removeFromWishlist, refresh } = useWishlist();

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <LoadingSkeleton rows={3} columns={5} />
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <ErrorState message={error} onRetry={refresh} />
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="font-display text-3xl font-bold text-cinematic-50 sm:text-4xl">
          Your Wishlist
        </h1>
        <p className="mt-2 text-cinematic-300">
          {items.length} {items.length === 1 ? 'movie' : 'movies'} saved for later.
        </p>
      </div>

      {items.length === 0 ? (
        <EmptyState
          title="Your wishlist is empty"
          message="Browse movies and add the ones you want to watch later."
        />
      ) : (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {items.map((item) => (
            <MovieCard
              key={item.movieId}
              movie={{
                id: item.movieId,
                title: item.title,
                posterUrl: item.posterUrl,
                releaseDate: item.releaseDate,
                rating: item.rating,
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Wishlist;