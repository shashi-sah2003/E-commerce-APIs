import express from "express";
import Order from "../models/Order";
import { Op } from "sequelize";
import Product from "../models/Product";
import User from "../models/User";

const router = express.Router();

//Create Order
router.post("/", async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order.id);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

//Update order
router.put("/:id", async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (order) {
      await order.update(req.body);
      res.status(200).json(order);
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Get Order Details
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, { include: [User, Product] });
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});


// Get orders of a specific user
router.get("/:userId/orders", async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch the orders of the user
    const userWithOrders = await User.findByPk(userId, {
      include: {
        model: Order,
        include: [Product], // Include associated Product details
      },
    });

    if (!userWithOrders) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(userWithOrders);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
