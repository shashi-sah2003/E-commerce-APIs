import express from "express";
import Order from "../models/Order";
import { Sequelize } from "sequelize";
import sequelize from "../db";
import { Op } from "sequelize";
import Product from "../models/Product";
import User from "../models/User";

const router = express.Router();

//  Get orders placed in the last 7 days
router.get("/recent", async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentOrders = await Order.findAll({
      where: {
        orderDate: {
          [Op.gte]: sevenDaysAgo,
        },
      },
      attributes: ['id', 'quantity', 'orderDate'],
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Product,
          attributes: ['name', 'category', 'price'],
        },
      ],
    });

    res.status(200).json(recentOrders);
  } catch (err: any) {
    console.error("Error fetching recent orders:", err);
    res.status(500).json({ error: err.message });
  }
});

//Create Order
router.post("/", async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { userId, productId, quantity } = req.body;

    // Fetch the product
    const product = await Product.findByPk(productId, { transaction });

    if (!product) {
      await transaction.rollback();
      return res.status(404).json({ error: "Product not found" });
    }

    // Check if there is enough stock
    if (product.stock < quantity) {
      await transaction.rollback();
      return res.status(400).json({ error: "Insufficient stock" });
    }

    // Update the product stock
    product.stock -= quantity;
    await product.save({ transaction });

    // Create the order
    const order = await Order.create(
      { userId, productId, quantity, orderDate: new Date() },
      { transaction }
    );

    await transaction.commit();
    res.status(201).json(order.id);
  } catch (err: any) {
    await transaction.rollback();
    console.error("Error creating order:", err);
    res.status(500).json({ error: err.message });
  }
});

// Get users who bought a specific product
router.get('/product/:productId/users', async (req, res) => {
  try {
    const { productId } = req.params;

    const orders = await Order.findAll({
      where: { productId },
      attributes: ['userId'], 
    });

    // Extract unique userIds
    const userIds = [...new Set(orders.map(order => order.userId))];

    if (userIds.length === 0) {
      return res.status(200).json([]); // No users found
    }

    // Fetch user details using the unique userIds
    const users = await User.findAll({
      where: {
        id: {
          [Op.in]: userIds,
        },
      },
      attributes: ['name', 'email', 'phone'],
    });

    res.status(200).json(users);
  } catch (err: any) {
    console.error("Error fetching users who bought the product:", err);
    res.status(500).json({ error: err.message });
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
