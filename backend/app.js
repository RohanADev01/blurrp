// app.js
const express = require('express');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();
require('./config/passportConfig');

const app = express();

const crypto = require('crypto');
const secret = crypto.randomBytes(32).toString('hex');

// Middleware
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || secret,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
const authRoutes = require('./routes/authRoutes');

app.use('/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
