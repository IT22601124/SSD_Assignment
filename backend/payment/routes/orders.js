const { Order } = require("../models/Order");
const router = require("express").Router();
const sanitizeHtml = require("sanitize-html");
const { body, param, validationResult } = require("express-validator");

// router.post("/", async (req, res) => {
//   const newOrder = new Order(req.body);

//   try {
//     const savedOrder = await newOrder.save();
//     res.status(200).send(savedOrder);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

router.post(
  "/",
  body("orderDescription").isString().notEmpty().trim(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const sanitizedBody = {
      ...req.body,
      orderDescription: sanitizeHtml(req.body.orderDescription),
    };

    const newOrder = new Order(sanitizedBody);

    try {
      const savedOrder = await newOrder.save();
      res.status(200).send(savedOrder);
    } catch (err) {
      res.status(500).send({ error: "Unable to save order" });
    }
  }
);

//UPDATE
// router.put("/:id", async (req, res) => {
//   try {
//     const updatedOrder = await Order.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: req.body,
//       },
//       { new: true }
//     );
//     res.status(200).send(updatedOrder);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

router.put(
  "/:id",
  // Add validation rules for the input data here
  [
    param("id").isMongoId().withMessage("Invalid order ID"),
    body("orderDescription").optional().trim().escape(),
    body("amount").optional().isNumeric().withMessage("Amount must be a number"),
    body("userId").optional().isMongoId().withMessage("Invalid user ID"),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body, // Now sanitized and validated
        },
        { new: true }
      );
      
      if (!updatedOrder) {
        return res.status(404).json({ error: "Order not found" });
      }
      
      res.status(200).send(updatedOrder);
    } catch (err) {
      res.status(500).json({ error: "Unable to update order" });
    }
  }
);

//DELETE
// router.delete("/:id", async (req, res) => {
//   try {
//     await Order.findByIdAndDelete(req.params.id);
//     res.status(200).send("Order has been deleted...");
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

router.delete(
  "/:id",
  param("id").isMongoId().withMessage("Invalid order ID"),
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const deletedOrder = await Order.findByIdAndDelete(req.params.id);
      
      if (!deletedOrder) {
        return res.status(404).json({ error: "Order not found" });
      }
      
      res.status(200).json({ message: "Order has been deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: "Unable to delete order" });
    }
  }
);

//GET USER ORDERS
// router.get("/find/:userId", async (req, res) => {
//   try {
//     const orders = await Order.find({ userId: req.params.userId });
//     res.status(200).send(orders);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

router.get(
  "/find/:userId",
  // Validation rule for userId, assuming it should be a valid MongoDB ObjectId
  param("userId").isMongoId().withMessage("Invalid user ID"),
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const orders = await Order.find({ userId: req.params.userId });
      res.status(200).send(orders);
    } catch (err) {
      res.status(500).json({ error: "Unable to retrieve orders" });
    }
  }
);

//GET ALL ORDERS
// router.get("/", async (req, res) => {
//   try {
//     const orders = await Order.find();
//     res.status(200).send(orders);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).send(orders);
  } catch (err) {
    res.status(500).json({ error: "Unable to retrieve orders" });
  }
});

// GET MONTHLY INCOME
// router.get("/income", async (req, res) => {
//   const date = new Date();
//   const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
//   const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

//   try {
//     const income = await Order.aggregate([
//       { $match: { createdAt: { $gte: previousMonth } } },
//       {
//         $project: {
//           month: { $month: "$createdAt" },
//           sales: "$amount",
//         },
//       },
//       {
//         $group: {
//           _id: "$month",
//           total: { $sum: "$sales" },
//         },
//       },
//     ]);
//     res.status(200).send(income);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

router.get("/income", async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).send(income);
  } catch (err) {
    res.status(500).json({ error: "Unable to retrieve income data" });
  }
});

module.exports = router;
