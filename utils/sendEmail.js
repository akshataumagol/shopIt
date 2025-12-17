const nodemailer = require("nodemailer");

console.log("\n====== EMAIL CONFIGURATION ======");
console.log("SMTP Host: smtp-relay.brevo.com");
console.log("SMTP Port: 587");
console.log("SMTP User: 9e2947001@smtp-brevo.com");
console.log("BREVO_SMTP_KEY exists:", !!process.env.BREVO_SMTP_KEY);
console.log("BREVO_SMTP_KEY length:", process.env.BREVO_SMTP_KEY?.length || 0);

if (!process.env.BREVO_SMTP_KEY) {
  console.error("❌ CRITICAL ERROR: BREVO_SMTP_KEY not found in environment variables!");
  console.error("Please add it to your .env file or Render environment variables");
}

// Create transporter with Brevo SMTP
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // use TLS
  auth: {
    user: "9e2947001@smtp-brevo.com", 
    pass: process.env.BREVO_SMTP_KEY,
  },
  debug: true, // Enable debug output
  logger: true, // Log to console
  tls: {
    rejectUnauthorized: true
  }
});

// Verify connection on startup
console.log("\n====== VERIFYING SMTP CONNECTION ======");
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP CONNECTION FAILED");
    console.error("Error:", error.message);
    console.error("Code:", error.code);
    console.error("\nPossible causes:");
    console.error("1. BREVO_SMTP_KEY is incorrect");
    console.error("2. Brevo account is not active");
    console.error("3. Sender email not verified in Brevo");
    console.error("4. Network/firewall blocking port 587");
  } else {
    console.log("✅ SMTP server is ready to send emails");
  }
});

const sendEmail = async ({ to, subject, html }) => {
  console.log("\n====== SENDING EMAIL ======");
  console.log("📧 From: akshumagol2000@gmail.com");
  console.log("📧 To:", to);
  console.log("📧 Subject:", subject);
  console.log("📧 HTML length:", html.length, "characters");
  
  try {
    const startTime = Date.now();
    
    const info = await transporter.sendMail({
      from: '"ShopIt" <akshumagol2000@gmail.com>', 
      to,
      subject,
      html,
    });
    
    const duration = Date.now() - startTime;
    
    console.log("✅ EMAIL SENT SUCCESSFULLY");
    console.log("Message ID:", info.messageId);
    console.log("Response:", info.response);
    console.log("Duration:", duration, "ms");
    console.log("Accepted:", info.accepted);
    console.log("Rejected:", info.rejected);
    
    return info;
    
  } catch (error) {
    console.error("\n❌ EMAIL SENDING FAILED");
    console.error("Error Type:", error.constructor.name);
    console.error("Error Message:", error.message);
    console.error("Error Code:", error.code);
    console.error("Command:", error.command);
    
    if (error.response) {
      console.error("SMTP Response:", error.response);
    }
    
    if (error.responseCode) {
      console.error("Response Code:", error.responseCode);
    }
    
    // Common error explanations
    if (error.code === 'EAUTH') {
      console.error("\n🔍 AUTHENTICATION ERROR");
      console.error("Your BREVO_SMTP_KEY is incorrect or expired");
      console.error("Get a new key from: https://app.brevo.com/settings/keys/smtp");
    }
    
    if (error.code === 'ESOCKET') {
      console.error("\n🔍 NETWORK ERROR");
      console.error("Cannot connect to SMTP server");
      console.error("Check if port 587 is blocked by firewall");
    }
    
    if (error.responseCode === 550) {
      console.error("\n🔍 SENDER NOT VERIFIED");
      console.error("You need to verify akshumagol2000@gmail.com in Brevo");
      console.error("Go to: https://app.brevo.com/senders");
    }
    
    console.error("\n📋 Full Error Object:");
    console.error(JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
    
    throw error;
  }
};

module.exports = sendEmail;
