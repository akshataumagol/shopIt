const express = require("express");
const Order = require("../models/Order");
const sendEmail = require("../utils/sendEmail");
const orderEmailTemplate = require("../utils/orderEmailTemplate");

const router = express.Router();

/**
 * CREATE ORDER
 */
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

    if (!email || !cart || cart.length === 0) {
      return res.status(400).json({
        message: "Invalid order data",
      });
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

    /* ================= EMAILS ================= */

    try {
      await sendEmail({
        to: order.contactEmail,
        subject: "Your Order Confirmation",
        html: orderEmailTemplate(order),
      });
      console.log("✓ Customer email sent");
    } catch (err) {
      console.error("❌ Customer email failed:", err.message);
    }

    try {
      await sendEmail({
        to: "akshumagol2000@gmail.com",
        subject: "New Order Received",
        html: orderEmailTemplate(order),
      });
      console.log("✓ Admin email sent");
    } catch (err) {
      console.error("❌ Admin email failed:", err.message);
    }

    /* ========================================== */

    res.status(201).json(order);
  } catch (error) {
    console.error("❌ Order creation failed:", error);
    res.status(500).json({
      message: "Failed to create order",
    });
  }
});

/**
 * GET SINGLE ORDER
 */
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    console.error("❌ Fetch order failed:", error);
    res.status(500).json({ message: "Failed to fetch order" });
  }
});

module.exports = router;
