import Order from '../models/Order.js';
import Food from '../models/Food.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Public
export const createOrder = async (req, res) => {
  try {
    const { 
      customerName, 
      customerEmail, 
      customerPhone, 
      items, 
      totalAmount,
      tax,
      paymentMethod,
      paymentId,
      pickupTime
    } = req.body;
    
    if (items && items.length === 0) {
      res.status(400).json({ message: 'No order items' });
      return;
    }
    
    // Create order
    const order = new Order({
      customerName,
      customerEmail,
      customerPhone,
      items,
      totalAmount,
      tax,
      paymentMethod,
      paymentId,
      pickupTime
    });
    
    const createdOrder = await order.save();
    
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Public
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const order = await Order.findById(req.params.id);
    
    if (order) {
      order.status = status;
      
      const updatedOrder = await order.save();
      
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get orders by customer email
// @route   GET /api/orders/customer/:email
// @access  Public
export const getOrdersByCustomer = async (req, res) => {
  try {
    const orders = await Order.find({ customerEmail: req.params.email }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get pending orders (Received or Preparing)
// @route   GET /api/orders/pending
// @access  Private/Admin
export const getPendingOrders = async (req, res) => {
  try {
    const orders = await Order.find({ 
      status: { $in: ['Received', 'Preparing', 'Ready for Pickup'] } 
    }).sort({ createdAt: 1 });
    
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get sales report
// @route   GET /api/orders/sales
// @access  Private/Admin
export const getSalesReport = async (req, res) => {
  try {
    const { period } = req.query;
    let startDate;
    const endDate = new Date();
    
    // Set start date based on period
    if (period === 'day') {
      startDate = new Date();
      startDate.setHours(0, 0, 0, 0);
    } else if (period === 'week') {
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
    } else if (period === 'month') {
      startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 1);
    } else {
      // Default to last 30 days
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 30);
    }
    
    // Get completed orders within date range
    const orders = await Order.find({
      status: 'Completed',
      createdAt: { $gte: startDate, $lte: endDate }
    });
    
    // Calculate total sales
    const totalSales = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    
    // Count orders by food item
    const foodCounts = {};
    orders.forEach(order => {
      order.items.forEach(item => {
        if (foodCounts[item.name]) {
          foodCounts[item.name].quantity += item.quantity;
          foodCounts[item.name].total += item.price * item.quantity;
        } else {
          foodCounts[item.name] = {
            name: item.name,
            quantity: item.quantity,
            total: item.price * item.quantity,
            image: item.image
          };
        }
      });
    });
    
    // Convert to array and sort by quantity
    const topSellingItems = Object.values(foodCounts).sort((a, b) => b.quantity - a.quantity);
    
    res.json({
      totalSales,
      orderCount: orders.length,
      topSellingItems: topSellingItems.slice(0, 5) // Top 5 items
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};