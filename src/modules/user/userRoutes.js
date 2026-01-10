import Router from 'express';
const router = Router({ mergeParams: true });
import * as userController from './userController.js';
import { authorize } from '../../middlewares/authorization.js';
import { requirePermission } from '../../middlewares/requirePermission.js'; 
import { dynamicRateLimiter } from '../../middlewares/rateLimit.js';
// get all users 
router.get('/', authorize, requirePermission('view_user'), dynamicRateLimiter('read'), userController.getAllUsers);

export default router;