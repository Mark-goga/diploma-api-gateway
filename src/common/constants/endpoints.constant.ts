export const ENDPOINTS = {
  BASE: '/api',
  AUTH: {
    BASE: '/auth',
    LOGIN: '/login',
    REGISTER: '/register',
    REFRESH: '/refresh',
    LOGOUT: '/logout',
    GET_SESSIONS: '/sessions',
    REMOVE_SESSIONS: '/sessions',
  },
} as const;

Object.freeze(ENDPOINTS);
