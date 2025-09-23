const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require("dotenv").config(); 
const checkoutRouter = require("./routes/checkout");

const port = process.env.PORT || 8080
const mongo_url = process.env.MONGO_URL;

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:3000'
    ];
   
    if (!origin && process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    } 
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS policy'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'X-Requested-With',
    'Accept',
    'Origin'
  ], 
  credentials: true, 
  optionsSuccessStatus: 200, 
  maxAge: 86400 
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

mongoose.connect(mongo_url, {});
const connection = mongoose.connection; 

connection.once("open", () => {
  console.log("Database Connection Successful");
})

const productRouter = require("./routes/ProductRoute");
app.use("/product", productRouter);

const cartRouter = require("./routes/CartRoute");
app.use("/cart", cartRouter);

const buyerReqRouter = require("./routes/BuyerReqRoute");
app.use("/buyerReq", buyerReqRouter);

app.use("/checkout", checkoutRouter);

// Error handling middleware for CORS errors
app.use((err, req, res, next) => {
  if (err.message === 'Not allowed by CORS policy') {
    return res.status(403).json({
      error: 'CORS Error',
      message: 'Origin not allowed by CORS policy',
      origin: req.get('Origin') || 'Unknown'
    });
  }
  next(err);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})