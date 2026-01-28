import Router from 'express';
const router = Router({ mergeParams: true });
import * as userController from './userController.js';
import { authorize } from '../../middlewares/authorization.js';
import { requirePermission } from '../../middlewares/requirePermission.js'; 
import { dynamicRateLimiter } from '../../middlewares/rateLimit.js';
// get all users 
router.get('/', authorize, requirePermission('view_user'), dynamicRateLimiter('read'), userController.getAllUsers);
router.post('/', authorize, requirePermission('create_user'), dynamicRateLimiter('write'), userController.adminCreateUser);
router.patch('/:userId/role', authorize, requirePermission('update_user_role'), dynamicRateLimiter('write'), userController.updateUserRole);
export default router;