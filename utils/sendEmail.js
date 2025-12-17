const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_KEY,
  },
});

const sendEmail = async ({ to, subject, html }) => {
  if (!process.env.BREVO_SMTP_USER || !process.env.BREVO_SMTP_KEY) {
    throw new Error("Brevo SMTP env variables missing");
  }

  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;
