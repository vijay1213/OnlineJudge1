require('dotenv').config(); // Load environment variables from .env file

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    console.log('MongoDB URI:', process.env.MONGODB_URI);

    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Add other options as needed
    });

    console.log('MongoDB connected...');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
