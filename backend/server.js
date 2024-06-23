const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const session = require('express-session'); // Import express-session
const routes = require('./routes');
const connectDatabase = require("./config/Dadabase"); // Corrected spelling from Dadabase to Database
const indexRoutes = require('./routes/index');

const app = express();

// Connect to database
connectDatabase();

// Configure express-session middleware
app.use(session({
  secret: 'your-secret-key', // Replace with your secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Enable CORS with credentials
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// Routes
app.use(routes);
app.use('/', indexRoutes);

// Logout endpoint
app.post('/api/auth/logout', (req, res) => {
  if (req.session) {
    // Destroy the session
    req.session.destroy(err => {
      if (err) {
        return res.status(500).send({ message: 'Failed to log out' });
      }
      res.clearCookie('connect.sid', { path: '/' });
      return res.status(200).send({ message: 'Logged out successfully' });
    });
  } else {
    return res.status(200).send({ message: 'No active session' });
  }
});

// Start the server
app.listen(8080, () => {
  console.log("Server running on Port:", 8080);
});
