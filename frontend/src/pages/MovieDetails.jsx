import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { movieApi } from '../services/api';
import { useWishlist } from '../hooks/useWishlist';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import MovieCard from '../components/MovieCard';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToWishlist, removeFromWishlist, isInWishlist, loading: wishlistLoading } = useWishlist();

  useEffect(() => {
    let ignore = false;

    async function fetchDetails() {
      setLoading(true);
      setError(null);

      try {
        const [detailsRes, similarRes] = await Promise.all([
          movieApi.details(id),
          movieApi.similar(id, 1),
        ]);

        if (!ignore) {
          setMovie(detailsRes.data);
          setSimilar(similarRes.data.results || []);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchDetails();

    return () => {
      ignore = true;
    };
  }, [id]);

  const handleWishlistToggle = async () => {
    if (wishlistLoading) return;

    if (isInWishlist(Number(id))) {
      await removeFromWishlist(Number(id));
    } else {
      await addToWishlist({
        id: Number(id),
        title: movie?.title,
        posterUrl: movie?.posterUrl,
        releaseDate: movie?.releaseDate,
        rating: movie?.rating,
      });
    }
  };

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <LoadingSkeleton rows={1} columns={1} />
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <ErrorState message={error} onRetry={() => window.location.reload()} />
      </section>
    );
  }

  if (!movie) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <EmptyState title="Movie not found" message="This movie may have been removed from TMDB." />
      </section>
    );
  }

  const backdropUrl = movie.backdropUrl || movie.posterUrl;
  const inWishlist = isInWishlist(Number(id));

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Backdrop + poster hero */}
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="flex-shrink-0 md:w-64 lg:w-80">
          <img
            src={movie.posterUrl || '/images/poster-placeholder.png'}
            alt={`${movie.title} poster`}
            className="rounded-lg border border-cinematic-700 shadow-xl"
            loading="lazy"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-cinematic-50">
            {movie.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-cinematic-300">
            {movie.releaseDate && (
              <span>{new Date(movie.releaseDate).getFullYear()}</span>
            )}
            {movie.runtime && (
              <span>{movie.runtime} min</span>
            )}
            {movie.rating != null && (
              <span className="flex items-center gap-1">
                <span aria-hidden="true">★</span>
                <span>{movie.rating.toFixed(1)}</span>
              </span>
            )}
            {movie.language && <span>{movie.language.toUpperCase()}</span>}
          </div>

          {movie.genres?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre}
                  className="rounded-full bg-cinematic-700 px-3 py-1 text-xs text-cinematic-200"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}

          <p className="mt-4 text-base text-cinematic-200 leading-relaxed">
            {movie.overview || 'No overview available.'}
          </p>

          <div className="mt-6">
            <button
              onClick={handleWishlistToggle}
              disabled={wishlistLoading}
              className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-accent-gold ${
                inWishlist
                  ? 'bg-crimson-600 text-white hover:bg-crimson-700'
                  : 'bg-accent-gold text-cinematic-950 hover:bg-accent-ember'
              }`}
              aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </button>
          </div>
        </div>
      </div>

      {/* Similar movies */}
      {similar.length > 0 && (
        <div>
          <h2 className="font-display text-2xl font-semibold text-cinematic-50 mb-6">
            Similar Movies
          </h2>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {similar.map((sim) => (
              <MovieCard key={sim.id} movie={sim} />
            ))}
          </div>
        </div>
      )}

      <div className="mt-10 text-center">
        <Link
          to="/"
          className="inline-block rounded-lg bg-cinematic-700 px-6 py-2 text-sm font-medium text-cinematic-200 hover:bg-cinematic-800 transition-colors"
        >
          ← Back to Browse
        </Link>
      </div>
    </section>
  );
}

export default MovieDetails;