import mongoose from 'mongoose';
import config from './env.js';

let isConnected = false;

async function connect() {
  if (isConnected) return;

  if (!config.mongodbUri) {
    throw new Error('MONGODB_URI is not configured');
  }

  const conn = await mongoose.connect(config.mongodbUri);
  isConnected = conn.connection.readyState === 1;
  return conn;
}

function disconnect() {
  if (mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2) {
    return mongoose.connection.close();
  }
  return Promise.resolve();
}

function getConnectionState() {
  return {
    readyState: mongoose.connection.readyState,
    isConnected,
  };
}

export { connect, disconnect, getConnectionState };
