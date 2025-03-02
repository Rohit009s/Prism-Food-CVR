import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  
  const handleIncrement = () => {
    updateQuantity(item._id, item.quantity + 1);
  };
  
  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item._id, item.quantity - 1);
    }
  };
  
  const handleRemove = () => {
    removeFromCart(item._id);
  };
  
  return (
    <div className="flex items-center py-4 border-b border-gray-200">
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover object-center"
        />
      </div>
      
      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between">
          <div>
            <h3 className="text-base font-medium text-dark">{item.name}</h3>
            <p className="mt-1 text-sm text-gray-500">
              {item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
            </p>
          </div>
          <p className="text-base font-medium text-dark">₹{(item.price * item.quantity).toFixed(2)}</p>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              type="button"
              className="p-2 text-gray-600 hover:text-primary"
              onClick={handleDecrement}
              disabled={item.quantity <= 1}
            >
              <FaMinus className="h-3 w-3" />
            </button>
            <span className="px-3 py-1">{item.quantity}</span>
            <button
              type="button"
              className="p-2 text-gray-600 hover:text-primary"
              onClick={handleIncrement}
            >
              <FaPlus className="h-3 w-3" />
            </button>
          </div>
          
          <button
            type="button"
            className="text-warning hover:text-opacity-80"
            onClick={handleRemove}
          >
            <FaTrash className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;