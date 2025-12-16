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
      items,        
      subtotal,
      payment,      
      userId,
      shippingCost,
      total,
    } = req.body;

    console.log("Received order data:", req.body); // Debug log
    console.log("Items received:", items); // Debug log

    const order = await Order.create({
      userId: userId || null,
      contactEmail: email,
      shippingAddress,
      items: items || [],  
      subtotal,
      shippingCost: shippingCost || 0,
      total: total || subtotal,
      payment: {
        method: payment?.method || "PayPal",
        status: payment?.status || "Paid",
        paypalOrderId: payment?.transactionId,
        payerId: payment?.payerId,
        paidAt: payment?.paidAt || new Date(),
      },
    });

    console.log("Order created:", order); // Debug log
    res.status(201).json(order);
  } catch (error) {
    console.error("Order Error:", error);
    res.status(500).json({ message: "Failed to create order", error: error.message });
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
