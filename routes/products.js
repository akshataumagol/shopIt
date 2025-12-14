const express = require('express');
const Product = require('../models/Product'); // Your Mongoose Product model
const router = express.Router();

// GET ALL PRODUCTS
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error("Server error fetching all products:", err);
    res.status(500).json({ message: 'Server error fetching products' });
  }
});

// GET PRODUCT BY ID
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error("Server error fetching product by ID:", err);
    res.status(500).json({ message: 'Server error fetching product' });
  }
});

// GET PRODUCTS BY CATEGORY AND OPTIONAL SUBCATEGORY
router.get('/products/:category/:subCategory?', async (req, res) => {
  const { category, subCategory } = req.params;
  console.log("Fetching products for category:", category, "subCategory:", subCategory);

  try {
    const query = {};
    if (category) query.category = category;
    if (subCategory) query.subCategory = subCategory;

    const products = await Product.find(query);

    console.log("Products found:", products.length);

    if (!products.length) {
      return res.status(404).json({ message: 'No products found' });
    }

    res.json(products);
  } catch (err) {
    console.error("Server error fetching products by category:", err);
    res.status(500).json({ message: 'Server error fetching products' });
  }
});

module.exports = router;
