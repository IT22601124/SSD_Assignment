require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const userRoutes = require('./routes/user')
const authRoutes = require('./routes/authRoutes');

//express app
const app = express();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.json())
app.use(helmet());
app.use(cookieParser());

// Session (MemoryStore OK only for dev)
app.use(session({
  name: 'connect.sid', // Standard session cookie name
  secret: process.env.SESSION_SECRET || 'your-secret-key-here',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: false, // Set to true in production with HTTPS
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Debug middleware to log session info
app.use((req, res, next) => {
  console.log('Session ID:', req.sessionID);
  console.log('Session data:', req.session);
  console.log('Request path:', req.path);
  next();
});

app.use('/auth', authRoutes);
app.use("/api/user", userRoutes);


mongoose
  .connect(
    "mongodb+srv://tharindu:YZTUsJE4dcnHjtTk@cluster0.909u4.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(4000, () => {
        console.log("this app listen on port 4000");
        console.log("this app connect to the database");
      });    
  })
  .catch((error) => {
    console.log(error);
  });

// listen for request
