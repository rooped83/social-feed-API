import { describe, expect, test, beforeAll, afterAll, afterEach } from 'vitest';
import request from 'supertest';
  import userModel from '../../../src/modules/user/userModel.js'; 
  import app from '../setup/testApp.js'; 
  import { connectTestDB, closeTestDB, clearTestDB, } from '../setup/testDb.js'; 
  import { ERROR_CODES } from '../../../src/core/errors/errorCodes.js'; 
  import { doHashing } from '../../../src/core/utils/hashing.js'; 
  import { generateToken } from '../../../src/core/utils/token.js'; 
  beforeAll(connectTestDB); afterAll(closeTestDB); afterEach(clearTestDB); 
  describe('fetch user profile', () => { 
    test('should not fetch user profile without token', async () => { 
        const res = await request(app) .get('/api/users'); 
        expect(res.statusCode).toBe(401); 
        expect(res.body.message).toBe(ERROR_CODES.NO_TOKEN_PROVIDED.message); 
    });
    
    test('should not fetch user profile with invalid token', async () => { 
        const res = await request(app) .get('/api/users') 
        .set('Authorization', 'Bearer invalidToken') 
        .set('client', 'not-browser'); 
        expect(res.statusCode).toBe(401);
     expect(res.body.message).toBe(ERROR_CODES.INVALID_TOKEN.message); });
test('admin should be able to fetch users', async () => {
    // First, create an admin user to sign in with
    const hashedPassword = await doHashing('admin123');
    const adminUser = await userModel.create({
        email: 'admin@test.com',
        password: hashedPassword,
        name: 'Admin User',
        role: 'ADMIN'
    });
    
    const adminPayload = {
        id: adminUser._id.toString(),
        tokenId: 'test-token-id-' + Date.now(), 
        role: adminUser.role
    };
    
    const accessToken = await generateToken(adminPayload);
    
    // Now, make the request to fetch users
    const res = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${accessToken}`)
        .set('Accept', 'application/json')
        .set('client', 'not-browser');
        console.log('Response status:', res.statusCode);
       expect(res.statusCode).toBe(200);
});
  });