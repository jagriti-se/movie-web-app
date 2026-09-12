import React from 'react';
import MovieCard from './MovieCard';

function MovieGrid({ movies, loading }) {
  if (loading) {
    return (
      <div
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        aria-label="Loading movies"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-lg border border-cinematic-700 bg-cinematic-800 p-4"
          >
            <div className="aspect-[2/3] rounded-md bg-cinematic-700" />
            <div className="mt-4 space-y-2">
              <div className="h-4 w-3/4 rounded bg-cinematic-700" />
              <div className="h-3 w-1/2 rounded bg-cinematic-700" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!movies?.length) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default MovieGrid;