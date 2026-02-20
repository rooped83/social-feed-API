import Router from 'express';
import { commentSchema } from './commentValidation.js';
import * as controller from './commentController.js';
import { validate } from '../../middlewares/validator.js';
import { authorize } from '../../middlewares/authorization.js';
import { dynamicRateLimiter } from '../../middlewares/rateLimit.js';
import { requirePermission } from '../../middlewares/requirePermission.js';

const router = Router({ mergeParams: true });
 
/**
 * @swagger
 * /api/posts/{postId}/comments:
 *   get:
 *     summary: Get comments for a post
 *     tags: [Comments]
 */
router.get('/:postId',authorize, requirePermission('view_comment'), dynamicRateLimiter('read'),controller.getPostComments);

/**
 * @swagger
 * /api/posts/{postId}/comments:
 *   post:
 *     summary: Add comment to post
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 */
router.post('/:postId', authorize, requirePermission('create_comment'), dynamicRateLimiter('write'), validate(commentSchema), controller.addComment);

/**
 * @swagger
 * /api/comments/{id}:
 *   patch:
 *     summary: Update a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 */router.patch('/:commentId', authorize, requirePermission('edit_comment'), dynamicRateLimiter('write'),validate(commentSchema), controller.editComment);

/**
 * @swagger
 * /api/comments/{id}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:commentId', authorize, requirePermission('delete_comment'), dynamicRateLimiter('destructive'), controller.deleteComment);

export default router;