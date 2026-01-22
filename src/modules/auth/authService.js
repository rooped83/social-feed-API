import * as userRepo from '../user/userRepo.js';
import * as authRepo from './authRepo.js';
import { generateToken, generateRefreshToken } from '../../core/utils/token.js';
import { ERROR_CODES } from '../../core/errors/errorCodes.js';
import AppError from '../../core/errors/appError.js';
import { doHashing, doCompare } from '../../core/utils/hashing.js';
import { generateVerificationCode, hashVerificationCode } from './helpers/generateVerficationCode.js';
import { sendVerificationEmail, sendForgotPasswordEmail } from './helpers/mailer.js';
import UserSerializer from '../user/userSerializer.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { config } from '../../config/index.js';
import { redisClient } from '../../config/redisClient.js'
import { tokenConfig } from '../../config/tokenConfig.js';

// sign up 
export const signUp = async (email, password, name) => {
    // check if user exists
    const existingUser = await userRepo.getUserByEmail(email);
    if (existingUser) {
        throw new AppError(ERROR_CODES.USER_ALREADY_EXIST);
    }
    // hash password
    const hashedPassword = await doHashing(password)
    // create user
    const user = await userRepo.createUser({
        email,
        password: hashedPassword,
        name
    
    });
    const serializedUser = UserSerializer.base(user);
    // generate tokens
    const tokenId = crypto.randomUUID();
  const accessToken = generateToken(serializedUser);
  const refreshToken = generateRefreshToken(serializedUser, tokenId);

  await redisClient.set(
    `refreshToken:${serializedUser.id}:${tokenId}`,
    'valid',
    'EX',
    7 * 24 * 60 * 60
  );

    return { serializedUser, accessToken, refreshToken };
};
//signIn logic
export const signIn = async (email, password) => {
    // check if exists
    const user = await userRepo.getUserByEmail(email);
    if (!user) {
        throw new AppError( ERROR_CODES.USER_NOT_FOUND);
    }
    //check password
    const isMatch = await doCompare(password, user.password);
    if (!isMatch) {
        throw new AppError(ERROR_CODES.WRONG_PASSWORD);
    }
    const tokenId = crypto.randomUUID()
     const serializedUser = UserSerializer.base(user);
    // generate token
    const accessToken = generateToken(serializedUser);
    const refreshToken = generateRefreshToken(serializedUser, tokenId);
    // store refresh token in redis
    const redisKey = `refreshToken:${serializedUser.id}:${tokenId}`;
    await redisClient.set(
        redisKey,
         'valid', 
        'EX',
         7 * 24 * 60 * 60 
    );
     
    return { user: serializedUser, accessToken, refreshToken };
    };

    //sign out logic
    export const signOut = async (refreshToken) => {
        if (!refreshToken || typeof refreshToken !== 'string') {
            return false;
        }

        const payload = jwt.verify(refreshToken, tokenConfig().refreshTokenSecret)

        redisClient.del(`refreshToken:${payload.id}:${payload.tokenId}`);
        return true;
    };

    // send verification code logic:
    export const sendEmailVerificationCode = async (email) => {
        // check if exists
        const existingUser = await userRepo.getUserByEmail(email);
        if (!existingUser) {
        throw new AppError(ERROR_CODES.USER_NOT_FOUND);
        };
        if (existingUser.emailVerified === true) {
        throw new AppError(ERROR_CODES.USER_ALREADY_VERIFIED);
        };
        // generate code
        const code = generateVerificationCode();
        const hashedCode = hashVerificationCode(code);
        // set expiration and save in Db
        const expirationTime = new Date(Date.now() + 5 * 60000) 
        await authRepo.createVerificationCode({
            userId: existingUser._id,
            hashedCode,
            expirationTime,
            type: 'email verification'
        });
        // send email
        await sendVerificationEmail({ user: existingUser, verificationCode: code });
        };

        // verify verification code logic:
        export const verifyVerificationCode = async (email, code) => {
            const normalizedCode = code.toString();
            const existingUser = await userRepo.getUserByEmail(email);
            if (!existingUser) {
                throw new AppError(ERROR_CODES.USER_NOT_FOUND);
            };
            if (existingUser.emailVerified) {
                throw new AppError(ERROR_CODES.USER_ALREADY_VERIFIED); 
            }
            const record = await authRepo.getVerificationCode({ userId: existingUser._id });
            if (!record) {
                throw new AppError(ERROR_CODES.NO_VERIFICATION_CODE_FOUND);
            };
            if (record.expirationTime.getTime() < Date.now()) {
                throw new AppError(ERROR_CODES.VERIFICATION_CODE_EXPIRED);
            }
            // check if code matches
            const isMatch = doCompare(normalizedCode, record.hashedCode);
            if (!isMatch) {
                throw new AppError(ERROR_CODES.INVALID_VERIFICATION_CODE);
            }
            //update user as verified
            await userRepo.markAsVerified(existingUser._id);
            await authRepo.invalidateVerificationCodes({ userId: existingUser._id, type: 'email verification' });
        };
    
        //change password logic: 
        export const changePassword = async( email, oldPassword, newPassword) => {
            const existingUser = await userRepo.getUserByEmail(email);
            if (!existingUser) {
                throw new AppError(ERROR_CODES.USER_NOT_FOUND);
            };
        //check old password:
        const isMatch = await doCompare(oldPassword, existingUser.password);
        if (!isMatch) {
            throw new AppError(ERROR_CODES.WRONG_PASSWORD);
        };
        // update password:
        const hashedPassword = await doHashing(newPassword);
        existingUser.password = hashedPassword;
        await userRepo.updateUser(existingUser._id, hashedPassword);
    
};

