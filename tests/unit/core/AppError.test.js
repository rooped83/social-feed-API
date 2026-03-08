import { test, describe, expect } from 'vitest';
import AppError from '../../../src/core/errors/appError.js';
import { ERROR_CODES } from '../../../src/core/errors/errorCodes.js'; // adjust path if needed

describe('AppError', () => {
  test('sets message, statusCode and code', () => {
    const err = new AppError(ERROR_CODES.UNAUTHORIZED_TO_DELETE_POST);

    expect(err.message).toBe('You are not authorized to delete this post');
    expect(err.statusCode).toBe(403); 
    expect(err.code).toBe('UNAUTHORIZED_TO_DELETE_POST');
  });

  test('is instance of Error', () => {
    const err = new AppError(ERROR_CODES.INVALID_REQUEST);
    expect(err).toBeInstanceOf(Error);
    expect(err).toBeInstanceOf(AppError);
  });

  test('has correct type', () => {
    const err = new AppError(ERROR_CODES.DATABASE_ERROR);
    expect(err.type).toBe('INFRA');
  });

  test('throws error if not constructed with ERROR_CODES', () => {
    expect(() => {
      new AppError('Not allowed', 403, 'FORBIDDEN');
    }).toThrow('AppError must be constructed with ERROR_CODES');
  });
});