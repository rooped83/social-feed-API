import Router from 'express';
import { commentSchema } from './commentValidation.js';
import * as controller from './commentController.js';
import { validate } from '../../middlewares/validator.js';
import { authorize } from '../../middlewares/authorization.js';

const router = Router({ mergeParams: true });
 
router.get('/:postId', controller.getPostComments);
router.post('/:postId', authorize, validate(commentSchema), controller.addComment);
router.patch('/:commentId', authorize, validate(commentSchema), controller.editComment);
router.delete('/:commentId', authorize, controller.deleteComment);

export default router;