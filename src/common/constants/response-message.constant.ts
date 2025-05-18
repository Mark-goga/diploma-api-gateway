export const RESPONSE_MESSAGES = {
  AUTH: {
    LOGIN: 'User login successful',
    REGISTER: 'User registration successful',
    REFRESH: 'Token refreshed successfully',
    LOGOUT: 'User logged out successfully',
    GET_SESSIONS: 'User sessions retrieved successfully',
    REMOVE_SESSIONS: 'Selected sessions removed successfully',
  },
} as const;

Object.freeze(RESPONSE_MESSAGES);
