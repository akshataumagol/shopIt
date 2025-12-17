const express = require("express");
const Order = require("../models/Order");
const sendEmail = require("../utils/sendEmail");
const orderEmailTemplate = require("../utils/orderEmailTemplate");

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("========================================");
  console.log("NEW ORDER REQUEST");
  console.log("Time:", new Date().toISOString());
  console.log("========================================");
  
  try {
    const { email, shippingAddress, cart, subtotal, paymentDetails, userId } = req.body;

    console.log("Received data:");
    console.log("- Email:", email);
    console.log("- Cart items:", cart?.length);
    console.log("- Subtotal:", subtotal);
    console.log("- Shipping address:", shippingAddress);

    // Validation
    if (!email || !cart || !cart.length) {
      console.error("❌ VALIDATION FAILED");
      return res.status(400).json({ 
        message: "Invalid order data",
        error: "Email and cart are required" 
      });
    }

    console.log("✓ Validation passed");
    console.log("Attempting to save to database...");

    // Create order
    const orderData = {
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
    };

    console.log("Order data prepared:", JSON.stringify(orderData, null, 2));

    const order = await Order.create(orderData);

    console.log("✓✓✓ ORDER SAVED TO DATABASE ✓✓✓");
    console.log("Order ID:", order._id);
    console.log("Order email:", order.contactEmail);

    // Try to send emails (but don't fail the order if emails fail)
    console.log("Attempting to send emails...");
    
    try {
      await sendEmail({
        to: email,
        subject: "Your Order Confirmation",
        html: orderEmailTemplate(order),
      });
      console.log("✓ Customer email sent");
    } catch (emailError) {
      console.error("❌ Customer email failed (continuing anyway):");
      console.error("Email error:", emailError.message);
    }

    try {
      await sendEmail({
        to: "akshumagol2000@gmail.com",
        subject: "New Order Received",
        html: orderEmailTemplate(order),
      });
      console.log("✓ Admin email sent");
    } catch (emailError) {
      console.error("❌ Admin email failed (continuing anyway):");
      console.error("Email error:", emailError.message);
    }

    console.log("========================================");
    console.log("✓✓✓ ORDER COMPLETED SUCCESSFULLY ✓✓✓");
    console.log("========================================");

    // Return the order
    res.status(201).json(order);
    
  } catch (error) {
    console.error("========================================");
    console.error("❌❌❌ CRITICAL ERROR ❌❌❌");
    console.error("========================================");
    console.error("Error Type:", error.name);
    console.error("Error Message:", error.message);
    console.error("Error Stack:", error.stack);
    
    if (error.name === 'ValidationError') {
      console.error("Mongoose Validation Error Details:", error.errors);
    }
    
    // Send detailed error to frontend
    res.status(500).json({ 
      message: "Failed to create order",
      error: error.message,
      errorType: error.name,
      details: process.env.NODE_ENV === 'production' ? undefined : error.stack
    });
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
