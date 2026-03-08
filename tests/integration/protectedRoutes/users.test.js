import { describe, expect, test, beforeAll, afterAll, afterEach } from 'vitest';
import request from 'supertest';
import app from '../setup/testApp.js';
import {
  connectTestDB,
  closeTestDB,
  clearTestDB,
} from '../setup/testDb.js';
import { ERROR_CODES } from '../../../src/core/errors/errorCodes.js';

beforeAll(connectTestDB);
afterAll(closeTestDB);
afterEach(clearTestDB);

describe('fetch user profile', () => {
    test('should not fetch user profile without token', async () => {
        const res = await request(app)
            .get('/api/users');

        expect(res.statusCode).toBe(401);
        expect(res.body.message).toBe(ERROR_CODES.NO_TOKEN_PROVIDED.message);
    })

    test('should not fetch user profile with invalid token', async () => {
        const res = await request(app)
            .get('/api/users')
            .set('Authorization', 'Bearer invalidToken')
            .set('client', 'not-browser');
 
        expect(res.statusCode).toBe(401);
        expect(res.body.message).toBe(ERROR_CODES.INVALID_TOKEN.message);
    });

    test('admin should be able to fetch users', async () => {
        // First, create an admin user to sign in with
        const res = await request(app).post('/api/auth/signup').send({
            email: 'admin@test.com',
            password: 'Abc/3456',
            name: 'Admin User',
        });
        const accessToken = res.body.accessToken;
        const res2 = await request(app).get('/api/users')
        .set('Authorization', `Bearer ${accessToken}`)
        .set('client', 'not-browser');
    
        expect(res2.statusCode).toBe(200);
    })
});
