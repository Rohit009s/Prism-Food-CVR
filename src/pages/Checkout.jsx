import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaClock, FaMoneyBill } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cartItems, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    pickupTime: '',
    paymentMethod: 'online'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availablePickupTimes, setAvailablePickupTimes] = useState([]);
  
  // Calculate total with tax
  const tax = totalAmount * 0.05;
  const orderTotal = totalAmount + tax;
  
  useEffect(() => {
    // Redirect to cart if cart is empty
    if (cartItems.length === 0) {
      navigate('/cart');
      return;
    }
    
    // Generate pickup times (every 15 minutes from current time + 30 minutes to closing time)
    generatePickupTimes();
  }, [cartItems, navigate]);
  
  const generatePickupTimes = () => {
    const times = [];
    const now = new Date();
    const startTime = new Date(now.getTime() + 30 * 60000); // Current time + 30 minutes
    startTime.setMinutes(Math.ceil(startTime.getMinutes() / 15) * 15); // Round to next 15 minute interval
    startTime.setSeconds(0);
    
    // Assuming canteen closes at 8 PM
    const closingTime = new Date(now);
    closingTime.setHours(20, 0, 0, 0);
    
    // If it's already past closing time, show times for tomorrow
    if (now >= closingTime) {
      toast.info("Canteen is closed for today. Please order for tomorrow.");
      return;
    }
    
    // Generate time slots
    let currentSlot = new Date(startTime);
    while (currentSlot < closingTime) {
      const timeString = currentSlot.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      times.push(timeString);
      currentSlot = new Date(currentSlot.getTime() + 15 * 60000); // Add 15 minutes
    }
    
    setAvailablePickupTimes(times);
    
    // Set default pickup time to first available
    if (times.length > 0) {
      setFormData(prev => ({ ...prev, pickupTime: times[0] }));
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.phone || !formData.email || !formData.pickupTime) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call to create an order
      // For now, we'll simulate a successful order
      
      setTimeout(() => {
        // Generate a random order ID
        const orderId = Math.floor(100000 + Math.random() * 900000).toString();
        
        // Clear the cart
        clearCart();
        
        // Show success message
        toast.success('Order placed successfully!');
        
        // Redirect to order confirmation page
        navigate(`/order/${orderId}`, { 
          state: { 
            orderDetails: {
              id: orderId,
              items: cartItems,
              total: orderTotal,
              name: formData.name,
              pickupTime: formData.pickupTime,
              status: 'Received',
              createdAt: new Date().toISOString()
            } 
          } 
        });
        
        setIsSubmitting(false);
      }, 2000);
      
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order. Please try again.');
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Form */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="input-field"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="input-field"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="input-field"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="pickupTime" className="block text-sm font-medium text-gray-700 mb-1">
                  Pickup Time *
                </label>
                <div className="relative">
                  <select
                    id="pickupTime"
                    name="pickupTime"
                    className="input-field pl-10"
                    value={formData.pickupTime}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select a pickup time</option>
                    {availablePickupTimes.map((time, index) => (
                      <option key={index} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                  <FaClock className="absolute left-3 top-3 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Please allow at least 30 minutes for your order to be prepared.
                </p>
              </div>
              
              <div className="mb-6">
                <h3 className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method *
                </h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <input
                      id="online"
                      name="paymentMethod"
                      type="radio"
                      value="online"
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                      checked={formData.paymentMethod === 'online'}
                      onChange={handleChange}
                    />
                    <label htmlFor="online" className="ml-2 text-sm text-gray-700">
                      Pay Online (Card/UPI)
                    </label>
                  </div>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full btn-primary py-3 flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="mr-2">Processing...</span>
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  </>
                ) : (
                  <>
                    <FaMoneyBill className="mr-2" />
                    Place Order & Pay ₹{orderTotal.toFixed(2)}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
        
        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="flow-root">
              <ul className="divide-y divide-gray-200">
                {cartItems.map(item => (
                  <li key={item._id} className="py-4 flex">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>{item.name}</h3>
                        <p className="ml-4">₹{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="border-t border-gray-200 mt-4 pt-4">
              <div className="flex justify-between text-sm mb-2">
                <p className="text-gray-600">Subtotal</p>
                <p className="font-medium">₹{totalAmount.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <p className="text-gray-600">GST (5%)</p>
                <p className="font-medium">₹{tax.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-base font-medium mt-4">
                <p>Total</p>
                <p>₹{orderTotal.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;