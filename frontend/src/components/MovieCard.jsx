import React from 'react';
import { Link } from 'react-router-dom';

function MovieCard({ movie }) {
  if (!movie) return null;

  const posterUrl = movie.posterUrl || '/images/poster-placeholder.png';
  const fallbackUrl = `data:image/svg+xml,${encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="450" fill="%231a1a1a"><rect width="300" height="450"/><text x="50%" y="50%" fill="%234d4d4d" text-anchor="middle" dy=".3em" font-size="14">No Poster</text></svg>'
  )}`;

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group block transition-transform duration-300 hover:scale-[1.03]"
      aria-label={`View details for ${movie.title}`}
    >
      <div className="overflow-hidden rounded-lg border border-cinematic-700 bg-cinematic-800 shadow-lg transition-shadow group-hover:shadow-accent-gold/20">
        <div className="aspect-[2/3] overflow-hidden bg-cinematic-700">
          <img
            src={posterUrl}
            srcSet={`${posterUrl}?w=300 300w, ${posterUrl}?w=600 600w`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            alt={`${movie.title} poster`}
            loading="lazy"
            onError={(e) => {
              e.target.src = fallbackUrl;
            }}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="p-4">
          <h3 className="line-clamp-2 text-sm font-semibold text-cinematic-50">
            {movie.title}
          </h3>
          <div className="mt-2 flex items-center gap-3 text-xs text-cinematic-300">
            {movie.releaseDate && (
              <span>{new Date(movie.releaseDate).getFullYear()}</span>
            )}
            {movie.rating != null && (
              <span className="flex items-center gap-1">
                <span aria-hidden="true">★</span>
                <span>{movie.rating.toFixed(1)}</span>
              </span>
            )}
          </div>
          {movie.genres?.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {movie.genres.slice(0, 2).map((genre) => (
                <span
                  key={genre}
                  className="rounded-full bg-cinematic-700 px-2 py-0.5 text-[10px] text-cinematic-200"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;