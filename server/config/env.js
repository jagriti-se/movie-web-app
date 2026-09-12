import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || 4000,
  mongodbUri: process.env.MONGODB_URI,
  tmdbApiKey: process.env.TMDB_API_KEY,
  nodeEnv: process.env.NODE_ENV || 'development',
};

export default config;
