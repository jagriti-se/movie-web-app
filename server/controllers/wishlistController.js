import Wishlist from '../models/Wishlist.js';
import logger from '../utils/logger.js';

export const list = async (req, res, next) => {
  try {
    const items = await Wishlist.find().sort({ createdAt: -1 });
    res.json({ success: true, data: items });
  } catch (err) {
    next(err);
  }
};

export const add = async (req, res, next) => {
  try {
    const { movieId, title, posterUrl, releaseDate, rating } = req.body;

    if (!movieId || !title) {
      return res.status(400).json({
        success: false,
        error: { message: 'movieId and title are required' },
      });
    }

    const existing = await Wishlist.findOne({ movieId });
    if (existing) {
      return res.status(409).json({
        success: false,
        error: { message: 'Movie already in wishlist' },
      });
    }

    const item = await Wishlist.create({ movieId, title, posterUrl, releaseDate, rating });
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const result = await Wishlist.deleteOne({ movieId: Number(movieId) });
    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        error: { message: 'Wishlist item not found' },
      });
    }
    res.json({ success: true, message: 'Removed from wishlist' });
  } catch (err) {
    next(err);
  }
};
