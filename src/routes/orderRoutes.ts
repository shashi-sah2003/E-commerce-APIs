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

//Order for specific user
router.get("/user/:userId", async (req, res) => {
  try {
    const orders = await Order.findAll({ where: { userId: req.params.userId }, include: [Product] });
    res.status(200).json(orders);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});


//Users who bought a specific product
router.get("/product/:productId/users", async (req, res) => {
  try {
    const orders = await Order.findAll({ where: { productId: req.params.productId }, include: [User] });
    //const users = orders.map(order => order.userId);
    const users = 2
    res.status(200).json(users);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
