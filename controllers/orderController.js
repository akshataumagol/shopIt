const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { createOrder, captureOrder } = require('../utils/paypal');

exports.createOrder = async (req, res) => {
  try {
    const { shippingAddress } = req.body;
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart || cart.items.length === 0) return res.status(400).json({ message: 'Cart empty' });
    const items = cart.items.map(i => ({ product: i.product._id, name: i.product.title, image: i.product.images[0] || '', price: i.product.price, qty: i.qty }));
    const total = items.reduce((s, it) => s + it.price * it.qty, 0);
    const order = await Order.create({ user: req.user._id, items, shippingAddress, total });
    // create paypal order
    const paypal = await createOrder(total, 'USD');
    res.status(201).json({ order, paypal });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.capture = async (req, res) => {
  try {
    const { orderId } = req.params; // paypal order id
    const capture = await captureOrder(orderId);
    // payload contains purchase_units -> payments
    // The client should also send our internal order id to match; for demo we leave simple
    res.json({ capture });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Not found' });
    if (order.user.toString() !== req.user._id.toString() && !req.user.isAdmin) return res.status(403).json({ message: 'Forbidden' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.adminList = async (req, res) => {
  try {
    const orders = await Order.find().populate('user');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Not found' });
    order.status = req.body.status || order.status;
    if (req.body.isPaid) {
      order.isPaid = true;
      order.paidAt = Date.now();
    }
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
