import React, { useState } from 'react';

function FilterBar({ onFilterChange }) {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

 const genres = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];
  const years = Array.from({ length: new Date().getFullYear() - 1960 + 1 }, (_, i) => 2026 - i)
    .filter(year => year >= 1960)
    .reverse();

  const handleChange = () => {
    onFilterChange?.({ genre: selectedGenre, year: selectedYear });
  };

  return (
    <div className="flex flex-col gap-4 mb-4 sm:flex-row sm:flex-wrap sm:items-end">
      <div>
        <label className="block mb-1 font-medium text-cinematic-300" htmlFor="genre-filter">
          Filter by genre:
        </label>
        <select
          id="genre-filter"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="w-full rounded-lg border border-cinematic-700 bg-cinematic-800 px-3 py-2 text-sm text-cinematic-200 focus:outline-none focus:ring-2 focus:ring-accent-gold sm:w-auto"
>
          <option value="">All Genres</option>
          {genres.map((genre) => (
           <option key={genre.id} value={genre.id}>
           {genre.name}
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
          className="w-full rounded-lg border border-cinematic-700 bg-cinematic-800 px-3 py-2 text-sm text-cinematic-200 focus:outline-none focus:ring-2 focus:ring-accent-gold sm:w-auto"
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
        className="w-full rounded-lg bg-cinematic-700 px-4 py-2 text-sm font-semibold text-cinematic-200 hover:bg-cinematic-800 sm:w-auto"
      >
        Apply Filters
      </button>
    </div>
  );
}

export default FilterBar;