import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

function SortDropdown({ sortBy, onSortChange }) {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
  const value = e.currentTarget.value;
  onSortChange(value);
};
  return (
    <div className="relative">
      <button
        type="button"
        className="rounded-lg bg-cinematic-700 px-3 py-1.5 text-sm text-cinematic-200 hover:bg-cinematic-800 focus:outline-none focus:ring-2 focus:ring-accent-gold focus:ring-offset-2"
        aria-label="Sort movies"
      >
        {sortBy || 'Popularity'}
        <svg
          className="ml-2 h-3 w-3 transform rotate-180"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <ul
        className="absolute right-0 mt-2 w-32 rounded-lg bg-cinematic-700 border border-cinematic-600 p-1 shadow-md z-10"
        role="menu"
        aria-label="Sort options"
      >
        <li>
          <button
            role="menuitem"
            type="button"
            className="w-full rounded-sm px-2 py-1.5 text-sm text-cinematic-200 hover:bg-cinematic-800 focus:outline-none focus:bg-cinematic-800 focus:text-cinematic-100"
            onClick={(e) => {
              e.target.click();
              handleChange(e);
            }}
            value="popularity"
          >
            Popularity
          </button>
        </li>
        <li>
          <button
            role="menuitem"
            type="button"
            className="w-full rounded-sm px-2 py-1.5 text-sm text-cinematic-200 hover:bg-cinematic-800 focus:outline-none focus:bg-cinematic-800 focus:text-cinematic-100"
            onClick={(e) => {
              e.target.click();
              handleChange(e);
            }}
            value="rating"
          >
            Rating
          </button>
        </li>
        <li>
          <button
            role="menuitem"
            type="button"
            className="w-full rounded-sm px-2 py-1.5 text-sm text-cinematic-200 hover:bg-cinematic-800 focus:outline-none focus:bg-cinematic-800 focus:text-cinematic-100"
            onClick={(e) => {
              e.target.click();
              handleChange(e);
            }}
            value="release_date"
          >
            Release Date
          </button>
        </li>
        <li>
          <button
            role="menuitem"
            type="button"
            className="w-full rounded-sm px-2 py-1.5 text-sm text-cinematic-200 hover:bg-cinematic-800 focus:outline-none focus:bg-cinematic-800 focus:text-cinematic-100"
            onClick={(e) => {
              e.target.click();
              handleChange(e);
            }}
            value="title"
          >
            Title
          </button>
        </li>
      </ul>
    </div>
  );
}

export default SortDropdown;