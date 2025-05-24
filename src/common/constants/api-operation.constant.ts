export const API_OPERATION = {
  AUTH: {
    LOGIN: {
      description: 'Authenticate user and initiate a login session',
      summary: 'User login operation',
    },
    REGISTER: {
      description: 'Register a new user in the system',
      summary: 'User registration operation',
    },
    REFRESH_TOKEN: {
      description: 'Refresh token',
      summary: 'Refresh token operation',
    },
    LOGOUT: {
      description: 'Logout user',
      summary: 'Logout operation',
    },
    GET_SESSIONS: {
      description: 'Get all active user sessions',
      summary: 'Get user sessions operation',
    },
    REMOVE_SESSIONS: {
      description: 'Remove specific user sessions',
      summary: 'Remove sessions operation',
    },
  },
  FILMS: {
    CREATE: {
      description: 'Create a new film in the system',
      summary: 'Create film operation',
    },
    FIND_ALL: {
      description: 'Get all films with pagination, filtering and searching',
      summary: 'Get all films operation',
    },
    FIND_ONE: {
      description: 'Get film by ID',
      summary: 'Get film by ID operation',
    },
    UPDATE: {
      description: 'Update film information',
      summary: 'Update film operation',
    },
    REMOVE: {
      description: 'Remove film from the system',
      summary: 'Remove film operation',
    },
  },
} as const;

Object.freeze(API_OPERATION);
