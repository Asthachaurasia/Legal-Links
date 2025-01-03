// // index.js
 

require('dotenv').config();
const express = require('express');
const connectDB = require('./db/db.config');
const authRoutes = require('./routes/auth.routes');
const categoryRoutes = require('./routes/category.routes');
const lawyerRoutes = require('./routes/lawyer.routes');
const conversation = require('./routes/conversation.routes');
const message = require('./routes/message.routes');

const cors= require('cors');
const app = express();

// Connect to MongoDB
connectDB(); // No need to pass process.env.DB_URL

// Middleware

app.use(express.json());
app.use(cors());


// Use authentication routes
app.use('/auth', authRoutes);
app.use('/category',categoryRoutes);
app.use('/lawyer', lawyerRoutes);
app.use('/conversation', conversation);
app.use('/message', message);


// Test route
app.get('/', (req, res) => {
  res.send('Server is up and running');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
