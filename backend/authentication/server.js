require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const userRoutes = require('./routes/user')
const authRoutes = require('./routes/authRoutes');

//express app
const app = express();

app.use(express.json())
app.use(helmet());
app.use(cookieParser());

// Session (MemoryStore OK only for dev)
app.use(session({
  name: 'sid',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: false 
  }
}));

app.use((req,res,next)=>{
    next()
})

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
