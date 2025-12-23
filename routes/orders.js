// routes/orders.js
const express = require("express");
const mongoose = require("mongoose");
const Order = require("../models/Order");
const sendEmail = require("../utils/sendEmail");
const orderEmailTemplate = require("../utils/orderEmailTemplate");

const router = express.Router();

// ===== Test Email Route =====
router.get("/test-email", async (req, res) => {
  try {
    const info = await sendEmail({
      to: "akshataumagol2004@gmail.com", // test email
      subject: "ShopIt Test Email",
      html: "<h2>Email system working ✅</h2>",
    });
    res.json({ success: true, info });
  } catch (err) {
    console.error("❌ Test email failed:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ===== Create Order =====
router.post("/", async (req, res) => {
  try {
    const { email, shippingAddress, cart, subtotal, paymentDetails, userId } = req.body;

    if (!email || !cart || !cart.length) {
      return res.status(400).json({ message: "Invalid order data" });
    }

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
        paypalOrderId: paymentDetails?.id || "",
        payerId: paymentDetails?.payer?.payer_id || "",
        paidAt: new Date(),
      },
    });

    console.log("✅ ORDER CREATED:", order._id);

    // Send emails
    try {
      await sendEmail({
        to: email,
        subject: "Your ShopIt Order Confirmation",
        html: orderEmailTemplate(order),
      });
      await sendEmail({
        to: "akshumagol2000@gmail.com",
        subject: `New Order #${order._id}`,
        html: orderEmailTemplate(order),
      });
    } catch (emailErr) {
      console.error("❌ Email sending failed:", emailErr.message);
    }

    res.status(201).json(order);
  } catch (err) {
    console.error("❌ ORDER ERROR:", err.message);
    res.status(500).json({ message: "Order creation failed", error: err.message });
  }
});

// ===== Get Single Order =====
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

// Get orders by user email
router.get("/user/:email", async (req, res) => {
  try {
    const orders = await Order.find({ contactEmail: req.params.email })
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});


module.exports = router;
