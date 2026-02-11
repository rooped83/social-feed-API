import { RateLimiterRedis } from 'rate-limiter-flexible';
import { redisClient } from '../config/redisClient.js';
import { rateLimiterConfig } from '../config/rateLimiter.js';
import { asyncHandler } from '../core/utils/asyncCatch.js';
import AppError  from '../core/errors/appError.js';
import { ERROR_CODES } from '../core/errors/errorCodes.js';
// function to create a dynamic rate limiter based on user type
export function dynamicRateLimiter(type = 'general') {
    const selectedConfig = rateLimiterConfig[type] || rateLimiterConfig.anonymous;

    const rateLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    ...selectedConfig,
});
    return  asyncHandler(async (req, res, next) => {
        const key = req.user?.id || req.ip;
         try {
      if (redisAvailable) {
        await redisLimiter.consume(key);
      } else {
        console.warn('Redis unavailable — using memory limiter');
        await memoryLimiter.consume(key);
      }

      return next();
    } catch (err) {
      // Rate limit exceeded
      if (err?.remainingPoints === 0) {
        return next(new AppError(ERROR_CODES.RATE_LIMIT_EXCEEDED));
      }
      // Redis internal error - fallback to memory
      if (redisAvailable) {
        console.error('Redis limiter error, switching to memory:', err.message);

        try {
          await memoryLimiter.consume(key);
          return next();
        } catch {
          return next(new AppError(ERROR_CODES.RATE_LIMIT_EXCEEDED));
        }
      }

      // If memory limiter failed unexpectedly
      return next(new AppError(ERROR_CODES.RATE_LIMIT_UNAVAILABLE));
    }
  });

};