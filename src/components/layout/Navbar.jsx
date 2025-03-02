import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const location = useLocation();
  
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  const isActive = (path) => {
    return location.pathname === path ? 'text-primary font-semibold' : 'text-dark hover:text-primary';
  };
  
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center" onClick={closeMenu}>
              <span className="text-2xl font-bold text-primary">Prism Canteen By CVR (Rohit)</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link to="/" className={`${isActive('/')} transition-colors duration-200`}>Home</Link>
            <Link to="/menu" className={`${isActive('/menu')} transition-colors duration-200`}>Menu</Link>
            <Link to="/order-history" className={`${isActive('/order-history')} transition-colors duration-200`}>Order History</Link>
            <Link to="/cart" className="relative">
              <FaShoppingCart className="text-2xl text-dark hover:text-primary transition-colors duration-200" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
          
          {/* Mobile Navigation Button */}
          <div className="flex md:hidden items-center">
            <Link to="/cart" className="mr-4 relative">
              <FaShoppingCart className="text-2xl text-dark" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-dark hover:text-primary focus:outline-none"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            <Link 
              to="/" 
              className={`${isActive('/')} block px-3 py-2 rounded-md text-base font-medium`}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link 
              to="/menu" 
              className={`${isActive('/menu')} block px-3 py-2 rounded-md text-base font-medium`}
              onClick={closeMenu}
            >
              Menu
            </Link>
            <Link 
              to="/order-history" 
              className={`${isActive('/order-history')} block px-3 py-2 rounded-md text-base font-medium`}
              onClick={closeMenu}
            >
              Order History
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;