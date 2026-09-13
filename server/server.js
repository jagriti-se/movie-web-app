import dns from 'dns';
dns.setDefaultResultOrder('ipv4first');
import express from 'express';
import cors from 'cors';
import config from './config/env.js';
import logger from './utils/logger.js';
import { connect, getConnectionState } from './config/database.js';
import moviesRouter from './routes/movies.js';
import wishlistRouter from './routes/wishlist.js';

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', async (req, res) => {
  try {
    const dbState = getConnectionState();
    res.json({
      success: true,
      message: 'Movie Discovery API is running',
      services: {
        database: dbState.isConnected ? 'connected' : 'disconnected',
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: { message: err.message },
    });
  }
});

// API routes
app.use('/api/movies', moviesRouter);
app.use('/api/wishlist', wishlistRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: { message: 'Route not found' },
  });
});

// Error handler
app.use((err, req, res, next) => {
  logger.error(err.message, { path: req.path, stack: err.stack });
  res.status(err.statusCode || 500).json({
    success: false,
    error: { message: err.message || 'Internal Server Error' },
  });
});

// Connect to database and start server
async function startServer() {
  try {
    await connect();
    logger.info('Connected to MongoDB');
  } catch (err) {
    logger.error('Failed to connect to MongoDB', { error: err.message });
    // Don't exit - allow server to start for health checks
  }

  const port = config.port;
  app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
  });
}

startServer();

export default app;
