import React, { useEffect, useState } from 'react';
import { useMovies } from '../hooks/useMovies';
import LoadingSkeleton from '../components/LoadingSkeleton';
import MovieGrid from '../components/MovieGrid';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import FilterBar from '../components/FilterBar';
import SortDropdown from '../components/SortDropdown';

function Home() {
  const [activeSection, setActiveSection] = useState('trending');
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');

  const { movies: trendingMovies, loading: trendingLoading, error: trendingError, retry: retryTrending } = useMovies('trending', page, genreFilter, yearFilter);
const { movies: popularMovies, loading: popularLoading, error: popularError, retry: retryPopular } = useMovies('popular', page, genreFilter, yearFilter);
const { movies: topRatedMovies, loading: topRatedLoading, error: topRatedError, retry: retryTopRated } = useMovies('topRated', page, genreFilter, yearFilter);
const { movies: upcomingMovies, loading: upcomingLoading, error: upcomingError, retry: retryUpcoming } = useMovies('upcoming', page, genreFilter, yearFilter);

  const sectionData = {
    trending: { movies: trendingMovies, loading: trendingLoading, error: trendingError, retry: retryTrending },
    popular: { movies: popularMovies, loading: popularLoading, error: popularError, retry: retryPopular },
    topRated: { movies: topRatedMovies, loading: topRatedLoading, error: topRatedError, retry: retryTopRated },
    upcoming: { movies: upcomingMovies, loading: upcomingLoading, error: upcomingError, retry: retryUpcoming },
  };

  const { movies, loading, error, retry } = sectionData[activeSection];
const sortedMovies = [...movies].sort((a, b) => {
  switch (sortBy) {
    case 'rating':
      return (b.voteAverage || 0) - (a.voteAverage || 0);

    case 'release_date':
      return new Date(b.releaseDate || 0) - new Date(a.releaseDate || 0);

    case 'title':
      return (a.title || '').localeCompare(b.title || '');

    case 'popularity':
    default:
      return (b.popularity || 0) - (a.popularity || 0);
  }
});

  const handleSortChange = (value) => {
  setSortBy(value);
  setPage(1);
};

 const handleFilterChange = ({ genre, year }) => {
  setGenreFilter(genre);
  setYearFilter(year);
  setPage(1);
};

  const loadMore = () => {
    setPage(page + 1);
  };

  return (
    <section className="min-h-[70vh] py-12">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-display text-3xl font-bold text-cinematic-50 sm:text-6xl">
            Discover Your Next Favorite Film
          </h1>
          <p className="mt-6 text-lg text-cinematic-300">
            Explore trending, popular, and top-rated movies from around the world.
          </p>
        </div>

        {error && (
          <ErrorState
            message={error}
            onRetry={retry}
          />
        )}

        <nav className="flex flex-col sm:flex-row gap-4 mb-12">
          <button
            onClick={() => setActiveSection('trending')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeSection === 'trending'
                ? 'bg-cinematic-700 text-cinematic-50'
                : 'text-cinematic-200 hover:bg-cinematic-700 hover:text-cinematic-50'
            }`}
          >
            Trending
          </button>
          <button
            onClick={() => setActiveSection('popular')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeSection === 'popular'
                ? 'bg-cinematic-700 text-cinematic-50'
                : 'text-cinematic-200 hover:bg-cinematic-700 hover:text-cinematic-50'
            }`}
          >
            Popular
          </button>
          <button
            onClick={() => setActiveSection('topRated')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeSection === 'topRated'
                ? 'bg-cinematic-700 text-cinematic-50'
                : 'text-cinematic-200 hover:bg-cinematic-700 hover:text-cinematic-50'
            }`}
          >
            Top Rated
          </button>
          <button
            onClick={() => setActiveSection('upcoming')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeSection === 'upcoming'
                ? 'bg-cinematic-700 text-cinematic-50'
                : 'text-cinematic-200 hover:bg-cinematic-700 hover:text-cinematic-50'
            }`}
          >
            Upcoming
          </button>
        </nav>

        <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-center sm:justify-between">
          <SortDropdown sortBy={sortBy || 'Popularity'} onSortChange={handleSortChange} />
          <FilterBar
            filters={{ genres: genreFilter ? [genreFilter] : [], year: yearFilter || 'All' }}
            onFilterChange={handleFilterChange}
          />
        </div>

        {loading ? (
          <div className="min-h-[400px] flex items-center justify-center">
            <LoadingSkeleton rows={4} columns={5} />
          </div>
        ) : movies && movies.length > 0 ? (
          <>
            <MovieGrid movies={sortedMovies} loading={false} />

            <div className="flex justify-center mt-8">
              <button
                onClick={loadMore}
                className="rounded-lg bg-cinematic-700 px-6 py-3 text-sm font-medium text-cinematic-100 hover:bg-cinematic-800 transition-colors"
              >
                Load More
              </button>
            </div>
          </>
        ) : (
          <div className="min-h-[400px] flex items-center justify-center">
            <EmptyState
              title="No movies found"
              message="Try a different category or check back later."
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default Home;