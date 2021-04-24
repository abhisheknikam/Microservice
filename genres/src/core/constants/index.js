export const API_HOSTNAME = process.env.APP_HOSTNAME || 'localhost';
export const API_PORT = process.env.API_PORT || 3000;
export const LOG_LEVEL = process.env.LOG_LEVEL || 'error';
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const APP_NAME = process.env.APP_NAME || 'myapp';

// MongoDB
export const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017';
export const MONGODB_DBNAME = process.env.MONGODB_DBNAME || 'my';
export const MONGODB_AUTH = process.env.MONGODB_AUTH || '?authSource=my';
export const MONGODB_WITHPASS = process.env.MONGODB_WITHPASS || 'no';
export const MONGODB_USER = process.env.MONGODB_USER || '';
export const MONGODB_PASS = process.env.MONGODB_PASS || '';

// JWT
export const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10;
export const JWT_EXPIRY = process.env.JWT_EXPIRY || '1 day';
export const JWT_SECRET = process.env.JWT_SECRET || 'secret';
export const JWT_AUTH = process.env.JWT_AUTH || 'my_local_auth';