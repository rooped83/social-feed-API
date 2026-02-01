import redis from 'ioredis';

 export const redisClient = new redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD || undefined,
    enableOfflineQueue: false,
    maxRetriesPerRequest: 1,
});
console.log('Redis client initialized');