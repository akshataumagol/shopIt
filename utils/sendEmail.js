const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: "9e2947001@smtp-brevo.com", 
    pass: process.env.BREVO_SMTP_KEY,
  },
});

const sendEmail = async ({ to, subject, html }) => {
  await transporter.sendMail({
    from: '"shopit" <akshumagol2000@gmail.com>', 
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;
