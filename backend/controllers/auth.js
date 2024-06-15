const express = require('express')
const User = require('../models/user')
const validateLoginInput = require('../Validation/login')
const validateRegisterInput = require('../Validation/registeration')
require('dotenv').config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// @route POST api/auth/login
// @desc Login user and return JWT token
// @   Public
const Login = ((req, res)=>{

  // Form validation
const { errors, isValid } = validateLoginInput(req.body);
// Check validation
  if (!isValid) {
    return res.status(404).json({errors : "Email invalid"});
  }
  const email = req.body.email;
  const password = req.body.password;

// Find user by email
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ errors : "Email not found" });
    }
// Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };
// Sign token
        jwt.sign(
          payload,
          "12345",
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
              name:user.name,
              email:user.email,
              role:user.role,
              id:user.id
            });
          }
        );
      } else {
        return res
          .status(404)
          .json({ errors: "Password incorrect" });
      }
    });
  });
});





const Loginadmin = ((req, res)=>{

  // Form validation
  console.log("inside login in backend");
const { errors, isValid } = validateLoginInput(req.body);
// Check validation
  if (!isValid) {
    return res.status(404).json({errors : "Email invalid"});
  }
  const email = req.body.email;
  const password = req.body.password;

// Find user by email
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ errors : "Email not found" });
    }

    if (user.role!="ROLE_ADMIN") {
      return res.status(404).json({ errors : "You are not admin" });
    }
    
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };
// Sign token
        jwt.sign(
          payload,
          "12345",
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
              name:user.name,
              email:user.email,
              role:user.role,
              id:user.id
            });
          }
        );
      } else {
        return res
          .status(404)
          .json({ errors: "Password incorrect" });
      }
    });
  });
});





const Register = async (req, res) => {

  console.log("inside signup in backend");
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  console.log("errors is",errors);

  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Create new user
    const newUser = new User({ name, email, password });

    // Hash password before saving in database
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    // Save user to database
    const registeredUser = await newUser.save();

    // Create JWT Payload
    const payload = { id: registeredUser.id, name: registeredUser.name };

    // Sign token
    const token = jwt.sign(payload, process.env.JWT_SECRET || '12345', {
      expiresIn: 31556926, // 1 year in seconds
    });

    // Respond with user data and token
    res.status(200).json({
      success: true,
      token: `Bearer ${token}`,
      user: {
        id: registeredUser.id,
        name: registeredUser.name,
        email: registeredUser.email,
        role: registeredUser.role,
      },
    });
  } catch (error) {
    res.status(400).json({ error: 'Your request could not be processed. Please try again.' });
  }
};
module.exports={Login,Register,Loginadmin}