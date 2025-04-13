const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes.js');
const connectDb = require("./config/dbconnection.js");
const transactionRoutes = require('./routes/transactionRoutes');


// MongoDB Connection
connectDb();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes); // ✅ This uses your ROUTES
app.use('/api/transactions', transactionRoutes);

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to Smart Personal Finance Tracker API!');
});


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
