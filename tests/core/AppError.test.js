import { test, describe, expect} from 'vitest';
 import AppError from '../../src/core/errors/appError.js';
import { ERROR_CODES } from '../../src/core/errors/errorCodes.js';

describe('AppError', () => {
  test('sets message, statusCode and code', () => {
    const err = new AppError(ERROR_CODES.FORBIDDEN);

    expect(err.message).toBe(ERROR_CODES.FORBIDDEN.message);
    expect(err.statusCode).toBe(403); 
    expect(err.code).toBe(ERROR_CODES.FORBIDDEN.code);
  });

  test('is instance of Error', () => {
    const err = new AppError(ERROR_CODES.BAD_REQUEST);
    expect(err).toBeInstanceOf(Error);
  });
});