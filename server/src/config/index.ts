import dotenv from 'dotenv';

dotenv.config();

// Remove trailing slash from CORS origin if present
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
const normalizedCorsOrigin = corsOrigin.endsWith('/') 
  ? corsOrigin.slice(0, -1) 
  : corsOrigin;

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/notepad',
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: normalizedCorsOrigin,
};

export const isDevelopment = config.nodeEnv === 'development';
export const isProduction = config.nodeEnv === 'production';
