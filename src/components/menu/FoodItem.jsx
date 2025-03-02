import { useState } from 'react';
import { toast } from 'react-toastify';
import { useCart } from '../../context/CartContext';

const FoodItem = ({ item }) => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  
  const handleAddToCart = () => {
    setIsAdding(true);
    
    // Simulate a small delay for better UX
    setTimeout(() => {
      addToCart(item);
      setIsAdding(false);
      toast.success(`${item.name} added to cart!`);
    }, 300);
  };
  
  return (
    <div className="card h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {item.isVeg ? (
          <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            Veg
          </span>
        ) : (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            Non-Veg
          </span>
        )}
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
        <p className="text-gray-600 text-sm mb-2 flex-grow">{item.description}</p>
        
        <div className="flex justify-between items-center mt-auto">
          <span className="text-lg font-bold">₹{item.price.toFixed(2)}</span>
          <button 
            className={`btn-primary flex items-center justify-center ${isAdding ? 'opacity-75' : ''}`}
            onClick={handleAddToCart}
            disabled={isAdding}
          >
            {isAdding ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;