// send forgot password code logic:
export const sendForgotPassCode = async (email) => {
    const existingUser = await userRepo.getUserByEmail(email);
    if (!existingUser) {
        throw new AppError(ERROR_CODES.USER_NOT_FOUND);
    };
    // generate code
    const code = generateVerificationCode();
    const hashedCode = hashVerificationCode(code);
    const expirationTime = new Date(Date.now() + 5 * 60 * 1000)
    await authRepo.createVerificationCode({
        userId: existingUser._id,
        hashedCode,
        expirationTime,
        type: 'forgot password'
    });
    //send email
    await sendForgotPasswordEmail({ user: existingUser, verificationCode: code });
};

// verify forgot password code:
    export const verifyForgotPasswordCode = async (email, code, newPassword) => {
        const stringCode = String(code);
        const existingUser = await userRepo.getUserByEmail(email);
        if (!existingUser) {
            const { code, statusCode, message, type } = ERROR_CODES.USER_NOT_FOUND;
            throw new AppError(message, statusCode, code, type);
        }
        const serializedUser = UserSerializer.base(existingUser);
        const record = await authRepo.getVerificationCode({ userId: serializedUser.id });
        if (!record) {
            const { code, message, statusCode, type } = ERROR_CODES.NO_VERIFICATION_CODE_FOUND
            throw new AppError(message, statusCode, code, type);
        };
        if (record.expirationTime.getTime() < Date.now()) {
            throw new AppError(ERROR_CODES.VERIFICATION_CODE_EXPIRED);
        };
        // check if code is valide:
        const hashedCode = hashVerificationCode(stringCode);
        if (hashedCode !== record.hashedCode) {
            throw new AppError(ERROR_CODES.INVALID_VERIFICATION_CODE);
        };
        //update password
        const newPasswordHashed = await doHashing(newPassword);
        existingUser.password = newPasswordHashed;
        await userRepo.updateUser(serializedUser.id, existingUser.email, newPasswordHashed, existingUser.name);
        // mark code as used
        await authRepo.markAsUsed({ verificationCodeModelId: record._id });
    };

    // refresh token logic
    export const refreshToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new AppError(ERROR_CODES.MISSING_REFRESH_TOKEN);
  }
  //  Verify JWT
  let payload;
  try {
    payload = jwt.verify(refreshToken, config().refreshTokenSecret);
  } catch {
    throw new AppError( ERROR_CODES.INVALID_REFRESH_TOKEN);
  };
  // Check token type
  if (payload.type !== 'refresh') {
    throw new AppError(ERROR_CODES.INVALID_TOKEN_TYPE);
  };
  const { id: userId, tokenId: oldTokenId } = payload;
  // Check Redis
  const oldKey = `refreshToken:${userId}:${oldTokenId}`;
  const oldValue = await redisClient.getDel(oldKey);
  if (!oldValue) {
    throw new AppError(ERROR_CODES.INVALID_REFRESH_TOKEN);
  };
  const newTokenId = crypto.randomUUID();
  const newRefreshToken = generateRefreshToken(
    { id: userId, role: payload.role },
    newTokenId
  );
  //  Store new token in redis
  const newKey = `refreshToken:${userId}:${newTokenId}`;
  await redisClient.set(newKey, 'valid', 'EX', 7 * 24 * 60 * 60);
  // Delete old token aftre new one exists
  await redisClient.del(oldKey);
  // Issue new access token
  const newAccessToken = generateToken({
    id: userId,
    role: payload.role
  });
  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken
  };
};

        

        
