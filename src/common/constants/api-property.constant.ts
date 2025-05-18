export const API_PROPERTY = {
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
} as const;

Object.freeze(API_PROPERTY);
