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
  FILMS: {
    BASE: '/films',
    CREATE: '/',
    FIND_ALL: '/',
    FIND_ONE: '/:id',
    UPDATE: '/:id',
    REMOVE: '/:id',
  },
  USERS: {
    BASE: '/users',
    FIND_MANY: '/',
    FIND_ONE: '/:id',
    UPDATE: '/:id',
    REMOVE: '/:id',
  },
  REVIEWS: {
    BASE: '/reviews',
    CREATE: '/',
    FIND_ALL: '/',
    FIND_ONE: '/:id',
    FIND_BY_FILM: '/film/:filmId',
    UPDATE: '/:id',
    REMOVE: '/:id',
    FIND_BY_USER: '/user/:userId',
    GET_PERSONAL_FILTERS_FOR_FILMS: '/personal/filters/:userId',
  },
} as const;

Object.freeze(ENDPOINTS);
