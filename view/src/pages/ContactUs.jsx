import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // later you can connect backend here
    console.log(formData);

    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="w-full bg-gray-50">

      {/* ================= SECTION 1 : HERO ================= */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Contact Us
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Have a question, feedback, or want to work with us?  
          Fill out the form below and we’ll get back to you as soon as possible.
        </p>
      </section>

      {/* ================= SECTION 2 : CONTACT CARD ================= */}
      <section className="max-w-6xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-lg overflow-hidden">

          {/* LEFT : INFO */}
          <div className="p-10 bg-gray-800 text-white">
            <h2 className="text-2xl font-semibold mb-6">
              Get in Touch
            </h2>

            <p className="text-gray-300 mb-10">
              We’d love to hear from you. Reach out using the information below
              or send us a message directly.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="text-xl">📍</span>
                <p>123 Business Street, New York, USA</p>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-xl">📞</span>
                <p>+1 234 567 890</p>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-xl">✉️</span>
                <p>contact@yourcompany.com</p>
              </div>
            </div>
          </div>

          {/* RIGHT : FORM */}
          <div className="p-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Send a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-800"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-800"
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows="5"
                required
                className="w-full border rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-gray-800"
              />

              <button
                type="submit"
                className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900 transition font-medium"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </section>
    </div>
  );
};

export default ContactUs;
