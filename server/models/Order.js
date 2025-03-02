import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  food: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true
  },
  customerEmail: {
    type: String,
    required: true
  },
  customerPhone: {
    type: String,
    required: true
  },
  items: [orderItemSchema],
  totalAmount: {
    type: Number,
    required: true
  },
  tax: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Received', 'Preparing', 'Ready for Pickup', 'Completed', 'Cancelled'],
    default: 'Received'
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['online'],
    default: 'online'
  },
  paymentId: {
    type: String
  },
  pickupTime: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

export default Order;