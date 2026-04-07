import request from 'supertest';
import app from '../setup/testApp.js';
import {
  connectTestDB,
  closeTestDB,
  clearTestDB,
} from '../setup/testDb.js';
import { beforeAll, afterAll, afterEach, describe, expect , test } from 'vitest';

beforeAll(connectTestDB);
afterAll(closeTestDB);
afterEach(clearTestDB);

describe('Signup', () => {
  test('should create a new user', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({
        email: 'test@test.com',
        password: 'Abc/3456',
        name: 'Test User',
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.user.email).toBe('test@test.com');
  });
});


