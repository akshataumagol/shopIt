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

      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200 px-4">
        <div className="text-center max-w-3xl animate-fadeIn">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 animate-slideUp">
            Contact Us
          </h1>
          <p className="text-gray-600 text-lg md:text-xl animate-slideUp delay-200">
            Have a question, feedback, or want to work with us?  
            Reach out and we’ll respond as soon as possible.
          </p>
        </div>
      </section>

      <section className="bg-gray-50 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-xl overflow-hidden animate-fadeInUp">

            <div className="p-12 bg-gray-100">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Get in Touch
              </h2>

              <p className="text-gray-600 mb-10">
                We’d love to hear from you. Contact us using the details below
                or send us a message directly.
              </p>

              <div className="space-y-6 text-gray-700">
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
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                />

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows="5"
                  required
                  className="w-full border rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                />

                <button
                  type="submit"
                  className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition transform hover:scale-[1.02]"
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
