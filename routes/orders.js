const express = require("express");
const Order = require("../models/Order");
const sendEmail = require("../utils/sendEmail");
const orderEmailTemplate = require("../utils/orderEmailTemplate");
const router = express.Router();

// CREATE ORDER + SEND EMAIL
router.post("/", async (req, res) => {
  console.log("Received new order request:", req.body); // DEBUG
  try {
    const { email, shippingAddress, cart, subtotal, paymentDetails, userId } = req.body;
    if (!email || !cart || !cart.length) {
      console.warn("Invalid order data"); // DEBUG
      return res.status(400).json({ message: "Invalid order data" });
    }
    console.log("Creating order in MongoDB..."); // DEBUG
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
    console.log("Order created successfully with ID:", order._id); // DEBUG
    
    // Send emails
    try {
      console.log(`Sending email to customer: ${email}`); // DEBUG - FIXED
      await sendEmail({
        to: email,
        subject: "Your Order Confirmation",
        html: orderEmailTemplate(order),
      });
      console.log("Customer email sent successfully"); // DEBUG
      
      console.log("Sending email to admin: akshumagol2000@gmail.com"); // DEBUG
      await sendEmail({
        to: "akshumagol2000@gmail.com",
        subject: "New Order Received",
        html: orderEmailTemplate(order),
      });
      console.log("Admin email sent successfully"); // DEBUG
    } catch (emailError) {
      console.error("Email sending failed:", emailError); // DEBUG
    }
    
    res.status(201).json(order);
  } catch (error) {
    console.error("Order creation failed:", error); // DEBUG
    res.status(500).json({ message: "Failed to create order" });
  }
});

// GET SINGLE ORDER
router.get("/:id", async (req, res) => {
  console.log("Fetching order with ID:", req.params.id); // DEBUG
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      console.warn("Order not found"); // DEBUG
      return res.status(404).json({ message: "Order not found" });
    }
    console.log("Order fetched successfully"); // DEBUG
    res.json(order);
  } catch (error) {
    console.error("Failed to fetch order:", error); // DEBUG
    res.status(500).json({ message: "Failed to fetch order" });
  }
});

module.exports = router;
