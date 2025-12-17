const express = require("express");
const Order = require("../models/Order");
const sendEmail = require("../utils/SendEmail");
const orderEmailTemplate = require("../utils/OrderEmailTemplate");

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("Received new order request:", req.body);

  try {
    const { email, shippingAddress, cart, subtotal, paymentDetails, userId } = req.body;

    if (!email || !Array.isArray(cart) || cart.length === 0) {
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

    try {
      await sendEmail({
        to: email,
        subject: "Your Order Confirmation",
        html: orderEmailTemplate(order),
      });

      await sendEmail({
        to: "akshumagol2000@gmail.com",
        subject: "New Order Received",
        html: orderEmailTemplate(order),
      });
    } catch (err) {
      console.error("EMAIL ERROR:", err);
    }

    res.status(201).json(order);
  } catch (error) {
    console.error("ORDER ERROR:", error);
    res.status(500).json({ message: "Failed to create order" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch order" });
  }
});

module.exports = router;


/*const express = require("express");
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

module.exports = router;*/
