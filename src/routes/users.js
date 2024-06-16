import { Router } from 'express';
import {
  getAllUsers,
  registerNewUser,
  getUserById,
  deleteUser,
} from '../controllers/users.js';
import { validateAuthentication, validateAdminRole } from '../middleware/auth.js';

const router = Router();

export default router;
