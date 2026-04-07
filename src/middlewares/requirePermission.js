import AppError from "../core/errors/appError.js";
import { ERROR_CODES } from "../core/errors/errorCodes.js";


export const requirePermission =  (...allowedRoles) => {
    return (req, res, next) => {
        const { role } = req.user;
        if (!role) {
            throw new AppError(ERROR_CODES.MISSING_ROLE);
        }
        
        if (!allowedRoles.includes(role)) {
            throw new AppError(ERROR_CODES.UNAUTHORIZED_ACTION);
        }
        next();
    };
}