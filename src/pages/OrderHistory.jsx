import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaEye } from 'react-icons/fa';

// Temporary order data (will be replaced with API call)
const orderData = [
  {
    id: '123456',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    status: 'Completed',
    total: 270.90,
    items: [
      { name: 'Chicken Biryani', quantity: 2 },
      { name: 'Mango Juice', quantity: 1 }
    ]
  },
  {
    id: '123457',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    status: 'Completed',
    total: 180.60,
    items: [
      { name: 'Veg Biryani', quantity: 1 },
      { name: 'Paneer Butter Masala', quantity: 1 }
    ]
  },
  {
    id: '123458',
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    status: 'Completed',
    total: 315.00,
    items: [
      { name: 'Mutton Biryani', quantity: 1 },
      { name: 'Chicken Curry', quantity: 1 },
      { name: 'Chapati (2 pcs)', quantity: 2 }
    ]
  }
];

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState('all');
  
  useEffect(() => {
    // Simulate API call with a delay
    const fetchOrders = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          setOrders(orderData);
          setFilteredOrders(orderData);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching order data:', error);
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, []);
  
  useEffect(() => {
    // Filter orders based on search query and selected month
    let result = [...orders];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(order => 
        order.id.toLowerCase().includes(query) || 
        order.items.some(item => item.name.toLowerCase().includes(query))
      );
    }
    
    // Filter by month
    if (selectedMonth !== 'all') {
      result = result.filter(order => {
        const orderDate = new Date(order.date);
        const orderMonth = orderDate.getMonth();
        return orderMonth === parseInt(selectedMonth);
      });
    }
    
    setFilteredOrders(result);
  }, [orders, searchQuery, selectedMonth]);
  
  const getMonthName = (monthIndex) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[monthIndex];
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const calculateTotalSpent = () => {
    return filteredOrders.reduce((total, order) => total + order.total, 0);
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Order History</h1>
      
      {/* Search and Filter Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          {/* Search Bar */}
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search orders by ID or food item..."
              className="input-field pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          
          {/* Month Filter */}
          <div className="w-full md:w-64">
            <select
              className="input-field"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="all">All Months</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i}>
                  {getMonthName(i)}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Total Spent */}
        {filteredOrders.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <p className="text-gray-600">
              Total Spent: <span className="font-bold text-primary">₹{calculateTotalSpent().toFixed(2)}</span>
              {selectedMonth !== 'all' && (
                <span className="ml-1">in {getMonthName(parseInt(selectedMonth))}</span>
              )}
            </p>
          </div>
        )}
      </div>
      
      {/* Orders List */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : filteredOrders.length > 0 ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(order.date)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <ul className="list-disc list-inside">
                      {order.items.map((item, index) => (
                        <li key={index}>
                          {item.name} x {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link to={`/order/${order.id}`} className="text-primary hover:text-primary-dark">
                      <FaEye className="inline mr-1" /> View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-xl text-gray-600">No orders found matching your criteria.</p>
          {searchQuery || selectedMonth !== 'all' ? (
            <button
              className="mt-4 btn-secondary"
              onClick={() => {
                setSearchQuery('');
                setSelectedMonth('all');
              }}
            >
              Reset Filters
            </button>
          ) : (
            <Link to="/menu" className="mt-4 btn-primary inline-block">
              Browse Menu
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;