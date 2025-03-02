import express from 'express';
import {
  createPaymentIntent,
  stripeWebhook
} from '../controllers/paymentController.js';

const router = express.Router();

router.post('/create-payment-intent', createPaymentIntent);
router.post('/webhook', express.raw({ type: 'application/json' }), stripeWebhook);

export default router;