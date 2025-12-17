const express = require("express");
const Order = require("../models/Order");
const sendEmail = require("../utils/sendEmail");
const orderEmailTemplate = require("../utils/orderEmailTemplate");
const router = express.Router();

// ⚠️ IMPORTANT: Specific routes MUST come BEFORE dynamic routes like /:id
// Otherwise Express will treat "test-email" as an ID parameter

// 1️⃣ TEST EMAIL ENDPOINT - FIRST!
router.get("/test-email", async (req, res) => {
  console.log("\n====== TESTING EMAIL SYSTEM ======");
  
  try {
    console.log("🧪 Sending test email...");
    await sendEmail({
      to: "akshumagol2000@gmail.com",
      subject: "Test Email from ShopIt",
      html: "<h1>✅ Email system is working!</h1><p>This is a test email from your ShopIt backend.</p>",
    });
    
    console.log("✅ Test email sent successfully!");
    res.json({ 
      success: true, 
      message: "Test email sent successfully to akshumagol2000@gmail.com",
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error("❌ TEST EMAIL FAILED");
    console.error("Error:", error.message);
    console.error("Full Error:", JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
    
    res.status(500).json({ 
      success: false, 
      error: error.message,
      code: error.code,
      details: error.response || "No additional details"
    });
  }
});

// 2️⃣ CREATE ORDER + SEND EMAIL
router.post("/", async (req, res) => {
  console.log("====== NEW ORDER REQUEST ======");
  console.log("Request Body:", JSON.stringify(req.body, null, 2));
  
  try {
    const { email, shippingAddress, cart, subtotal, paymentDetails, userId } = req.body;
    
    // Validation
    if (!email || !cart || !cart.length) {
      console.error("❌ VALIDATION FAILED - Missing required fields");
      console.log("Email:", email);
      console.log("Cart length:", cart?.length);
      return res.status(400).json({ message: "Invalid order data" });
    }
    
    console.log("✅ Validation passed");
    console.log("📧 Customer Email:", email);
    console.log("🛒 Cart Items:", cart.length);
    console.log("💰 Subtotal:", subtotal);
    
    // Create order in database
    console.log("💾 Creating order in MongoDB...");
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
    
    console.log("✅ Order created successfully!");
    console.log("📄 Order ID:", order._id);
    
    // Send customer email
    console.log("\n====== SENDING CUSTOMER EMAIL ======");
    console.log("📧 To:", email);
    try {
      await sendEmail({
        to: email,
        subject: "Your Order Confirmation",
        html: orderEmailTemplate(order),
      });
      console.log("✅ Customer email sent successfully to:", email);
    } catch (emailError) {
      console.error("❌ CUSTOMER EMAIL FAILED");
      console.error("Error Name:", emailError.name);
      console.error("Error Message:", emailError.message);
      console.error("Error Code:", emailError.code);
      console.error("Full Error:", JSON.stringify(emailError, Object.getOwnPropertyNames(emailError), 2));
      
      if (emailError.response) {
        console.error("SMTP Response:", emailError.response);
      }
    }
    
    // Send admin email
    console.log("\n====== SENDING ADMIN EMAIL ======");
    console.log("📧 To: akshumagol2000@gmail.com");
    try {
      await sendEmail({
        to: "akshumagol2000@gmail.com",
        subject: `New Order #${order._id}`,
        html: orderEmailTemplate(order),
      });
      console.log("✅ Admin email sent successfully");
    } catch (emailError) {
      console.error("❌ ADMIN EMAIL FAILED");
      console.error("Error Name:", emailError.name);
      console.error("Error Message:", emailError.message);
      console.error("Error Code:", emailError.code);
      console.error("Full Error:", JSON.stringify(emailError, Object.getOwnPropertyNames(emailError), 2));
      
      if (emailError.response) {
        console.error("SMTP Response:", emailError.response);
      }
    }
    
    console.log("\n====== ORDER COMPLETED ======");
    console.log("Returning order to frontend\n");
    
    // Return response
    res.status(201).json(order);
    
  } catch (error) {
    console.error("\n====== ORDER CREATION FAILED ======");
    console.error("❌ Error Name:", error.name);
    console.error("❌ Error Message:", error.message);
    console.error("❌ Stack Trace:", error.stack);
    res.status(500).json({ message: "Failed to create order" });
  }
});

// 3️⃣ GET SINGLE ORDER - MUST BE LAST! (dynamic route)
router.get("/:id", async (req, res) => {
  console.log("====== FETCHING ORDER ======");
  console.log("Order ID:", req.params.id);
  
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      console.warn("⚠️ Order not found");
      return res.status(404).json({ message: "Order not found" });
    }
    
    console.log("✅ Order fetched successfully");
    res.json(order);
    
  } catch (error) {
    console.error("❌ Failed to fetch order:", error.message);
    res.status(500).json({ message: "Failed to fetch order", error: error.message });
  }
});

module.exports = router;
