import Router from 'express';
import postRoutes from '../modules/post/postRoutes.js';
import authRoutes from '../modules/auth/authRoutes.js';
import userRoutes from '../modules/user/userRoutes.js';
const router = Router(); 

router.use('/posts', postRoutes);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);

export default router;