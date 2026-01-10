import { rolePermissions } from "../core/RBAC/roles.js";
import AppError from "../core/errors/appError.js";
import { ERROR_CODES } from "../core/errors/errorCodes.js";

export const requirePermission = (permission) => {
    return (req, res, next) => {
        const { role } = req.user;
        if (!role) {
            const { code, message, statusCode } = ERROR_CODES.MISSING_ROLE;
            throw new AppError(message, statusCode, code);
        }
        
        const permissions = rolePermissions[role];
        if (!permissions) {
            const { code, message, statusCode } = ERROR_CODES.INVALID_ROLE;  
            throw new AppError(code, message, statusCode);
        }

        if (!permissions || !permissions.includes(permission)) {
            const { code, message, statusCode } = ERROR_CODES.UNAUTHORIZED_ACTION;
            throw new AppError(message, statusCode, code);
        }
        next();
    };
}