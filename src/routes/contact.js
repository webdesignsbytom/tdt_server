import { Router } from 'express';
import {
  validateAuthentication,
  validateAdminRole,
  validateDeveloperRole,
} from '../middleware/auth.js';
import { getAllContactRequests } from '../controllers/contact.js';

const router = Router();

router.get(
  '/',
  validateAuthentication,
  validateAdminRole,
  getAllContactRequests
);
router.post('/contact-submit', createNewContactRequest);
router.delete(
  '/delete/:contactId',
  validateAuthentication,
  validateAdminRole,
  deleteContactRequest
);

export default router;
