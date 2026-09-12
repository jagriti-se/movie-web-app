import {
  getTrending,
  getPopular,
  getTopRated,
  getUpcoming,
  searchMovies,
  getMovieById,
  getSimilarMovies,
} from '../services/tmdb.js';
import { get, set } from '../services/cache.js';
import logger from '../utils/logger.js';

function extractPagination(req) {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = Math.min(parseInt(req.query.limit, 10) || 20, 50);
  return { page, limit };
}

function cacheKey(prefix, params) {
  return `${prefix}:${JSON.stringify(params)}`;
}

export const trending = async (req, res, next) => {
  try {
    const { page, limit } = extractPagination(req);
    const key = cacheKey('trending', { page, limit });
    const cached = get(key);
    if (cached) return res.json({ success: true, data: cached, cached: true });
    const data = await getTrending(page);
    set(key, data, 1000 * 60 * 5); // 5 min
    res.json({ success: true, data, cached: false });
  } catch (err) {
    next(err);
  }
};

export const popular = async (req, res, next) => {
  try {
    const { page, limit } = extractPagination(req);
    const key = cacheKey('popular', { page, limit });
    const cached = get(key);
    if (cached) return res.json({ success: true, data: cached, cached: true });
    const data = await getPopular(page);
    set(key, data, 1000 * 60 * 5);
    res.json({ success: true, data, cached: false });
  } catch (err) {
    next(err);
  }
};

export const topRated = async (req, res, next) => {
  try {
    const { page, limit } = extractPagination(req);
    const key = cacheKey('topRated', { page, limit });
    const cached = get(key);
    if (cached) return res.json({ success: true, data: cached, cached: true });
    const data = await getTopRated(page);
    set(key, data, 1000 * 60 * 5);
    res.json({ success: true, data, cached: false });
  } catch (err) {
    next(err);
  }
};

export const upcoming = async (req, res, next) => {
  try {
    const { page, limit } = extractPagination(req);
    const key = cacheKey('upcoming', { page, limit });
    const cached = get(key);
    if (cached) return res.json({ success: true, data: cached, cached: true });
    const data = await getUpcoming(page);
    set(key, data, 1000 * 60 * 5);
    res.json({ success: true, data, cached: false });
  } catch (err) {
    next(err);
  }
};

export const search = async (req, res, next) => {
  try {
    const query = (req.query.q || '').trim();
    if (!query) {
      return res.status(400).json({
        success: false,
        error: { message: 'Search query parameter "q" is required' },
      });
    }
    const { page } = extractPagination(req);
    const sortBy = req.query.sortBy || 'popularity';
    const data = await searchMovies(query, page, sortBy);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const details = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await getMovieById(Number(id));
    if (!movie) {
      return res.status(404).json({
        success: false,
        error: { message: 'Movie not found' },
      });
    }
    res.json({ success: true, data: movie });
  } catch (err) {
    next(err);
  }
};

export const similar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { page } = extractPagination(req);
    const data = await getSimilarMovies(Number(id), page);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};
