import { beforeAll, afterAll } from 'vitest';
import { connectTestDB, closeTestDB } from './testDb.js';

beforeAll(async () => {
  await connectTestDB();
});

afterAll(async () => {
  await closeTestDB();
});
