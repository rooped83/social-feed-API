import Redis from 'ioredis';

export const redisClient = new Redis({
  host: process.env.REDIS_HOST || 'redis',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  username: process.env.REDIS_USERNAME || undefined,
  // Connection retry strategy
  retryStrategy: (times) => {
    if (times > 10) {
      console.error('Redis retry attempts exhausted');
      return null; // Stop retrying
    }
    const delay = Math.min(times * 100, 3000);
    console.log(`Retrying Redis connection in ${delay}ms...`);
    return delay;
  },

  maxRetriesPerRequest: 3,
  enableReadyCheck: true,
  enableOfflineQueue: true,
  lazyConnect: false, // Connect immediately
});

// Track Redis availability
export let redisAvailable = false;

// Event: Redis is ready
redisClient.on('ready', () => {
  redisAvailable = true;
  console.log('Redis connected and ready');
});

// Event: Redis connection established
redisClient.on('connect', () => {
  console.log('Redis connection established');
});

// Event: Redis error
redisClient.on('error', (err) => {
  redisAvailable = false;
  console.error('Redis error:', err.message);
});

// Event: Redis connection closed
redisClient.on('close', () => {
  redisAvailable = false;
  console.warn('Redis connection closed');
});

// Event: Redis reconnecting
redisClient.on('reconnecting', (delay) => {
  console.log(`Redis reconnecting in ${delay}ms...`);
});

redisClient.on('end', () => {
  redisAvailable = false;
  console.warn('Redis connection ended');
});
// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, closing Redis connection...');
  await redisClient.quit();
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, closing Redis connection...');
  await redisClient.quit();
});