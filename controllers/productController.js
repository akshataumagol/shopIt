const Product = require('../models/Product');
const Category = require('../models/Category');

exports.list = async (req, res) => {
  try {
    const { category, subcategory, search, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (category) {
      const cat = await Category.findOne({ name: category });
      if (cat) filter.categories = cat._id;
    }
    if (subcategory) {
      const sub = await Category.findOne({ name: subcategory });
      if (sub) filter.categories = sub._id;
    }
    if (search) filter.title = { $regex: search, $options: 'i' };
    const products = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('categories');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.get = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('categories');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { title, description, price, categories, stock } = req.body;
    const images = req.files ? req.files.map(f => f.path) : [];
    const prod = await Product.create({ title, description, price, categories, images, stock });
    res.status(201).json(prod);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const prod = await Product.findById(req.params.id);
    if (!prod) return res.status(404).json({ message: 'Product not found' });
    const { title, description, price, categories, stock } = req.body;
    if (title) prod.title = title;
    if (description) prod.description = description;
    if (price) prod.price = price;
    if (categories) prod.categories = categories;
    if (stock !== undefined) prod.stock = stock;
    if (req.files && req.files.length) prod.images = req.files.map(f => f.path);
    prod.updatedAt = Date.now();
    await prod.save();
    res.json(prod);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
