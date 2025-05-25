export const API_PROPERTY = {
  ID: {
    description: 'Unique identifier for the resource',
    example: 'id-12345',
  },
  EMAIL: {
    description: 'User email address',
    example: 'user@example.com',
  },
  PASSWORD: {
    description: 'User password',
    example: 'password123',
    minLength: 6,
  },
  NAME: {
    description: 'User full name',
    example: 'John Doe',
  },
  IDS: {
    description: 'Array of IDs',
    example: ['id-1', 'id-2'],
    isArray: true,
    type: String,
  },
  FILMS: {
    TITLE: {
      description: 'Title of the film',
      example: 'The Shawshank Redemption',
    },
    DESCRIPTION: {
      description: 'Description of the film',
      example:
        'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    },
    DIRECTOR: {
      description: 'Director of the film',
      example: 'Frank Darabont',
    },
    RELEASE_DATE: {
      description: 'Release date of the film',
      example: '1994-09-23',
    },
    GENRE: {
      description: 'Genre of the film',
      example: 'Drama',
    },
    BACKGROUND_IMAGE_KEY: {
      description: 'Background image key for the film',
      example: 'film-background.jpg',
    },
  },
  REVIEW: {
    ID: {
      description: 'Unique identifier for the review',
      example: 'review-12345',
    },
    FILM_ID: {
      description: 'ID of the film being reviewed',
      example: 'film-12345',
    },
    TITLE: {
      description: 'Title of the review',
      example: 'Great Film!',
    },
    DESCRIPTION: {
      description: 'Content of the review',
      example: 'This film is an absolute masterpiece...',
    },
    RATING: {
      description: 'Rating given to the film (1-10)',
      example: 8,
      minimum: 1,
      maximum: 10,
    },
  },
} as const;

Object.freeze(API_PROPERTY);
