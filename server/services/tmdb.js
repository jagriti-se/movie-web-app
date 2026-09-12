import axios from 'axios';
import config from '../config/env.js';
import logger from '../utils/logger.js';
import { get, set } from './cache.js';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

if (!config.tmdbApiKey) {
  logger.error('TMDB_API_KEY is not set in environment variables');
}

const tmdbClient = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: config.tmdbApiKey,
  },
  timeout: 10000,
});

function buildPosterUrl(path) {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE}/w500${path}`;
}

function buildBackdropUrl(path) {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE}/w1280${path}`;
}

function extractGenres(genreIds, genreList) {
  if (!Array.isArray(genreIds) || !Array.isArray(genreList)) return [];
  return genreIds
    .map((id) => {
      const match = genreList.find((g) => g.id === id);
      return match ? match.name : null;
    })
    .filter(Boolean);
}

function transformMovie(raw, genreMap = {}) {
  if (!raw) return null;

  return {
    id: raw.id,
    title: raw.title || raw.name || 'Untitled',
    overview: raw.overview || '',
    posterUrl: buildPosterUrl(raw.poster_path),
    backdropUrl: buildBackdropUrl(raw.backdrop_path),
    rating: raw.vote_average != null ? Number(raw.vote_average) : null,
    releaseDate: raw.release_date || raw.first_air_date || null,
    genres: extractGenres(raw.genre_ids, genreMap.genres || []),
    language: raw.original_language || null,
    runtime: raw.runtime || null,
  };
}

async function fetchGenreMap() {
  const cached = get('genre_map');
  if (cached) return cached;

  const response = await tmdbClient.get('/genre/movie/list');
  const genres = response.data?.genres || [];
  const result = { genres };
  set('genre_map', result, 1000 * 60 * 60); // 1 hour cache
  return result;
}

async function getTrending(page = 1) {
  const response = await tmdbClient.get('/trending/movie/week', {
    params: { page },
  });
  const genreMap = await fetchGenreMap().catch(() => ({ genres: [] }));
  return {
    page: response.data.page,
    results: (response.data.results || []).map((m) => transformMovie(m, genreMap)),
    totalResults: response.data.total_results,
  };
}

async function getPopular(page = 1) {
  const response = await tmdbClient.get('/movie/popular', {
    params: { page },
  });
  const genreMap = await fetchGenreMap().catch(() => ({ genres: [] }));
  return {
    page: response.data.page,
    results: (response.data.results || []).map((m) => transformMovie(m, genreMap)),
    totalResults: response.data.total_results,
  };
}

async function getTopRated(page = 1) {
  const response = await tmdbClient.get('/movie/top_rated', {
    params: { page },
  });
  const genreMap = await fetchGenreMap().catch(() => ({ genres: [] }));
  return {
    page: response.data.page,
    results: (response.data.results || []).map((m) => transformMovie(m, genreMap)),
    totalResults: response.data.total_results,
  };
}

async function getUpcoming(page = 1) {
  const response = await tmdbClient.get('/movie/upcoming', {
    params: { page },
  });
  const genreMap = await fetchGenreMap().catch(() => ({ genres: [] }));
  return {
    page: response.data.page,
    results: (response.data.results || []).map((m) => transformMovie(m, genreMap)),
    totalResults: response.data.total_results,
  };
}

async function searchMovies(query, page = 1, sortBy = 'popularity') {
  const response = await tmdbClient.get('/search/movie', {
    params: { query, page, sort_by: sortBy },
  });
  const genreMap = await fetchGenreMap().catch(() => ({ genres: [] }));
  return {
    page: response.data.page,
    query,
    results: (response.data.results || []).map((m) => transformMovie(m, genreMap)),
    totalResults: response.data.total_results,
  };
}

async function getMovieById(id) {
  const response = await tmdbClient.get(`/movie/${id}`);
  const genreMap = await fetchGenreMap().catch(() => ({ genres: [] }));
  return transformMovie(response.data, genreMap);
}

async function getSimilarMovies(id, page = 1) {
  const response = await tmdbClient.get(`/movie/${id}/similar`, {
    params: { page },
  });
  const genreMap = await fetchGenreMap().catch(() => ({ genres: [] }));
  return {
    page: response.data.page,
    results: (response.data.results || []).map((m) => transformMovie(m, genreMap)),
    totalResults: response.data.total_results,
  };
}

export {
  getTrending,
  getPopular,
  getTopRated,
  getUpcoming,
  searchMovies,
  getMovieById,
  getSimilarMovies,
  transformMovie,
};