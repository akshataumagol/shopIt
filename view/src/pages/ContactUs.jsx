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
    console.log(formData);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="w-full">

      {/* ================= SECTION 1 : FULL SCREEN HERO ================= */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 px-4">
        <div className="text-center text-white max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Contact Us
          </h1>
          <p className="text-gray-300 text-lg md:text-xl">
            Have a question, feedback, or want to work with us?  
            Reach out and we’ll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* ================= SECTION 2 : CONTACT CARD ================= */}
      <section className="bg-gray-100 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-xl overflow-hidden">

            {/* LEFT : INFO */}
            <div className="p-12 bg-gray-800 text-white">
              <h2 className="text-2xl font-semibold mb-6">
                Get in Touch
              </h2>

              <p className="text-gray-300 mb-10">
                We’d love to hear from you. Contact us using the details below
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
            <div className="p-12">
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
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
