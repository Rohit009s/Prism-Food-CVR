import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['biryani', 'rice', 'curry', 'bread', 'noodles', 'meals', 'snacks', 'beverages']
  },
  isVeg: {
    type: Boolean,
    required: true,
    default: false
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Food = mongoose.model('Food', foodSchema);

export default Food;