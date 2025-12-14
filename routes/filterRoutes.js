// routes/filterRoutes.js
const express = require("express");
const router = express.Router();
const Product = require("../models/Product"); // Your product model

// GET filter options for a category and subcategory
router.get("/:category/:subCategory", async (req, res) => {
  try {
    const { category, subCategory } = req.params;

    // Find products in category/subCategory
    const products = await Product.find({ category, subCategory });

    if (!products.length) return res.status(404).json({ message: "No products found" });

    // Extract unique filter options
    const colors = [...new Set(products.flatMap(p => p.colors || []))];
    const sizes = [...new Set(products.flatMap(p => p.sizes || []))];
    const brands = [...new Set(products.map(p => p.brand))];
    const prices = products.map(p => p.price);

    res.json({
      colors,
      sizes,
      brands,
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
