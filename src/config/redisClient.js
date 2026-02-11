import { createClient } from 'redis';

export const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
  socket: {
    reconnectStrategy: (retries) => {
      if (retries > 10) {
        console.error('Redis retry attempts exhausted');
        return new Error('Retry attempts exhausted');
      }
      return Math.min(retries * 100, 3000);
    },
  },
});
export let redisAvailable = false;

redisClient.on('ready', () => {
    redisAvailable = true;
  console.log('Redis connected');
});

redisClient.on('error', (err) => {
    redisAvailable = false;
  console.error('Redis error:', err);
});

redisClient.on('end', () => {
  console.warn('Redis connection closed');
});

await redisClient.connect();
