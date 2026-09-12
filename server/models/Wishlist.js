import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema(
  {
    movieId: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    posterUrl: {
      type: String,
      default: null,
    },
    releaseDate: {
      type: String,
      default: null,
    },
    rating: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

wishlistSchema.index({ movieId: 1 }, { unique: true });

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

export default Wishlist;
