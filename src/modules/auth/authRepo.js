import verificationCodeModel from './authModel.js';

export const createVerificationCode = async ({ userId, hashedCode, expirationTime, type }) => {
    await verificationCodeModel.create({
        userId,
        hashedCode,
        expirationTime,
        type
    });
    return verificationCodeModel.findOne({ userId, type });
};

export const getVerificationCode = async ({ userId }) => {
    const record = await verificationCodeModel.findOne({ userId, used: false });
    return record;
};

export const markAsUsed = async ({ verificationCodeModelId }) => {
    return verificationCodeModel.findByIdAndUpdate(verificationCodeModelId, { used: true }, { new: true });
};

export const invalidateVerificationCodes = async ({ userId, type }) => {
    return verificationCodeModel.updateMany({ userId, type, used: false }, { used: true });
};

