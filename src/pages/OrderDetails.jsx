import { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { FaArrowLeft, FaDownload, FaCheckCircle, FaSpinner, FaUtensils, FaBell } from 'react-icons/fa';

const OrderDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // If order details are passed via location state, use them
    if (location.state?.orderDetails) {
      setOrder(location.state.orderDetails);
      setLoading(false);
      return;
    }
    
    // Otherwise, fetch order details from API (simulated)
    const fetchOrderDetails = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        // For now, we'll simulate a response
        setTimeout(() => {
          // Generate a fake order for demo purposes
          const fakeOrder = {
            id: id,
            status: 'Ready for Pickup',
            createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
            pickupTime: new Date(Date.now() + 1800000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // 30 minutes from now
            name: 'John Doe',
            items: [
              {
                _id: '1',
                name: 'Chicken Biryani',
                price: 120,
                quantity: 2,
                image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
              },
              {
                _id: '5',
                name: 'Chapati (2 pcs)',
                price: 30,
                quantity: 1,
                image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1371&q=80',
              }
            ],
            total: 283.5 // (120*2 + 30) * 1.05
          };
          
          setOrder(fakeOrder);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching order details:', error);
        setLoading(false);
      }
    };
    
    fetchOrderDetails();
  }, [id, location.state]);
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Received':
        return <FaCheckCircle className="text-blue-500" />;
      case 'Preparing':
        return <FaUtensils className="text-yellow-500" />;
      case 'Ready for Pickup':
        return <FaBell className="text-green-500" />;
      default:
        return <FaSpinner className="text-gray-500" />;
    }
  };
  
  const handleDownloadInvoice = () => {
    // In a real app, this would generate and download a PDF invoice
    alert('Invoice download functionality would be implemented here.');
  };
  
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-medium text-gray-900 mb-2">Order not found</h2>
          <p className="text-gray-600 mb-6">The order you're looking for doesn't exist or has been removed.</p>
          <Link to="/order-history" className="btn-primary">
            View Order History
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Link to="/order-history" className="mr-4 text-primary hover:text-primary-dark">
            <FaArrowLeft className="text-xl" />
          </Link>
          <h1 className="text-3xl font-bold">Order #{order.id}</h1>
        </div>
        <button
          onClick={handleDownloadInvoice}
          className="flex items-center text-primary hover:text-primary-dark"
        >
          <FaDownload className="mr-2" />
          Download Invoice
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Order Status</h2>
            
            <div className="flex items-center mb-4">
              <div className="mr-3">
                {getStatusIcon(order.status)}
              </div>
              <div>
                <p className="font-medium text-lg">{order.status}</p>
                <p className="text-sm text-gray-500">
                  {order.status === 'Ready for Pickup' 
                    ? 'Your order is ready! Please collect it from the canteen counter.'
                    : order.status === 'Preparing'
                    ? 'Your order is being prepared. It will be ready soon.'
                    : 'Your order has been received and will be prepared shortly.'}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-md p-4">
                <p className="text-sm text-gray-500 mb-1">Order Date & Time</p>
                <p className="font-medium">
                  {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-md p-4">
                <p className="text-sm text-gray-500 mb-1">Pickup Time</p>
                <p className="font-medium">{order.pickupTime}</p>
              </div>
              
              <div className="border border-gray-200 rounded-md p-4">
                <p className="text-sm text-gray-500 mb-1">Customer Name</p>
                <p className="font-medium">{order.name}</p>
              </div>
              
              <div className="border border-gray-200 rounded-md p-4">
                <p className="text-sm text-gray-500 mb-1">Order ID</p>
                <p className="font-medium">{order.id}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Order Items</h2>
            
            <div className="flow-root">
              <ul className="divide-y divide-gray-200">
                {order.items.map(item => (
                  <li key={item._id} className="py-4 flex">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
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
                      <div className="flex justify-between mt-1">
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        <p className="text-sm text-gray-500">₹{item.price.toFixed(2)} each</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Payment Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
            <h2 className="text-xl font-semibold mb-4">Payment Summary</h2>
            
            <div className="flow-root">
              <dl className="-my-4 text-sm divide-y divide-gray-200">
                <div className="py-4 flex items-center justify-between">
                  <dt className="text-gray-600">Subtotal</dt>
                  <dd className="font-medium text-gray-900">₹{(order.total / 1.05).toFixed(2)}</dd>
                </div>
                
                <div className="py-4 flex items-center justify-between">
                  <dt className="text-gray-600">GST (5%)</dt>
                  <dd className="font-medium text-gray-900">₹{(order.total - (order.total / 1.05)).toFixed(2)}</dd>
                </div>
                
                <div className="py-4 flex items-center justify-between">
                  <dt className="text-base font-medium text-gray-900">Total Paid</dt>
                  <dd className="text-base font-medium text-gray-900">₹{order.total.toFixed(2)}</dd>
                </div>
              </dl>
            </div>
            
            <div className="mt-6 bg-green-50 border border-green-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FaCheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">Payment Successful</h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>Your payment has been processed successfully.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;