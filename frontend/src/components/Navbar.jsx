import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

function Navbar() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  return (
    <nav className="border-b border-cinematic-700 bg-cinematic-900/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex-shrink-0">
          <Link to="/" className="font-display text-xl font-bold text-cinematic-50">
            Movie Discovery
          </Link>
        </div>

        <div className="hidden md:flex md:items-center md:space-x-6">
          <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-cinematic-200 hover:bg-cinematic-700 hover:text-cinematic-50">
            Home
          </Link>
          <Link
            to="/search"
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              window.location.pathname === '/search'
                ? 'bg-cinematic-700 text-cinematic-50'
                : 'hover:bg-cinematic-700 hover:text-cinematic-50'
            }`}
          >
            Discover
          </Link>
          <Link
            to="/wishlist"
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              window.location.pathname === '/wishlist'
                ? 'bg-cinematic-700 text-cinematic-50'
                : 'hover:bg-cinematic-700 hover:text-cinematic-50'
            }`}
          >
            Wishlist
          </Link>
        </div>

        <div className="hidden md:block">
          <div className="flex h-10 items-center">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const input = e.target.elements.q;
                if (input.value.trim()) {
                  window.location.href = `/search?q=${encodeURIComponent(
                    input.value.trim()
                  )}`;
                }
              }}
              className="relative w-full max-w-xs"
            >
              <label htmlFor="search-input" className="sr-only">
                Search movies
              </label>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="h-4 w-4 text-cinematic-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <input
                id="search-input"
                type="text"
                name="q"
                value={query}
                placeholder="Search movies..."
                className="block w-full pl-10 pr-3 py-2 text-base border-cinematic-700 bg-cinematic-800 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                <svg
                  className="h-4 w-4 text-cinematic-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M23 19l-5-5" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        <div className="md:hidden">
          <button
            type="button"
            className="p-2 rounded-md text-cinematic-300 hover:text-cinematic-50"
            aria-label="Open main menu"
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;