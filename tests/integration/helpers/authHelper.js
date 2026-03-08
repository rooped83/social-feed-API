import request from 'supertest';
import app from '../setup/testApp.js';

export async function login(email, password) {
  const res = await request(app)
    .post('/api/auth/signin')
    .send({ email, password });

  return res.body.accessToken;
}
