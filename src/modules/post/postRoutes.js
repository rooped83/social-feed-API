import Router from 'express';
import { authorize } from '../../middlewares/authorization.js';
import { validate } from '../../middlewares/validator.js';
import { postSchema } from './validation/createPostSchema.js';
import { updatePostSchema } from './validation/updatePostSchema.js';
const router = Router({ mergeParams: true });
import * as controller  from './postController.js';
//get posts 
router.get('/', controller.getAllPosts);
router.get('/user-posts/:id', authorize, controller.getUserPosts);
router.get('/:id', authorize, controller.getPostById);
router.get('/category/:category', authorize, controller.getPostsByCategory);
//create/update/delete posts
router.post('/',  authorize, validate(postSchema), controller.createPost);
router.patch('/:id', authorize, validate(updatePostSchema), controller.updatePost);
router.delete('/:id', authorize, controller.deletePost);
export default router;