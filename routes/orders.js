// routes/orders.js
const express = require("express");
const mongoose = require("mongoose");
const Order = require("../models/Order");
const sendEmail = require("../utils/sendEmail");
const orderEmailTemplate = require("../utils/orderEmailTemplate");

const router = express.Router();

// TEST EMAIL
router.get("/test-email", async (req, res) => {
  try {
    await sendEmail({
      to: "akshumagol2000@gmail.com",
      subject: "ShopIt Test Email",
      html: "<h2>Email system working ✅</h2>",
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// CREATE ORDER
router.post("/", async (req, res) => {
  try {
    const { email, shippingAddress, cart, subtotal, paymentDetails } = req.body;

    if (!email || !cart || !cart.length) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    const order = await Order.create({
      contactEmail: email,
      shippingAddress,
      items: cart,
      subtotal,
      shippingCost: 0,
      total: subtotal,
      payment: {
        method: "PayPal",
        status: "Paid",
        paypalOrderId: paymentDetails?.id || "",
        payerId: paymentDetails?.payer?.payer_id || "",
        paidAt: new Date(),
      },
    });

    console.log("✅ ORDER CREATED:", order._id);

    // Send customer email
    await sendEmail({
      to: email,
      subject: "Your ShopIt Order Confirmation",
      html: orderEmailTemplate(order),
    });

    // Send admin email
    await sendEmail({
      to: "akshumagol2000@gmail.com",
      subject: `New Order #${order._id}`,
      html: orderEmailTemplate(order),
    });

    res.status(201).json(order);
  } catch (err) {
    console.error("❌ ORDER ERROR:", err);
    res.status(500).json({ message: "Order creation failed", error: err.message });
  }
});

// GET SINGLE ORDER
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid order ID" });
  }

  try {
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch order", error: err.message });
  }
});

module.exports = router;
