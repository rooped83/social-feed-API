import Router from 'express';
import { commentSchema } from './commentValidation.js';
import * as controller from './commentController.js';
import { validate } from '../../middlewares/validator.js';
import { authorize } from '../../middlewares/authorization.js';
import { dynamicRateLimiter } from '../../middlewares/rateLimit.js';
import { requirePermission } from '../../middlewares/requirePermission.js';

const router = Router({ mergeParams: true });
 
router.get('/:postId',requirePermission('view_comment'), dynamicRateLimiter('read'),controller.getPostComments);
router.post('/:postId', authorize, requirePermission('create_comment'), dynamicRateLimiter('write'), validate(commentSchema), controller.addComment);
router.patch('/:commentId', authorize, requirePermission('edit_comment'), dynamicRateLimiter('write'),validate(commentSchema), controller.editComment);
router.delete('/:commentId', authorize, requirePermission('delete_comment'), dynamicRateLimiter('destructive'), controller.deleteComment);

export default router;