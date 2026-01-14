process.env.TOKEN_SECRET = 'secret';
process.env.EXPIRATION_TIME = '1h';
process.env.REFRESH_TOKEN_SECRET = 'refreshSecret';
process.env.REFRESH_TOKEN_EXPIRATION_TIME = '1d';
import jwt from 'jsonwebtoken';
import { vi, describe, test, expect } from 'vitest';
import { generateToken } from '../../src/core/utils/token.js';
vi.mock('jsonwebtoken', () => ({
    default:{
    sign: vi.fn()
    }
}));


describe('generateToken', () => {
  test('creates a signed access token', () => {
    const user = { id: '123', role: 'user' };
    jwt.sign.mockReturnValue('fake.jwt.token');

    const token = generateToken(user);

    expect(jwt.sign).toHaveBeenCalledWith(
      {
        id: '123',
        role: 'user',
        type: 'access',
      },
      expect.any(String),
      { expiresIn: expect.any(String) }
    );

    expect(token).toBe('fake.jwt.token');
  });

  test('throws when user is missing', () => {
    expect(() => generateToken(null)).toThrow(Error);
  });
});