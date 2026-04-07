import AppError from '../errors/appError.js';
import { ERROR_CODES } from '../errors/errorCodes.js';

export const requireOwnership = (getOwnerId) => {
    return (req, res, next) => {
        const user = req.user;

        const ownerId = getOwnerId(req);

        const isOwner = ownerId.toString() === user._id.toString();
        const isAdmin = user.role === 'ADMIN';

        if (!isOwner && !isAdmin) {
            const { code, message, statusCode } = ERROR_CODES.UNAUTHORIZED_ACTION;
            throw new AppError(message, statusCode, code);
        }

        next();
    };
};