/*const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const { createOrder, capture, getMyOrders, getOrder, adminList, updateStatus } = require('../controllers/orderController');

router.post('/', protect, createOrder);
router.post('/paypal/capture/:orderId', protect, capture);
router.get('/my', protect, getMyOrders);
router.get('/:id', protect, getOrder);

// admin
router.get('/', protect, admin, adminList);
router.put('/:id/status', protect, admin, updateStatus);

module.exports = router;*/
const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

// Create Order
router.post("/", async (req, res) => {
  try {
    const {
      email,
      shippingAddress,
      cart,
      subtotal,
      paymentDetails,
      userId,
    } = req.body;

    const order = await Order.create({
      userId: userId || null,
      contactEmail: email,
      shippingAddress,
      items: cart,
      subtotal,
      shippingCost: 0,
      total: subtotal,
      payment: {
        method: "PayPal",
        status: "Paid",
        paypalOrderId: paymentDetails?.id,
        payerId: paymentDetails?.payer?.payer_id,
        paidAt: new Date(),
      },
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("Order Error:", error);
    res.status(500).json({ message: "Failed to create order" });
  }
});

// Get single order by ID
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (error) {
    console.error("Get Order Error:", error);
    res.status(500).json({ message: "Failed to fetch order" });
  }
});

module.exports = router;
