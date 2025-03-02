import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaSignOutAlt, FaClipboardList, FaUtensils, FaChartBar, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

// Temporary order data for demo
const pendingOrdersData = [
  {
    id: '654321',
    customer: 'Rahul Sharma',
    time: '10:30 AM',
    status: 'Received',
    items: [
      { name: 'Chicken Biryani', quantity: 1 },
      { name: 'Mango Juice', quantity: 2 }
    ],
    total: 200
  },
  {
    id: '654322',
    customer: 'Priya Patel',
    time: '10:45 AM',
    status: 'Preparing',
    items: [
      { name: 'Veg Biryani', quantity: 1 },
      { name: 'Paneer Butter Masala', quantity: 1 },
      { name: 'Chapati (2 pcs)', quantity: 1 }
    ],
    total: 250
  }
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [pendingOrders, setPendingOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if admin is logged in
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      toast.error('Please login to access the admin dashboard');
      navigate('/admin/login');
      return;
    }
    
    // Fetch pending orders (simulated)
    const fetchPendingOrders = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          setPendingOrders(pendingOrdersData);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching pending orders:', error);
        setIsLoading(false);
      }
    };
    
    fetchPendingOrders();
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };
  
  const updateOrderStatus = (orderId, newStatus) => {
    setPendingOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    
    toast.success(`Order #${orderId} status updated to ${newStatus}`);
  };
  
  const renderOrdersTab = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      );
    }
    
    if (pendingOrders.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No pending orders at the moment.</p>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pendingOrders.map(order => (
          <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                <p className="text-gray-600">{order.customer}</p>
                <p className="text-sm text-gray-500">Pickup Time: {order.time}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                order.status === 'Received' ? 'bg-blue-100 text-blue-800' :
                order.status === 'Preparing' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {order.status}
              </span>
            </div>
            
            <div className="border-t border-b border-gray-200 py-4 mb-4">
              <h4 className="font-medium mb-2">Items:</h4>
              <ul className="space-y-1">
                {order.items.map((item, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{item.name} x {item.quantity}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-2 pt-2 border-t border-gray-200 flex justify-between font-medium">
                <span>Total:</span>
                <span>₹{order.total.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="flex space-x-2">
              {order.status === 'Received' && (
                <button
                  className="flex-1 bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition-colors"
                  onClick={() => updateOrderStatus(order.id, 'Preparing')}
                >
                  Start Preparing
                </button>
              )}
              
              {order.status === 'Preparing' && (
                <button
                  className="flex-1 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
                  onClick={() => updateOrderStatus(order.id, 'Ready for Pickup')}
                >
                  Mark as Ready
                </button>
              )}
              
              {order.status === 'Ready for Pickup' && (
                <button
                  className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
                  onClick={() => {
                    setPendingOrders(prevOrders => 
                      prevOrders.filter(o => o.id !== order.id)
                    );
                    toast.success(`Order #${order.id} marked as completed`);
                  }}
                >
                  Mark as Completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  const renderMenuTab = () => {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Menu Management</h2>
          <button className="btn-primary flex items-center">
            <FaPlus className="mr-2" />
            Add New Item
          </button>
        </div>
        
         <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Veg/Non-Veg
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Sample menu items */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img className="h-10 w-10 rounded-full object-cover" src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" alt="" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">Chicken Biryani</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">Fragrant basmati rice cooked with tender chicken pieces and aromatic spices.</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Biryani
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ₹120.00
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    Non-Veg
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                    <FaEdit />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <FaTrash />
                  </button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img className="h-10 w-10 rounded-full object-cover" src="https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">Veg Biryani</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">Flavorful basmati rice cooked with mixed vegetables and aromatic spices.</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Biryani
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ₹100.00
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Veg
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                    <FaEdit />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  const renderReportsTab = () => {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-6">Sales Reports</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-gray-500 text-sm mb-1">Today's Sales</h3>
            <p className="text-2xl font-bold">₹4,250</p>
            <p className="text-sm text-green-600 mt-2">↑ 12% from yesterday</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-gray-500 text-sm mb-1">This Week</h3>
            <p className="text-2xl font-bold">₹28,350</p>
            <p className="text-sm text-green-600 mt-2">↑ 5% from last week</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-gray-500 text-sm mb-1">This Month</h3>
            <p className="text-2xl font-bold">₹112,680</p>
            <p className="text-sm text-green-600 mt-2">↑ 8% from last month</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="font-semibold mb-4">Top Selling Items</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="h-10 w-10 flex-shrink-0">
                  <img className="h-10 w-10 rounded-full object-cover" src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" alt="" />
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">Chicken Biryani</div>
                  <div className="text-xs text-gray-500">Biryani</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">142 orders</div>
                <div className="text-xs text-gray-500">₹17,040</div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="h-10 w-10 flex-shrink-0">
                  <img className="h-10 w-10 rounded-full object-cover" src="https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" alt="" />
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">Paneer Butter Masala</div>
                  <div className="text-xs text-gray-500">Curry</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">98 orders</div>
                <div className="text-xs text-gray-500">₹11,760</div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="h-10 w-10 flex-shrink-0">
                  <img className="h-10 w-10 rounded-full object-cover" src="https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="" />
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">Veg Biryani</div>
                  <div className="text-xs text-gray-500">Biryani</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">85 orders</div>
                <div className="text-xs text-gray-500">₹8,500</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="flex items-center text-red-600 hover:text-red-800"
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </div>
      
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-4 px-6 font-medium flex items-center ${
            activeTab === 'orders'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('orders')}
        >
          <FaClipboardList className="mr-2" />
          Pending Orders
        </button>
        <button
          className={`py-4 px-6 font-medium flex items-center ${
            activeTab === 'menu'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('menu')}
        >
          <FaUtensils className="mr-2" />
          Menu Management
        </button>
        <button
          className={`py-4 px-6 font-medium flex items-center ${
            activeTab === 'reports'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('reports')}
        >
          <FaChartBar className="mr-2" />
          Reports
        </button>
      </div>
      
      {activeTab === 'orders' && renderOrdersTab()}
      {activeTab === 'menu' && renderMenuTab()}
      {activeTab === 'reports' && renderReportsTab()}
    </div>
  );
};

export default AdminDashboard;