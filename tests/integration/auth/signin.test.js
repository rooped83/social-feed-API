import '../setup/setupEnv.js';
import { describe, expect, test , beforeAll, afterAll, afterEach } from 'vitest';
import request from 'supertest';
import app from '../setup/testApp.js';

import {
  connectTestDB,
  closeTestDB,
  clearTestDB,
} from '../setup/testDb.js';

beforeAll(connectTestDB);
afterAll(closeTestDB);
afterEach(clearTestDB);

describe('Signin', () => {
    test('should signin an existing user', async () => {
        // First, create a user to signin with
        await request(app).post('/api/auth/signup').send({
            email: 'test@test.com',
            password: 'Abc/3456',
            name: 'Test User',
        });
 
        const res = await request(app).post('/api/auth/signin').send({
            email: 'test@test.com',
            password: 'Abc/3456',
        });
 
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
    })

    test('should not signin with wrong password', async () => {
        // First, create a user to signin with
        await request(app).post('/api/auth/signup').send({
            email: 'test@test.com',
            password: 'Abc/3456',
            name: 'Test User',
        });
 
        const res = await request(app).post('/api/auth/signin').send({
            email: 'test@test.com',
            password: 'wrongPassword',
        });
 
        expect(res.statusCode).toBe(401);
        
    })
})