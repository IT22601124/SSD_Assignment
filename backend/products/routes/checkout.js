const express = require("express");

const router = express.Router();

const stripe = require("stripe")(

  "sk_test_51MxnUfIr55hAMMKQLxFCiGbaVy4gofEfsDFaiO8Le0TPSTqwlaVXTXdoau4xr0DegUzSSDuDUJWZr8PpaYGWzu3N008ZjqTtjz"

); // Replace with your actual Stripe secret API key




router.post("/", async (req, res) => {

  try {

    const { token, amount } = req.body;




    // Create a charge with the token and amount

    const charge = await stripe.charges.create({

      amount,

      currency: "usd",

      description: "Payment for cart items",

      source: token.id,

    });




    // Handle the payment success logic

    console.log(charge);

    res.status(200).json({ message: "Payment succeeded" });

  } catch (error) {

    console.log(error);

    res.status(500).json({ message: "Payment failed" });

  }

});




module.exports = router;