import * as userRepo from './userRepo.js';

export const getAllUsers = async () => {
    return await userRepo.getAllUsers();
};

export const getVerifiedUsers = async () => {
    const users = await userRepo.getVerifiedUsers();
    return users;
};

export const getUnverifiedUsers = async () => {
    const users = await userRepo.getUnverifiedUsers();
    return users;
};

