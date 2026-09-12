import React, { useState } from 'react';

function FilterBar({ onFilterChange }) {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const genres = [
    'Action',
    'Adventure',
    'Animation',
    'Comedy',
    'Crime',
    'Documentary',
    'Drama',
    'Family',
    'Fantasy',
    'History',
    'Horror',
    'Music',
    'Mystery',
    'Romance',
    'Science Fiction',
    'Thriller',
    'War',
    'Western',
  ];

  const years = Array.from({ length: new Date().getFullYear() - 1960 + 1 }, (_, i) => 2026 - i)
    .filter(year => year >= 1960)
    .reverse();

  const handleChange = () => {
    onFilterChange?.({ genre: selectedGenre, year: selectedYear });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-4">
      <div>
        <label className="block mb-1 font-medium text-cinematic-300" htmlFor="genre-filter">
          Filter by genre:
        </label>
        <select
          id="genre-filter"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="rounded-lg border border-cinematic-700 bg-cinematic-800 px-3 py-1.5 text-sm text-cinematic-200 focus:outline-none focus:ring-2 focus:ring-accent-gold"
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium text-cinematic-300" htmlFor="year-filter">
          Filter by year:
        </label>
        <select
          id="year-filter"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="rounded-lg border border-cinematic-700 bg-cinematic-800 px-3 py-1.5 text-sm text-cinematic-200 focus:outline-none focus:ring-2 focus:ring-accent-gold"
        >
          <option value="">All Years</option>
          {years.map((year) => (
            <option key={year} value={year.toString()}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleChange}
        className="self-end rounded-lg bg-cinematic-700 px-4 py-2 text-sm font-semibold text-cinematic-200 hover:bg-cinematic-800"
      >
        Apply Filters
      </button>
    </div>
  );
}

export default FilterBar;