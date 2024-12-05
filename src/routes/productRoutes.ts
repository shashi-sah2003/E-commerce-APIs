import express from "express";
import Product from "../models/Product";

const router = express.Router();

// Get total stock quantity for all products combined
router.get("/total-stock", async (req, res) => {
  try {
    const totalStock = await Product.sum("stock");
    res.status(200).json({ totalStock });
  } catch (err: any) {
    console.error("Error fetching total stock:", err);
    res.status(500).json({ error: err.message });
  }
});

//Create Product
router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({productId: product.id});
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Update Product
router.put("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      await product.update(req.body);
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

//Get the product 
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
