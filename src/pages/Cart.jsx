import { Link } from 'react-router-dom';
import { FaArrowLeft, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';

const Cart = () => {
  const { cartItems, totalAmount, clearCart } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Your Cart ! Mi Alpa Haram</h1>
        <Link to="/menu" className="flex items-center text-primary hover:text-primary-dark">
          <FaArrowLeft className="mr-2" />
          Continue Shopping
        </Link>
      </div>

      {/* Check if Cart is Empty */}
      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flow-root">
                <ul className="-my-6 divide-y divide-gray-200">
                  {cartItems.map(item => (
                    <li key={item._id} className="py-6">
                      <CartItem item={item} />
                    </li>
                  ))}
                </ul>
              </div>

              {/* Clear Cart Button */}
              <div className="mt-6">
                <button
                  type="button"
                  className="text-sm text-warning hover:text-warning-dark"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>

              <div className="flow-root">
                <dl className="-my-4 text-sm divide-y divide-gray-200">
                  {/* Subtotal */}
                  <div className="py-4 flex items-center justify-between">
                    <dt className="text-gray-600">Subtotal... Discount lu undav ma dagara</dt>
                    <dd className="font-medium text-gray-900">₹{totalAmount.toFixed(2)}</dd>
                  </div>

                  {/* GST Calculation (5%) */}
                  <div className="py-4 flex items-center justify-between">
                    <dt className="text-gray-600">GST (5%)</dt>
                    <dd className="font-medium text-gray-900">₹{(totalAmount * 0.05).toFixed(2)}</dd>
                  </div>

                  {/* Total Amount */}
                  <div className="py-4 flex items-center justify-between">
                    <dt className="text-base font-medium text-gray-900">Order Total</dt>
                    <dd className="text-base font-medium text-gray-900">₹{(totalAmount * 1.05).toFixed(2)}</dd>
                  </div>
                </dl>
              </div>

              {/* Proceed to Checkout Button */}
              <div className="mt-6">
                <Link
                  to="/checkout"
                  className="w-full btn-primary flex items-center justify-center py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg"
                >
                  <FaShoppingCart className="mr-2" />
                  Proceed to Checkout .. 
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Empty Cart Message
        <div className="text-center py-10">
          <p className="text-lg text-gray-500">Your cart is empty. Add some delicious food! chustene akali iethadi...</p>
          <Link to="/menu" className="mt-4 inline-block bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600">
            Browse Menu .. inka tesuko mama
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
