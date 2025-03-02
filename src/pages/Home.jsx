import { Link } from 'react-router-dom';
import { FaUtensils, FaClock, FaMobileAlt } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-dark text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div 
          className="relative h-96 bg-cover bg-center flex items-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')" 
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Prism Canteen BY CVR ,Created by Rohit Neelam</h1>
            <p className="text-xl md:text-2xl mb-8">Skip the line, order online!hehe!!</p>
            <Link to="/menu" className="btn-primary text-lg px-8 py-3">
              Order Now saami
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Prism Canteen?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary text-white mb-4">
                <FaUtensils className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Delicious Food! ummmm </h3>
              <p className="text-gray-600">
                Enjoy a variety of tasty meals prepared fresh daily by our experienced chefs.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary text-white mb-4">
                <FaClock className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Save Time! Jaldi karoooo</h3>
              <p className="text-gray-600">
                Skip the long queues by pre-ordering your food and picking it up when it's ready.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary text-white mb-4">
                <FaMobileAlt className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Ordering! Em Prabha thinnava?? </h3>
              <p className="text-gray-600">
                Our user-friendly platform makes ordering food quick and hassle-free.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white text-xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Browse Menu ! Khana Khazana</h3>
              <p className="text-gray-600">
                Explore our wide range of delicious food items and add your favorites to cart.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="relative">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white text-xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Place Order</h3>
              <p className="text-gray-600">
                Review your cart, select pickup time, and complete payment securely.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="relative">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white text-xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Pickup Food</h3>
              <p className="text-gray-600">
                Receive notification when your order is ready and pick it up from the canteen.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/menu" className="btn-primary text-lg px-6 py-2">
              Start Ordering ! Kani Kani
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;