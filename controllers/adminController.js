const Category = require('../models/Category');
const User = require('../models/User');

exports.createCategory = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const cat = await Category.create({ name, parent: parent || null });
    res.status(201).json(cat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.listCategories = async (req, res) => {
  try {
    const cats = await Category.find();
    res.json(cats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.listUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
