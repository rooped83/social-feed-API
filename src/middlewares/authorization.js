import jwt from 'jsonwebtoken';
import { tokenConfig } from '../config/tokenConfig.js';
import { asyncHandler } from '../core/utils/asyncCatch.js'
import { ERROR_CODES } from '../core/errors/errorCodes.js';
import AppError from '../core/errors/appError.js';
 export const authorize = asyncHandler(async (req, res, next) => {
    let token ;
    if (req.headers.client === 'not-browser') {
        token = req.headers.authorization;
        if (token?.startsWith('Bearer ')) {
            token = token.slice(7);
        }
    } else { 
        token = req.cookies['authorization'];
    }
    if (!token) {
        throw new AppError( ERROR_CODES.UNAUTHORIZED_ACTION);
    }
    try {
        const decoded = jwt.verify(token, tokenConfig().accessTokenSecret);
        req.user = decoded; 
        next();
        } catch (error) {
            console.error('JWT verification error:', error);
   throw new AppError(ERROR_CODES.UNAUTHORIZED_ACTION);
}
});