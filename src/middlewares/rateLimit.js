import { RateLimiterRedis, RateLimiterMemory } from 'rate-limiter-flexible';
import { asyncHandler } from '../core/utils/asyncCatch.js';
import { redisClient } from '../config/redisClient.js';
import AppError from '../core/errors/appError.js';
import { ERROR_CODES } from '../core/errors/errorCodes.js';
import { rateLimiterConfig } from '../config/rateLimiter.js';

//  Module-level cache 
const limiterCache = new Map();

function getLimiter(type, role) {
  const cacheKey = `${type}:${role}`;

  if (limiterCache.has(cacheKey)) {
    return limiterCache.get(cacheKey);
  }

 const config =
  rateLimiterConfig[type]?.[role] ??
  rateLimiterConfig[type]?.ANONYMOUS;

  const limiter = {
    redis: new RateLimiterRedis({
      storeClient: redisClient,
      ...config,
    }),
    memory: new RateLimiterMemory(config),
  };

  limiterCache.set(cacheKey, limiter);

  return limiter;
}

export function dynamicRateLimiter(type) {
  return asyncHandler(async (req, res, next) => {
    const role = req.user?.role || 'ANONYMOUS';
    console.log({ type, role, typeConfig: rateLimiterConfig[type], roleConfig: rateLimiterConfig[type]?.[role] });

    const limiter = getLimiter(type, role);

    if (!limiter) {
      return next(new AppError(ERROR_CODES.RATE_LIMIT_UNAVAILABLE));
    }

    const key = req.user
      ? `user:${req.user.id}`
      : `ip:${req.ip}`;

    try {
      await limiter.redis.consume(key);
      return next();
    } catch (err) {

      if (err?.remainingPoints !== undefined) {
        return next(new AppError(ERROR_CODES.RATE_LIMIT_EXCEEDED));
      }

      try {
        await limiter.memory.consume(key);
        return next();
      } catch {
        return next(new AppError(ERROR_CODES.RATE_LIMIT_EXCEEDED));
      }
    }
  });
}

