const express = require("express");
const Order = require("../models/Order");
const sendEmail = require("../utils/sendEmail");
const orderEmailTemplate = require("../utils/orderEmailTemplate");

const router = express.Router();

// CREATE ORDER
router.post("/", async (req, res) => {
  try {
    const { email, shippingAddress, cart, subtotal, paymentDetails, userId } = req.body;

    if (!email || !cart || !cart.length) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    // 1️⃣ Create order (FAST)
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

    // 2️⃣ Respond immediately
    res.status(201).json(order);

    // 3️⃣ Send emails in background (NON-BLOCKING)
    sendEmail({
      to: email,
      subject: "Your Order Confirmation",
      html: orderEmailTemplate(order),
    }).catch(err =>
      console.error("❌ Customer email failed:", err.message)
    );

    sendEmail({
      to: "akshumagol2000@gmail.com",
      subject: `New Order #${order._id}`,
      html: orderEmailTemplate(order),
    }).catch(err =>
      console.error("❌ Admin email failed:", err.message)
    );

  } catch (error) {
    console.error("❌ Order creation failed:", error);
    res.status(500).json({ message: "Failed to create order" });
  }
});

module.exports = router;
