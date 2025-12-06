import nodemailer from 'nodemailer';
import { config } from '../../../config/index.js';

const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: config.smtpPort,
    secure: false,
    auth: config.smtpUser && config.smtpPass ?
    {
        user: config.smtpUser,
        pass: config.smtpPass
    } : undefined
});

export const sendVerificationEmail = async ({ user, verificationCode }) => {
    const mailOptions = {
        from: config.smtpEmailFrom, 
        to: user.email,
        subject: 'Email Verification Code',
        html: '<h1>Verification Code</h1>' + '<p>Your verification code is <strong>' + verificationCode + '</strong></p>'
    };
    await transporter.sendMail(mailOptions)
};

export const sendForgotPasswordEmail = async ({ user, verificationCode }) => {
    const mailOptions = {
        from: config.smtpEmailFrom,
        to: user.email,
        subject: 'Password Reset Code',
        html: '<h1>PAssword Reset Code</h1>' + '<p>Your password reset code is <strong>' + verificationCode + '</srtong></p>'
    };
    await transporter.sendMail(mailOptions);
    };


