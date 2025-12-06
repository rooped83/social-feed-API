import { Router } from 'express';
import { authorize } from '../../middlewares/authorization.js';
import { validate } from '../../middlewares/validator.js';
import { signUpSchema, signInSchema, verificationCodeSchema } from './authValidation.js';
import * as authController  from '../auth/authController.js';
import { dynamicRateLimiter } from '../../middlewares/rateLimit.js';
const router = Router({ mergeParams: true });

//signup route
router.post('/signup', dynamicRateLimiter('signup'), validate(signUpSchema), authController.signUp);
//signin route
router.post('/signin', dynamicRateLimiter('login'), validate(signInSchema), authController.signIn);
 //signout route
router.post('/signout',authorize, authController.signOut)
 //email verification
router.patch('/email-verification', authorize, authController.sendEmailVerificationCode);
router.patch('/email-verification-verify',validate(verificationCodeSchema), authorize, authController.verifyEmailCode);
 //change password
router.patch('/change-password', authorize, dynamicRateLimiter('resetPassword'), authController.changePassword);
// forgot password:
router.patch('/forgot-password', dynamicRateLimiter('forgotPassword'), authController.sendForgotPassCode);
router.patch('/verify-forgot-password', authController.verifyForgotPassCode);

export default router;


