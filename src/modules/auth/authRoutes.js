import { Router } from 'express';
import { validate } from '../../middlewares/validator.js';
import { signUpSchema, signInSchema, verificationCodeSchema } from './authValidation.js';
import * as authController  from '../auth/authController.js';
import { dynamicRateLimiter } from '../../middlewares/rateLimit.js';
import { authenticate } from '../../middlewares/authentication.js';
const router = Router({ mergeParams: true });

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - name  
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@mail.com
 *               name:
 *                 type: string
 *                 example: Pedro Emilio
 *               password:
 *                 type: string
 *                 example: Strong/Pass123
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation error
 */
router.post('/signup', dynamicRateLimiter('signup'), validate(signUpSchema), authController.signUp);

/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     summary: Sign in user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@mail.com
 *               password:
 *                 type: string
 *                 example: pass/word123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post('/signin', dynamicRateLimiter('login'), validate(signInSchema), authController.signIn);

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Refresh access token using refresh token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: New access token issued
 *       401:
 *         description: Invalid refresh token
 */
router.post('/refresh', authController.refreshToken);

 /**
 * @swagger
 * /api/auth/signout:
 *   post:
 *     summary: Log out the user and invalidate tokens
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successfully signed out
 */
router.post('/signout', dynamicRateLimiter('logout'), authController.signOut);

 /**
 * @swagger
 * /api/auth/email-verification:
 *   patch:
 *     summary: Send email verification code
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Verification code sent
 *       401:
 *         description: Unauthorized
 */
router.patch('/email-verification', authenticate, dynamicRateLimiter('emailVerification'), authController.sendEmailVerificationCode);

/**
 * @swagger
 * /api/auth/email-verification-verify:
 *   patch:
 *     summary: Verify email using verification code
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: 483921
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: Invalid code
 */
router.patch('/email-verification-verify',  authenticate, dynamicRateLimiter('emailVerification'), validate(verificationCodeSchema), authController.verifyEmailCode);
 
/**
 * @swagger
 * /api/auth/change-password:
 *   patch:
 *     summary: Change user password
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       401:
 *         description: Unauthorized
 */
router.patch('/change-password', authenticate, dynamicRateLimiter('resetPassword'), authController.changePassword);

/**
 * @swagger
 * /api/auth/forgot-password:
 *   patch:
 *     summary: Send forgot password verification code
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Reset code sent
 *       404:
 *         description: Email not found
 */
router.patch('/forgot-password', dynamicRateLimiter('forgotPassword'), authController.sendForgotPassCode);

/**
 * @swagger
 * /api/auth/verify-forgot-password:
 *   patch:
 *     summary: Verify forgot password code
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Code verified
 *       400:
 *         description: Invalid or expired code
 */
router.patch('/verify-forgot-password', dynamicRateLimiter('forgotPassword'), validate(verificationCodeSchema) ,authController.verifyForgotPassCode);

export default router;




