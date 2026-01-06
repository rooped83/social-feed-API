import { asyncHandler } from '../../core/utils/asyncCatch.js';
import * as authService from './authService.js';
import { config } from '../../config/index.js';
// signup controller
export const signUp = asyncHandler(async (req, res) => {
    const { email, password, name } = req.body;
    const newUser = await authService.signUp(email, password, name);
res.status(201).json({ success: true, message: "User created successfully", user: newUser }); 
});

//signin controller
export const signIn = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await authService.signIn(email, password);
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: config().nodeEnv === 'production',
        sameSite: 'Strict',
        path: '/auth/refresh',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.status(200).json({ success: true, message: "User signed in successfully", user, accessToken });
});

// signout   
export const signOut = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
        await authService.signOut(refreshToken)
    }   res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: config().nodeEnv === 'production',
        sameSite: 'Strict',
        path: '/auth/refresh'
        });
    res.status(200).json({ success: true, message: "User signed out successfully"});
});

// send email verification code 
export const sendEmailVerificationCode = asyncHandler(async (req, res) => {
        await authService.sendEmailVerificationCode(req.user.email);
res.json({ message: "Verification code sent to email"});
});

// verify email code 
 export const verifyEmailCode = asyncHandler(async(req, res) => {
    const { code } = req.body;
    await authService.verifyVerificationCode(req.user.email, code);
        res.status(200).json({ message: "Email verified successfully" });
    });

// change password 
export const changePassword = asyncHandler(async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;
    await authService.changePassword(email, oldPassword, newPassword);
        res.status(200).json({ message: "Password changed successfully"});
    });

// forgot passord
export const sendForgotPassCode = asyncHandler(async (req, res) => {
    const { email } = req.body;
    await authService.sendForgotPassCode(email);
res.json({ message: "Your forgot password code sent to email"});
});


// verify forgot password code logic
 export const verifyForgotPassCode = asyncHandler(async (req, res) => {
    const { email, code, newPassword } = req.body;
    await authService.verifyForgotPasswordCode(email, code, newPassword) 
        res.status(200).json({ message: "Password changed successfully" });
    });

    
