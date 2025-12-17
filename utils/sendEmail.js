const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const sendEmail = async ({ to, subject, html }) => {
  try {
    // Verify transporter configuration
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      throw new Error("Missing Gmail credentials in environment variables");
    }

    console.log(`Attempting to send email to: ${to}`);
    
    const info = await transporter.sendMail({
      from: `"ShopIt" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log(`✓ Email sent successfully: ${info.messageId}`);
    return info;
    
  } catch (error) {
    console.error("❌ Email sending failed:");
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    console.error("Error response:", error.response);
    
    // Re-throw with more context
    throw new Error(`Failed to send email to ${to}: ${error.message}`);
  }
};

module.exports = sendEmail;
