import { asyncHandler } from '../../core/utils/asyncCatch.js';
import * as userService from './userService.js';

export const getAllUsers = asyncHandler(async (req, res) => {
        const users = await userService.getAllUsers();
        res.status(200).json({ success: true, data: users });
});

export const adminCreateUser = asyncHandler(async (req, res) => {
        const { email, password, name, role } = req.body;
        const adminUser = req.user;
        const user = await userService.adminCreateUser(adminUser, { email, password, name, role });
        res.status(201).json({ success: true, data: user });
});

export const updateUserRole = asyncHandler(async (req, res) => {
        const { userId } = req.params;
        const { role } = req.body;
        const adminUser = req.user;
        const user = await userService.updateUserRole({ adminUser, userId, role });
        res.status(200).json({ success: true, data: user });
});
