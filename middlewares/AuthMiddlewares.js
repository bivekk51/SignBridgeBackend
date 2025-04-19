const jwt = require('jsonwebtoken');
require('dotenv').config();

const SecretKey = process.env.JWT_SECRET_KEY;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

 
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token missing or invalid" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SecretKey);
    req.user = decoded;
    next(); 
  } catch (err) {
    console.error("JWT Error:", err);
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = verifyToken;
