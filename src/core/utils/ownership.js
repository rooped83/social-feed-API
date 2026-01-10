import AppError from '../errors/appError.js';
import { ERROR_CODES } from '../errors/errorCodes.js';
export const isOwnerOrAdmin = (ownerId, user) => {
    if (ownerId.toString() !== user.id && user.role !== 'ADMIN') {
        const { code, message, statusCode } = ERROR_CODES.UNAUTHORIZED_ACTION;
        throw new AppError(message, statusCode, code);
    };
    return true;
}