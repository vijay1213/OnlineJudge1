// routes/users.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys'); // You need to create this file and add your secret key
const User = require('../models/User');

const router = express.Router();

// Register route
router.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    User.findOne({ email }).then(user => {
        if (user) {
            return res.status(400).json({ email: 'Email already exists' });
        }

        const newUser = new User({ name, email, password });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
            });
        });
    });
});

// Login route
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email }).then(user => {
        if (!user) {
            return res.status(404).json({ email: 'Email not found' });
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = { id: user.id, name: user.name };

                jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                    res.json({ success: true, token: 'Bearer ' + token });
                });
            } else {
                return res.status(400).json({ password: 'Password incorrect' });
            }
        });
    });
});

module.exports = router;
