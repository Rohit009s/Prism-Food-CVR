import express from 'express';
import {
  createOrder,
  getOrderById,
  getOrders,
  updateOrderStatus,
  getOrdersByCustomer,
  getPendingOrders,
  getSalesReport
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(createOrder)
  .get(protect, getOrders);

router.route('/pending')
  .get(protect, getPendingOrders);

router.route('/sales')
  .get(protect, admin, getSalesReport);

router.route('/customer/:email')
  .get(getOrdersByCustomer);

router.route('/:id')
  .get(getOrderById);

router.route('/:id/status')
  .put(protect, updateOrderStatus);

export default router;