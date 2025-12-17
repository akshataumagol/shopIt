// utils/sendEmail.js
const axios = require("axios");

const sendEmail = async ({ to, subject, html }) => {
  if (!process.env.BREVO_API_KEY) {
    console.error("❌ BREVO_API_KEY not set in environment variables");
    throw new Error("BREVO_API_KEY missing");
  }

  try {
    const res = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { name: "ShopIt", email: "akshumagol2000@gmail.com" },
        to: [{ email: to }],
        subject,
        htmlContent: html,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(`✅ Email sent to ${to}`);
    return res.data;
  } catch (err) {
    console.error("❌ Email API failed:", err.response?.data || err.message);
    throw err;
  }
};

module.exports = sendEmail;
