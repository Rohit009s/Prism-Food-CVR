import Food from '../models/Food.js';

// @desc    Get all foods
// @route   GET /api/foods
// @access  Public
export const getFoods = async (req, res) => {
  try {
    const category = req.query.category;
    const isVeg = req.query.isVeg === 'true';
    const search = req.query.search || '';
    
    let query = {};
    
    // Apply category filter if provided
    if (category && category !== 'all') {
      query.category = category;
    }
    
    // Apply vegetarian filter if provided
    if (req.query.isVeg) {
      query.isVeg = isVeg;
    }
    
    // Apply search filter if provided
    if (search) {
      query = {
        ...query,
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ]
      };
    }
    
    // Only show available items
    query.isAvailable = true;
    
    const foods = await Food.find(query).sort({ category: 1, name: 1 });
    
    res.json(foods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get food by ID
// @route   GET /api/foods/:id
// @access  Public
export const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    
    if (food) {
      res.json(food);
    } else {
      res.status(404).json({ message: 'Food not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a food
// @route   POST /api/foods
// @access  Private/Admin
export const createFood = async (req, res) => {
  try {
    const { name, description, price, image, category, isVeg } = req.body;
    
    const food = new Food({
      name,
      description,
      price,
      image,
      category,
      isVeg
    });
    
    const createdFood = await food.save();
    
    res.status(201).json(createdFood);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a food
// @route   PUT /api/foods/:id
// @access  Private/Admin
export const updateFood = async (req, res) => {
  try {
    const { name, description, price, image, category, isVeg, isAvailable } = req.body;
    
    const food = await Food.findById(req.params.id);
    
    if (food) {
      food.name = name || food.name;
      food.description = description || food.description;
      food.price = price || food.price;
      food.image = image || food.image;
      food.category = category || food.category;
      food.isVeg = isVeg !== undefined ? isVeg : food.isVeg;
      food.isAvailable = isAvailable !== undefined ? isAvailable : food.isAvailable;
      
      const updatedFood = await food.save();
      
      res.json(updatedFood);
    } else {
      res.status(404).json({ message: 'Food not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a food
// @route   DELETE /api/foods/:id
// @access  Private/Admin
export const deleteFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    
    if (food) {
      await food.deleteOne();
      res.json({ message: 'Food removed' });
    } else {
      res.status(404).json({ message: 'Food not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};