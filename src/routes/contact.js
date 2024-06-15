import { Router } from 'express';
import {
  validateAuthentication,
  validateAdminRole,
  validateDeveloperRole,
} from '../middleware/auth.js';

const router = Router();

router.get(
  '/',
  validateAuthentication,
  validateAdminRole,
  getAllContactRequest
);
router.post('/contact-submit', createNewContactRequest);
router.delete(
  '/delete/:contactId',
  validateAuthentication,
  validateAdminRole,
  deleteContactRequest
);

export default router;
