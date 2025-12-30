import React, { useState } from "react";
import axios from "axios";

const BASE_URL = "https://shopit-56mz.onrender.com";

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/contact`, formData);
      setStatus({ type: "success", message: res.data.message });
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus({ type: "error", message: err.response?.data?.message || "Something went wrong" });
    }
  };

  return (
    <div className="w-full">

      {/* Hero Section - 80vh */}
      <section className="h-[80vh] flex items-center justify-center text-center bg-gradient-to-br from-gray-100 via-white to-gray-200 animate-gradient bg-[length:400%_400%] relative overflow-hidden">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 opacity-0 translate-y-5 animate-fadeSlideUp">
            Contact Us
          </h1>
          <p className="text-gray-600 text-lg md:text-xl opacity-0 translate-y-5 animate-fadeSlideUp animation-delay-300">
            Have a question, feedback, or want to work with us? Reach out and we’ll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-gray-50 py-24 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-2xl shadow-xl overflow-hidden">

          {/* Contact Info */}
          <div className="p-12 bg-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Get in Touch</h2>
            <p className="text-gray-600 mb-10">
              We’d love to hear from you. Contact us using the details below or send us a message directly.
            </p>
            <div className="space-y-6 text-gray-700">
              <div className="flex items-center gap-4"><span className="text-xl">📍</span>Kothrud, Pune</div>
              <div className="flex items-center gap-4"><span className="text-xl">📞</span>+91 9325132576</div>
              <div className="flex items-center gap-4"><span className="text-xl">✉️</span>akshumagol2000@gmail.com</div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Send a Message</h2>

            {status && (
              <div
                className={`mb-4 px-4 py-3 rounded ${
                  status.type === "success" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                }`}
              >
                {status.message}
              </div>
            )}

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
      </section>

      {/* Tailwind Keyframes */}
      <style>
        {`
          @keyframes fadeSlideUp {
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeSlideUp {
            animation: fadeSlideUp 1s forwards;
          }
          .animation-delay-300 {
            animation-delay: 0.3s;
          }
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient {
            animation: gradientShift 15s ease infinite;
          }
        `}
      </style>

    </div>
  );
};

export default ContactUs;
