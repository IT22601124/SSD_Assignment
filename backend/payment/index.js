const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const orders = require("./routes/orders");
const stripe = require("./routes/stripe");
const helmet = require("helmet");
const csurf = require("csurf");
const cookieParser = require("cookie-parser");

const products = require("./products");

const app = express();

// Use Helmet to add various security headers, including disabling X-Powered-By
app.use(helmet());

// app.use(cookieParser());

// // CSRF protection middleware
// const csrfProtection = csurf({ cookie: true });

// // Apply CSRF protection to all routes
// app.use(csrfProtection);

require("dotenv").config();

app.use(express.json());
app.use(cors());


app.use("/api/orders", orders);
app.use("/api/stripe", stripe);

app.get("/", (req, res) => {
  res.send("Welcome our to online shop API...");
});

app.get("/products", (req, res) => {
  res.send(products);
});

const uri = process.env.DB_URI;
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}...`);
});

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection established..."))
  .catch((error) => console.error("MongoDB connection failed:", error.message));
