import Router from 'express';
import { authenticate } from '../../middlewares/authentication.js';
import { validate } from '../../middlewares/validator.js';
import { postSchema } from './validation/createPostSchema.js';
import { updatePostSchema } from './validation/updatePostSchema.js';
import { requirePermission } from '../../middlewares/requirePermission.js';
const router = Router({ mergeParams: true });
import * as controller  from './postController.js';
import { dynamicRateLimiter } from '../../middlewares/rateLimit.js';

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         example: 10
 *     responses:
 *       200:
 *         description: List of posts
 */
router.get('/', authenticate, requirePermission('view_post'), dynamicRateLimiter('read'), controller.getAllPosts);

/**
 * @swagger
 * /api/posts/user-posts/{id}:
 *   get:
 *     summary: Get posts created by a specific user
 *     description: Requires view_post permission
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 65af32ab
 *     responses:
 *       200:
 *         description: List of posts created by the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       404:
 *         description: User not found
 *       403:
 *         description: Forbidden — insufficient permissions
 */
router.get('/user-posts/:id', authenticate, requirePermission('view_post'), dynamicRateLimiter('read'), controller.getUserPosts);

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Get a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post details
 *       404:
 *         description: Post not found
 */
router.get('/:id', authenticate, requirePermission('view_post'), dynamicRateLimiter('read'), controller.getPostById);

/**
 * @swagger
 * /api/posts/category/{category}:
 *   get:
 *     summary: Get posts by category
 *     description: Requires view_post permission
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         example: technology
 *     responses:
 *       200:
 *         description: List of posts in the specified category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       403:
 *         description: Forbidden — insufficient permissions
 */
router.get('/category/:category', authenticate, requirePermission('view_post'), dynamicRateLimiter('read'), controller.getPostsByCategory);

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, content]
 *             properties:
 *               title:
 *                 type: string
 *                 example: My first post
 *               content:
 *                 type: string
 *                 example: This is my content
 *     responses:
 *       201:
 *         description: Post created
 */
router.post('/',  authenticate, requirePermission('create_post'), dynamicRateLimiter('write'), validate(postSchema), controller.createPost);

/**
 * @swagger
 * /api/posts/{id}:
 *   patch:
 *     summary: Update a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 */
router.patch('/:id', authenticate, requirePermission('edit_post'), dynamicRateLimiter('write'), validate(updatePostSchema), controller.updatePost);

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Delete a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', authenticate, requirePermission('delete_post'), dynamicRateLimiter('destructive'), controller.deletePost);
export default router;