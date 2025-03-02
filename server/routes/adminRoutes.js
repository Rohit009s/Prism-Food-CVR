import express from 'express';
import {
  loginAdmin,
  registerAdmin,
  getAdminProfile,
  updateAdminProfile,
  getAdmins,
  deleteAdmin
} from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.post('/register', protect, admin, registerAdmin);

router.route('/profile')
  .get(protect, getAdminProfile)
  .put(protect, updateAdminProfile);

router.route('/')
  .get(protect, admin, getAdmins);

router.route('/:id')
  .delete(protect, admin, deleteAdmin);

export default router;