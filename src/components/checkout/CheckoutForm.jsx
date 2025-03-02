import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { toast } from 'react-toastify';

const CheckoutForm = () => {
  const navigate = useNavigate();
  const { cartItems, totalAmount, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pickupTime: '',
    notes: ''
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }
    
    setIsProcessing(true);
    
    // In a real application, you would send this data to your backend
    const orderData = {
      customer: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      },
      items: cartItems,
      totalAmount,
      pickupTime: formData.pickupTime,
      notes: formData.notes,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store in localStorage for demo purposes
      // In a real app, this would be stored in a database
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const newOrder = {
        ...orderData,
        _id: `order_${Date.now()}`,
        paymentStatus: 'paid'
      };
      
      orders.push(newOrder);
      localStorage.setItem('orders', JSON.stringify(orders));
      
      // Clear cart and redirect
      clearCart();
      toast.success('Order placed successfully!');
      navigate(`/order/${newOrder._id}`);
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Generate pickup time options (every 15 minutes)
  const generateTimeOptions = () => {
    const options = [];
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    // Round to next 15 minutes
    const startMinute = Math.ceil(currentMinute / 15) * 15;
    let startHour = currentHour;
    
    if (startMinute >= 60) {
      startHour += 1;
    }
    
    // Generate times for the next 3 hours
    for (let hour = startHour; hour < startHour + 3; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        // Skip times in the past
        if (hour === startHour && minute < startMinute) continue;
        
        const formattedHour = hour % 12 || 12;
        const period = hour >= 12 ? 'PM' : 'AM';
        const formattedMinute = minute.toString().padStart(2, '0');
        
        const timeString = `${formattedHour}:${formattedMinute} ${period}`;
        options.push(
          <option key={timeString} value={timeString}>
            {timeString}
          </option>
        );
      }
    }
    
    return options;
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="input-field mt-1"
          placeholder="Enter your full name"
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="input-field mt-1"
          placeholder="Enter your email address"
        />
      </div>
      
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="input-field mt-1"
          placeholder="Enter your phone number"
        />
      </div>
      
      <div>
        <label htmlFor="pickupTime" className="block text-sm font-medium text-gray-700">
          Pickup Time
        </label>
        <select
          id="pickupTime"
          name="pickupTime"
          value={formData.pickupTime}
          onChange={handleChange}
          required
          className="input-field mt-1"
        >
          <option value="">Select a pickup time</option>
          {generateTimeOptions()}
        </select>
      </div>
      
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
          Special Instructions (Optional)
        </label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows="3"
          className="input-field mt-1"
          placeholder="Any special instructions for your order"
        ></textarea>
      </div>
      
      <div className="pt-4">
        <button
          type="submit"
          className="btn-primary w-full"
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Proceed to Payment'}
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;