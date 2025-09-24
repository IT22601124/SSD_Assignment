const express = require('express');
const helmet = require("helmet");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors  = require('cors');
require("dotenv").config(); 
const checkoutRouter = require("./routes/checkout");
const csurf = require("csurf");
const cookieParser = require("cookie-parser");

const port = process.env.PORT || 8080;
const mongo_url = process.env.MONGO_URL;

// Use Helmet to add various security headers, including disabling X-Powered-By
app.use(helmet());

app.use(cookieParser());

// CSRF protection middleware
const csrfProtection = csurf({ cookie: true });

// Apply CSRF protection to all routes
app.use(csrfProtection);

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

mongoose.connect(mongo_url, {});
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Database Connection Successful");
});

const productRouter = require("./routes/ProductRoute");
app.use("/product", productRouter);

const cartRouter = require("./routes/CartRoute");
app.use("/cart", cartRouter);

const buyerReqRouter = require("./routes/BuyerReqRoute");
app.use("/buyerReq", buyerReqRouter);


app.use("/checkout", checkoutRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});