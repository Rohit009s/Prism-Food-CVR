import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// @desc    Auth admin & get token
// @route   POST /api/admin/login
// @access  Public
export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find admin by username
    const admin = await Admin.findOne({ username });
    
    // Check if admin exists and password matches
    if (admin && (await admin.matchPassword(password))) {
      res.json({
        _id: admin._id,
        name: admin.name,
        username: admin.username,
        role: admin.role,
        token: generateToken(admin._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Register a new admin
// @route   POST /api/admin/register
// @access  Private/Admin
export const registerAdmin = async (req, res) => {
  try {
    const { name, username, password, role } = req.body;
    
    // Check if admin already exists
    const adminExists = await Admin.findOne({ username });
    
    if (adminExists) {
      res.status(400).json({ message: 'Admin already exists' });
      return;
    }
    
    // Create new admin
    const admin = await Admin.create({
      name,
      username,
      password,
      role: role || 'staff'
    });
    
    if (admin) {
      res.status(201).json({
        _id: admin._id,
        name: admin.name,
        username: admin.username,
        role: admin.role,
        token: generateToken(admin._id)
      });
    } else {
      res.status(400).json({ message: 'Invalid admin data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get admin profile
// @route   GET /api/admin/profile
// @access  Private
export const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select('-password');
    
    if (admin) {
      res.json(admin);
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update admin profile
// @route   PUT /api/admin/profile
// @access  Private
export const updateAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id);
    
    if (admin) {
      admin.name = req.body.name || admin.name;
      admin.username = req.body.username || admin.username;
      
      if (req.body.password) {
        admin.password = req.body.password;
      }
      
      const updatedAdmin = await admin.save();
      
      res.json({
        _id: updatedAdmin._id,
        name: updatedAdmin.name,
        username: updatedAdmin.username,
        role: updatedAdmin.role,
        token: generateToken(updatedAdmin._id)
      });
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all admins
// @route   GET /api/admin
// @access  Private/Admin
export const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({}).select('-password');
    res.json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete admin
// @route   DELETE /api/admin/:id
// @access  Private/Admin
export const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    
    if (admin) {
      await admin.deleteOne();
      res.json({ message: 'Admin removed' });
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};