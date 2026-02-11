import jwt from 'jsonwebtoken';
import { tokenConfig } from '../config/tokenConfig.js';
import { asyncHandler } from '../core/utils/asyncCatch.js'
import { ERROR_CODES } from '../core/errors/errorCodes.js';
import AppError from '../core/errors/appError.js';
import User from '../modules/user/userModel.js';
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
        throw new AppError(ERROR_CODES.NO_TOKEN_PROVIDED);
    }
    try {
        const decoded = jwt.verify(token, tokenConfig().accessTokenSecret);
        const user = User.findById(decoded.id).select('-password');
        req.user = user;
        next();
        } catch (error) {
            console.error('JWT verification error:', error);
   throw new AppError(ERROR_CODES.INVALID_TOKEN);
}
});