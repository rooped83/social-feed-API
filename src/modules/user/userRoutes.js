import Router from 'express';
const router = Router({ mergeParams: true });
import * as userController from './userController.js';
import { authenticate } from '../../middlewares/authentication.js';
import { requirePermission } from '../../middlewares/requirePermission.js'; 
import { dynamicRateLimiter } from '../../middlewares/rateLimit.js';

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/', authenticate, requirePermission('ADMIN'), dynamicRateLimiter('read'), userController.getAllUsers);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Admin creates a new user
 *     description: Requires create_user permission
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
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
 *                 example: newuser@mail.com
 *               password:
 *                 type: string
 *                 example: Strong/Pass123
 *               role:
 *                 type: string
 *                 example: moderator
 *     responses:
 *       201:
 *         description: User created successfully
 *       403:
 *         description: Forbidden — insufficient permissions
 */
router.post('/', authenticate, requirePermission('ADMIN'), dynamicRateLimiter('write'), userController.adminCreateUser);

/**
 * @swagger
 * /api/users/{userId}/role:
 *   patch:
 *     summary: Update a user's role
 *     description: Requires update_user_role permission
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         example: 65af32ab
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *             properties:
 *               role:
 *                 type: string
 *                 example: admin
 *     responses:
 *       200:
 *         description: User role updated
 *       403:
 *         description: Forbidden — insufficient permissions
 *       404:
 *         description: User not found
 */
router.patch('/:userId/role', authenticate, requirePermission('ADMIN'), dynamicRateLimiter('write'), userController.updateUserRole);

/**
 * @swagger
 * /api/users/unverified:
 *   get:
 *     summary: Get unverified users
 *     description: Requires view_user permission
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of unverified users
 */
router.get('/unverified', authenticate, requirePermission('ADMIN'), dynamicRateLimiter('read'), userController.getUnverifiedUsers);
export default router;