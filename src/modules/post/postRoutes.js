import Router from 'express';
import { authorize } from '../../middlewares/authorization.js';
import { validate } from '../../middlewares/validator.js';
import { postSchema } from './validation/createPostSchema.js';
import { updatePostSchema } from './validation/updatePostSchema.js';
import { requirePermission } from '../../middlewares/requirePermission.js';
const router = Router({ mergeParams: true });
import * as controller  from './postController.js';
import { dynamicRateLimiter } from '../../middlewares/rateLimit.js';
//get posts 
router.get('/', authorize, requirePermission('view_post'), dynamicRateLimiter('read'), controller.getAllPosts);
router.get('/user-posts/:id', authorize, requirePermission('view_post'), dynamicRateLimiter('read'), controller.getUserPosts);
router.get('/:id', authorize, requirePermission('view_post'), dynamicRateLimiter('read'), controller.getPostById);
router.get('/category/:category', authorize, requirePermission('view_post'), dynamicRateLimiter('read'), controller.getPostsByCategory);
//create/update/delete posts
router.post('/',  authorize, requirePermission('create_post'), dynamicRateLimiter('write'), validate(postSchema), controller.createPost);
router.patch('/:id', authorize, requirePermission('edit_post'), dynamicRateLimiter('write'), validate(updatePostSchema), controller.updatePost);
router.delete('/:id', authorize, requirePermission('delete_post'), dynamicRateLimiter('destructive'), controller.deletePost);
export default router;