"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Order_1 = __importDefault(require("../models/Order"));
const db_1 = __importDefault(require("../db"));
const sequelize_1 = require("sequelize");
const Product_1 = __importDefault(require("../models/Product"));
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
//  Get orders placed in the last 7 days
router.get("/recent", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const recentOrders = yield Order_1.default.findAll({
            where: {
                orderDate: {
                    [sequelize_1.Op.gte]: sevenDaysAgo,
                },
            },
            attributes: ['id', 'quantity', 'orderDate'],
            include: [
                {
                    model: User_1.default,
                    attributes: ['name'],
                },
                {
                    model: Product_1.default,
                    attributes: ['name', 'category', 'price'],
                },
            ],
        });
        res.status(200).json(recentOrders);
    }
    catch (err) {
        console.error("Error fetching recent orders:", err);
        res.status(500).json({ error: err.message });
    }
}));
//Create Order
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield db_1.default.transaction();
    try {
        const { userId, productId, quantity } = req.body;
        // Fetch the product
        const product = yield Product_1.default.findByPk(productId, { transaction });
        if (!product) {
            yield transaction.rollback();
            return res.status(404).json({ error: "Product not found" });
        }
        // Check if there is enough stock
        if (product.stock < quantity) {
            yield transaction.rollback();
            return res.status(400).json({ error: "Insufficient stock" });
        }
        // Update the product stock
        product.stock -= quantity;
        yield product.save({ transaction });
        // Create the order
        const order = yield Order_1.default.create({ userId, productId, quantity, orderDate: new Date() }, { transaction });
        yield transaction.commit();
        res.status(201).json(order.id);
    }
    catch (err) {
        yield transaction.rollback();
        console.error("Error creating order:", err);
        res.status(500).json({ error: err.message });
    }
}));
// Get users who bought a specific product
router.get('/product/:productId/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const orders = yield Order_1.default.findAll({
            where: { productId },
            attributes: ['userId'],
        });
        // Extract unique userIds
        const userIds = [...new Set(orders.map(order => order.userId))];
        if (userIds.length === 0) {
            return res.status(200).json([]); // No users found
        }
        // Fetch user details using the unique userIds
        const users = yield User_1.default.findAll({
            where: {
                id: {
                    [sequelize_1.Op.in]: userIds,
                },
            },
            attributes: ['name', 'email', 'phone'],
        });
        res.status(200).json(users);
    }
    catch (err) {
        console.error("Error fetching users who bought the product:", err);
        res.status(500).json({ error: err.message });
    }
}));
//Update order
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield Order_1.default.findByPk(req.params.id);
        if (order) {
            yield order.update(req.body);
            res.status(200).json(order);
        }
        else {
            res.status(404).json({ error: "Order not found" });
        }
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
}));
// Get Order Details
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield Order_1.default.findByPk(req.params.id, { include: [User_1.default, Product_1.default] });
        if (order) {
            res.status(200).json(order);
        }
        else {
            res.status(404).json({ error: "Order not found" });
        }
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
// Get orders of a specific user
router.get("/:userId/orders", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        // Fetch the orders of the user
        const userWithOrders = yield User_1.default.findByPk(userId, {
            include: {
                model: Order_1.default,
                include: [Product_1.default], // Include associated Product details
            },
        });
        if (!userWithOrders) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(userWithOrders);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
exports.default = router;
