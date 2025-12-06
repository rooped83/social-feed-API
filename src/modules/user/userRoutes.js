import Router from 'express';
const router = Router({ mergeParams: true });
import { getAllUsers } from './userController.js';
// get all users 
router.get('/', getAllUsers);

export default router;