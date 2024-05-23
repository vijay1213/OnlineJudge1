// middleware/auth.js
const jwt = require('jsonwebtoken');
const keys = require('../config/keys'); // Correct path to keys.js

module.exports = function(req, res, next) {
    const token = req.header('Authorization');

    // Check for token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token.split(' ')[1], keys.secretOrKey);
        // Add user from payload
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).json({ msg: 'Token is not valid' });
    }
};
