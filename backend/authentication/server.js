const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const userRoutes = require('./routes/user')

//express app
const app = express();

// Use Helmet to add various security headers, including disabling X-Powered-By
app.use(helmet());

app.use(express.json())

app.use((req,res,next)=>{
    //console.log(req.path,req.method)
    next()
})

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
