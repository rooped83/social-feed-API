import * as userRepo from './userRepo.js';
import { ERROR_CODES } from '../../core/errors/errorCodes.js';
import AppError from '../../core/errors/appError.js';
import { doHashing } from '../../core/utils/hashing.js';;

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

export const adminCreateUser = async (adminUser, { email, password, name, role }) => {
  if (!['USER', 'EDITOR', 'ADMIN'].includes(role)) {
    throw new AppError(ERROR_CODES.INVALID_USER_ROLE);
  };
  //  prevent creating equal level admins
  if (role === 'ADMIN' && adminUser.role !== 'SUPER_ADMIN') {
    throw new AppError(ERROR_CODES.CAN_NOT_CREATE_ADMIN);
  };
  const hashed = await doHashing(password);

  return userRepo.createUser({
    email,
    password: hashed,
    name,
    role
  });
};

export const updateUserRole = async ({ adminUser, userId, role }) => {
    const user = await userRepo.getUserById(userId);
    if (!user) {
        throw new AppError(ERROR_CODES.USER_NOT_FOUND);
    };
    if (adminUser._id === userId) {
        throw new AppError(ERROR_CODES.CAN_NOT_CHANGE_OWN_ROLE);
    }
    if (user.role === 'ADMIN') {
        throw new AppError(ERROR_CODES.CAN_NOT_UPDATE_ADMIN);
    };
    const updatedUser = await userRepo.updateUserRole(userId, role);
    return updatedUser;
};

