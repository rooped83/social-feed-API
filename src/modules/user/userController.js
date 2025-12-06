import { asyncHandler } from '../../core/utils/asyncCatch.js';
import * as userService from './userService.js'
export const getAllUsers = asyncHandler(async (req, res) => {
        const users = await userService.getAllUsers();
        res.status(200).json({ success: true, data: users });
});