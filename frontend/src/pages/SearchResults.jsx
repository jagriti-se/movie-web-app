import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';
import { movieApi } from '../services/api';
import MovieGrid from '../components/MovieGrid';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import SortDropdown from '../components/SortDropdown';

function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const q = searchParams.get('q');

  const [query, setQuery] = useState(q || '');
  const debouncedQuery = useDebounce(query, 300);

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('popularity');

  useEffect(() => {
    if (!debouncedQuery) {
      setMovies([]);
      setError(null);
      setPage(1);
      return;
    }

    setLoading(true);
    setError(null);

    movieApi
      .search(debouncedQuery, page, sortBy)
      .then((res) => {
        setMovies(res.data.results || []);
        setPage(res.data.page || 1);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [debouncedQuery, page, sortBy]);

  const handleSearch = (e) => {
    e.preventDefault();
    const input = e.target.elements.q;
    const value = input.value.trim();
    if (!value) return;

    setQuery(value);
    setSearchParams({ q: value });
    navigate({ pathname: '/search', search: `q=${encodeURIComponent(value)}` });
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    const newPage = 1;
    setPage(newPage);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sort', value);
    newParams.set('q', query);
    
    
    navigate({ pathname: '/search', search: newParams.toString() });
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="font-display text-3xl font-bold text-cinematic-50">
          Search Results
        </h1>
      </div>

      <form
        onSubmit={handleSearch}
        className="mb-6 flex gap-2 max-w-xl mx-auto"
        aria-label="Search movies"
      >
        <input
          type="text"
          name="q"
          value={query}
          placeholder="Search movies..."
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 rounded-lg border border-cinematic-700 bg-cinematic-800 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent"
          aria-label="Search movies"
        />
        <button
          type="submit"
          className="rounded-lg bg-accent-gold px-4 py-2 text-sm font-semibold text-cinematic-950 transition-colors hover:bg-accent-ember"
        >
          Search
        </button>
      </form>

      {error && (
        <ErrorState message={error} onRetry={() => setError(null)} />
      )}

      <div
        className={loading ? 'min-h-[400px] flex items-center justify-center' : ''}
      >
        {loading ? (
          <LoadingSkeleton rows={4} columns={5} />
        ) : movies.length === 0 && (
          <EmptyState
            title="No movies found"
            message={`No movies match "${query}". Try a different search term.`}
          />
        )}
      </div>

      {!loading && movies.length > 0 && (
        <MovieGrid movies={movies} loading={false} />
      )}
    </section>
  );
}

export default SearchResults;