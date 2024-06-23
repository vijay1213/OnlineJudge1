// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  console.log("inside auth");
  const authHeader = req.headers.authorization;
  console.log("auth header usi ",authHeader);
  const token = authHeader && authHeader.split(' ')[2];


console.log("token is",token);

  if (!token) {
    return res.status(401).json({ error: 'Access denied, no token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded); // Make sure you have a JWT_SECRET in your environment variables
    req.user = decoded;
    console.log(req.user);
    next();
  } catch (err) {
    console.log("inside auth catch");
    res.status(403).json({ error: 'Invalid token.' });
  }
};

module.exports = authenticateToken;
