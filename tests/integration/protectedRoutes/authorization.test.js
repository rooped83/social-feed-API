import { describe, expect, test, beforeAll, afterAll, afterEach } from 'vitest';
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

describe('user can not access admin route', () => {
    test('normal user can not fetch all users  ', async () => {
        // First, create a user to signin with        
        const res = await request(app).post('/api/auth/signup').send({
            email: 'test@test.com',
            password: 'Abc/3456',
            name: 'Test User',
        });
        const accessToken = res.body.accessToken;
        const res2 = await request(app).get('/api/users')
        .set('Authorization', `Bearer ${accessToken}`)
        .set('client', 'not-browser');
    
        expect(res2.statusCode).toBe(403);
        expect(res2.body.message).toBe('You are not authorized to perform this action');
    })
        })   
    