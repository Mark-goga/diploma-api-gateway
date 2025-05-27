export const RESPONSE_MESSAGES = {
  AUTH: {
    LOGIN: 'User login successful',
    REGISTER: 'User registration successful',
    REFRESH: 'Token refreshed successfully',
    LOGOUT: 'User logged out successfully',
    GET_SESSIONS: 'User sessions retrieved successfully',
    REMOVE_SESSIONS: 'Selected sessions removed successfully',
  },
  FILMS: {
    CREATE: 'Film created successfully',
    FIND_ALL: 'Films retrieved successfully',
    FIND_ONE: 'Film retrieved successfully',
    UPDATE: 'Film updated successfully',
    REMOVE: 'Film removed successfully',
  },
  USERS: {
    FIND_MANY: 'Users retrieved successfully',
    FIND_ONE: 'User retrieved successfully',
    UPDATE: 'User updated successfully',
    REMOVE: 'User removed successfully',
  },
  REVIEWS: {
    CREATE: 'Review created successfully',
    FIND_ALL: 'Reviews retrieved successfully',
    FIND_ONE: 'Review retrieved successfully',
    FIND_BY_FILM: 'Film reviews retrieved successfully',
    UPDATE: 'Review updated successfully',
    REMOVE: 'Review removed successfully',
    FIND_BY_USER: 'User reviews retrieved successfully',
  },
} as const;

Object.freeze(RESPONSE_MESSAGES);
