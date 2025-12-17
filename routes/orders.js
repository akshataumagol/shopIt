const express = require("express");
const Order = require("../models/Order");
const sendEmail = require("../utils/sendEmail");
const orderEmailTemplate = require("../utils/orderEmailTemplate");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, shippingAddress, cart, subtotal, paymentDetails, userId } =
      req.body;

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

    res.status(201).json(order);
  } catch (error) {
    console.error(error);
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
const sendEmail = require("../utils/SendEmail");
const orderEmailTemplate = require("../utils/OrderEmailTemplate");
const router = express.Router();

router.post("/", async (req, res) => {
  console.log("=== NEW ORDER REQUEST ===");
  console.log("Request body:", JSON.stringify(req.body, null, 2));
  
  try {
    const { email, shippingAddress, cart, subtotal, paymentDetails, userId } = req.body;
    
    // Validation
    if (!email || !Array.isArray(cart) || cart.length === 0) {
      console.error("Validation failed:", { email, cartLength: cart?.length });
      return res.status(400).json({ message: "Invalid order data" });
    }
    
    console.log("Creating order in database...");
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
    
    console.log("Order created successfully:", order._id);
    
    // Send emails with detailed logging
    console.log("=== SENDING EMAILS ===");
    console.log("Customer email:", email);
    console.log("BREVO_SMTP_KEY exists:", !!process.env.BREVO_SMTP_KEY);
    
    try {
      console.log("Sending customer email...");
      await sendEmail({
        to: email,
        subject: "Your Order Confirmation",
        html: orderEmailTemplate(order),
      });
      console.log("✓ Customer email sent successfully");
    } catch (emailError) {
      console.error("✗ Customer email FAILED:");
      console.error("Error name:", emailError.name);
      console.error("Error message:", emailError.message);
      console.error("Error stack:", emailError.stack);
      console.error("Full error object:", JSON.stringify(emailError, null, 2));
    }
    
    try {
      console.log("Sending admin notification email...");
      await sendEmail({
        to: "akshumagol2000@gmail.com",
        subject: "New Order Received",
        html: orderEmailTemplate(order),
      });
      console.log("✓ Admin email sent successfully");
    } catch (emailError) {
      console.error("✗ Admin email FAILED:");
      console.error("Error name:", emailError.name);
      console.error("Error message:", emailError.message);
      console.error("Full error object:", JSON.stringify(emailError, null, 2));
    }
    
    console.log("=== ORDER COMPLETE ===");
    res.status(201).json(order);
    
  } catch (error) {
    console.error("=== ORDER CREATION ERROR ===");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    res.status(500).json({ message: "Failed to create order", error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Failed to fetch order" });
  }
});

module.exports = router;

*/
