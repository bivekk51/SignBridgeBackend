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
    const token=jwt.sign({id:user._id},SecretKey,{expiresIn:"1h"})
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

  module.exports = {
    createNewUser,
    login,
  };