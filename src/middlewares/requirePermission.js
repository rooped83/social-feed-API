import { rolePermissions } from "../core/RBAC/roles.js";
import AppError from "../core/errors/appError.js";
import { ERROR_CODES } from "../core/errors/errorCodes.js";

export const requirePermission = (permission) => {
    return (req, res, next) => {
        const { role } = req.user;
        if (!role) {
            throw new AppError(ERROR_CODES.MISSING_ROLE);
        }
        
        const permissions = rolePermissions[role];
        if (!permissions) { 
            throw new AppError(ERROR_CODES.INVALID_ROLE);
        }

        if (!permissions || !permissions.includes(permission)) {
            throw new AppError(ERROR_CODES.UNAUTHORIZED_ACTION);
        }
        next();
    };
}