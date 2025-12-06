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
            await rateLimiter.consume(key);

            return next();
         } catch (err) {
            if (err.remainingPoints === 0) {
              const { code, message, statusCode } = ERROR_CODES.RATE_LIMIT_EXCEEDED;
              return next(new AppError(message, statusCode, code));
            }
            const { code, message, statusCode } = ERROR_CODES.RATE_LIMIT_UNAVAILABLE;
            return next(new AppError(message, statusCode, code));
        ;
        }
      
    });
};