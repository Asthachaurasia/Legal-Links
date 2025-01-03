const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

// Debugging: Log the connection string
console.log("Connecting to MongoDB using URI:", process.env.DB_URL);

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("MongoDB connection established successfully.");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
