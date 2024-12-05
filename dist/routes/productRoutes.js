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
const Product_1 = __importDefault(require("../models/Product"));
const router = express_1.default.Router();
// Get total stock quantity for all products combined
router.get("/total-stock", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalStock = yield Product_1.default.sum("stock");
        res.status(200).json({ totalStock });
    }
    catch (err) {
        console.error("Error fetching total stock:", err);
        res.status(500).json({ error: err.message });
    }
}));
//Create Product
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield Product_1.default.create(req.body);
        res.status(201).json({ productId: product.id });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
}));
// Update Product
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield Product_1.default.findByPk(req.params.id);
        if (product) {
            yield product.update(req.body);
            res.status(200).json(product);
        }
        else {
            res.status(404).json({ error: "Product not found" });
        }
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
}));
//Get the product 
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield Product_1.default.findByPk(req.params.id);
        if (product) {
            res.status(200).json(product);
        }
        else {
            res.status(404).json({ error: "Product not found" });
        }
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
exports.default = router;
