const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: "9e2947001@smtp-brevo.com",
    pass: process.env.BREVO_SMTP_KEY,
  },
  tls: {
    rejectUnauthorized: false, // ✅ IMPORTANT for Render
  },
  connectionTimeout: 10000, // ✅ prevent hanging
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

const sendEmail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: '"ShopIt" <akshumagol2000@gmail.com>', // verified sender
      to,
      subject,
      html,
    });

    console.log(`✅ Email sent to ${to}`);
  } catch (error) {
    // ❗ DO NOT THROW — never crash backend
    console.error("❌ Email failed:", error.message);
  }
};

module.exports = sendEmail;
