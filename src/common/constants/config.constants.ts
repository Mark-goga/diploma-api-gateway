export const CONFIG = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  USER_SERVICE_URL: process.env.USER_SERVICE_URL || 'http://localhost:8000',
  APP_URL: process.env.APP_URL || 'http://localhost:3000',
} as const;

Object.freeze(CONFIG);
