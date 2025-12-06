import User from './userModel.js';

export const getUserByEmail = (email) => {
    return User.findOne({ email }).lean(); // here i used .lean() to get a plain js object to improve performance
};

export const getUserById = (userId) => {
    return User.findById(userId);
} ;
export const createUser = async ({ email, password, name }) => {
     const newUser = await User.create({ email, password, name });
     return newUser.toObject();
};


export const deleteUser = (userId) => {
    return User.findOneAndDelete({ _id: userId });
};

export const getAllUsers = () => {
    return User.find().sort({ createdAt: -1 });
};

export const getVerifiedUsers = () => {
    return User.find({ emailVerified: true });
};

export const getUnverifiedUsers = () => {
    return User.find({ emailVerified: false });
};

export const markAsVerified = (userId) => {
    return User.findOneAndUpdate({ _id: userId }, { emailVerified: true }, { new: true });
};