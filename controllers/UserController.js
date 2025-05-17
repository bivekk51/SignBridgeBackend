const User=require("../models/UserModels")
const jwt = require('jsonwebtoken');
const bcrypt=require('bcrypt')
require('dotenv').config();

const SecretKey=process.env.JWT_SECRET_KEY
const createNewUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    
    const hashedPassword = bcrypt.hashSync(password, 10); 

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllUser=async(req,res)=>{
  try{
    const users = await User.find({}).select('-password');
    return res.status(200).json(users)
  }catch(err){
    console.error(err)
    return res.status(500).json({message:"Failed to retrieve"})
  }
}
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email' });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, SecretKey, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const toggleUserRole = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

   
    user.role = user.role === 'admin' ? 'user' : 'admin';

    await user.save();

    res.status(200).json({ message: 'User role updated successfully', user });
  } catch (err) {
    console.error("Role update error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const adminUser = await User.findOne({ email, role: 'admin' });
    if (!adminUser) {
      return res.status(401).json({ message: 'Access denied. Not an admin or invalid email.' });
    }

    const isMatch = bcrypt.compareSync(password, adminUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: adminUser._id, role: adminUser.role }, SecretKey, { expiresIn: "1h" });

    res.status(200).json({ message: 'Admin login successful', token });
  } catch (err) {
    console.error('Admin login error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};



  module.exports = {
    createNewUser,
    login,
    getAllUser,
    toggleUserRole,
    adminLogin
  };