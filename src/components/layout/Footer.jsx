import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Prism Canteen</h3>
            <p className="text-gray-300">
              Serving delicious meals to CVR College students and staff. Order online and skip the queue!
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/menu" className="text-gray-300 hover:text-primary transition-colors">Menu</Link>
              </li>
              <li>
                <Link to="/order-history" className="text-gray-300 hover:text-primary transition-colors">Order History</Link>
              </li>
              <li>
                <Link to="/admin/login" className="text-gray-300 hover:text-primary transition-colors">Admin Login</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="text-gray-300 mb-2">Prism Canteen, CVR College of Engineering</p>
            <p className="text-gray-300 mb-2">Vastunagar, Mangalpalli (V), Ibrahimpatnam (M)</p>
            <p className="text-gray-300 mb-4">Rangareddy (D), Telangana 501510</p>
            
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <FaFacebook className="text-xl" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <FaInstagram className="text-xl" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-300">
            &copy; {currentYear} Prism Canteen, CVR College. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;