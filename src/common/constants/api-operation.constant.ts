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
  USERS: {
    FIND_MANY: {
      description: 'Get all users with pagination, filtering and searching',
      summary: 'Get all users operation',
    },
    FIND_ONE: {
      description: 'Get user by ID',
      summary: 'Get user by ID operation',
    },
    UPDATE: {
      description: 'Update user information',
      summary: 'Update user operation',
    },
    REMOVE: {
      description: 'Remove user from the system',
      summary: 'Remove user operation',
    },
  },
  REVIEWS: {
    CREATE: {
      description: 'Create a new review for a film',
      summary: 'Create review operation',
    },
    FIND_ALL: {
      description: 'Get all reviews with pagination, filtering and searching',
      summary: 'Get all reviews operation',
    },
    FIND_ONE: {
      description: 'Get review by ID',
      summary: 'Get review by ID operation',
    },
    FIND_BY_FILM: {
      description: 'Get all reviews for a specific film',
      summary: 'Get reviews by film ID operation',
    },
    UPDATE: {
      description: 'Update review information',
      summary: 'Update review operation',
    },
    REMOVE: {
      description: 'Remove review from the system',
      summary: 'Remove review operation',
    },
  },
} as const;

Object.freeze(API_OPERATION);
