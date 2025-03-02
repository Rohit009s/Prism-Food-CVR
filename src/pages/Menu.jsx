import { useState, useEffect } from 'react';
import FoodItem from '../components/menu/FoodItem';
import { FaSearch } from 'react-icons/fa';

// Temporary food data (will be replaced with API call)
const foodData = [
  {
    _id: '1',
    name: 'Chicken Biryani',
    description: 'Fragrant basmati rice cooked with tender chicken pieces and aromatic spices.',
    price: 120,
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    category: 'biryani',
    isVeg: false
  },
  {
    _id: '2',
    name: 'Mutton Biryani',
    description: 'Aromatic basmati rice layered with tender mutton pieces and traditional spices.',
    price: 160,
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'biryani',
    isVeg: false
  },
  {
    _id: '3',
    name: 'Veg Biryani',
    description: 'Flavorful basmati rice cooked with mixed vegetables and aromatic spices.',
    price: 100,
    image: 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'biryani',
    isVeg: true
  },
  {
    _id: '4',
    name: 'Egg Fried Rice',
    description: 'Stir-fried rice with scrambled eggs, vegetables, and soy sauce.',
    price: 90,
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80',
    category: 'rice',
    isVeg: false
  },
  {
    _id: '5',
    name: 'Chapati (2 pcs)',
    description: 'Soft whole wheat flatbread, perfect with curry or dal.',
    price: 30,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1371&q=80',
    category: 'bread',
    isVeg: true
  },
  {
    _id: '6',
    name: 'Chicken Curry',
    description: 'Tender chicken pieces cooked in a rich and spicy gravy.',
    price: 110,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'curry',
    isVeg: false
  },
  {
    _id: '7',
    name: 'Paneer Butter Masala',
    description: 'Cottage cheese cubes in a creamy tomato-based gravy.',
    price: 120,
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    category: 'curry',
    isVeg: true
  },
  {
    _id: '8',
    name: 'Veg Noodles',
    description: 'Stir-fried noodles with mixed vegetables and soy sauce.',
    price: 80,
    image: 'https://images.unsplash.com/photo-1645696301019-35adcc18fc22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1373&q=80',
    category: 'noodles',
    isVeg: true
  },
  {
    _id: '9',
    name: 'South Indian Meals',
    description: 'Complete meal with rice, sambar, rasam, vegetables, and curd.',
    price: 120,
    image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f72e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1429&q=80',
    category: 'meals',
    isVeg: true
  },
  {
    _id: '10',
    name: 'Masala Tea',
    description: 'Traditional Indian tea with milk and aromatic spices.',
    price: 20,
    image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    category: 'beverages',
    isVeg: true
  },
  {
    _id: '11',
    name: 'Mango Juice',
    description: 'Refreshing juice made from fresh mangoes.',
    price: 40,
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    category: 'beverages',
    isVeg: true
  },
  {
    _id: '12',
    name: 'Chicken Frankie',
    description: 'Spiced chicken filling wrapped in a thin flatbread.',
    price: 70,
    image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=722&q=80',
    category: 'snacks',
    isVeg: false
  }
];

const categories = [
  { id: 'all', name: 'All Items' },
  { id: 'biryani', name: 'Biryani' },
  { id: 'rice', name: 'Rice' },
  { id: 'curry', name: 'Curry' },
  { id: 'bread', name: 'Bread' },
  { id: 'noodles', name: 'Noodles' },
  { id: 'meals', name: 'Meals' },
  { id: 'snacks', name: 'Snacks' },
  { id: 'beverages', name: 'Beverages' }
];

const Menu = () => {
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call with a delay
    const fetchFoods = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          setFoods(foodData);
          setFilteredFoods(foodData);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching food data:', error);
        setLoading(false);
      }
    };
    
    fetchFoods();
  }, []);
  
  useEffect(() => {
    // Filter foods based on category, search query, and veg preference
    let result = [...foods];
    
    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(food => food.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(food => 
        food.name.toLowerCase().includes(query) || 
        food.description.toLowerCase().includes(query)
      );
    }
    
    // Filter by veg preference
    if (vegOnly) {
      result = result.filter(food => food.isVeg);
    }
    
    setFilteredFoods(result);
  }, [foods, selectedCategory, searchQuery, vegOnly]);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Menu</h1>
      
      {/* Search and Filter Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          {/* Search Bar */}
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search for food..."
              className="input-field pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          
          {/* Veg Only Toggle */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="vegOnly"
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              checked={vegOnly}
              onChange={() => setVegOnly(!vegOnly)}
            />
            <label htmlFor="vegOnly" className="ml-2 text-sm text-gray-700">
              Vegetarian Only
            </label>
          </div>
        </div>
        
        {/* Category Tabs */}
        <div className="flex overflow-x-auto pb-2 hide-scrollbar">
          <div className="flex space-x-2">
            {categories.map(category => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Food Items Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : filteredFoods.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFoods.map(food => (
            <FoodItem key={food._id} item={food} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No food items found matching your criteria.</p>
          <button
            className="mt-4 btn-secondary"
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
              setVegOnly(false);
            }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;