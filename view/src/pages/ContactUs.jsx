import React from "react";

const ContactUs = () => {
  return (
    <section className="bg-gradient-to-br from-indigo-500 to-purple-600 py-20 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* Left: Contact Info */}
        <div className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="text-white/90 mb-8">
            Feel free to reach out. We’re happy to help you anytime.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-2xl">📍</span>
              <p>123 Business Street, New York, USA</p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-2xl">📞</span>
              <p>+1 234 567 890</p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-2xl">✉️</span>
              <p>contact@yourcompany.com</p>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="p-10">
          <form className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <textarea
                placeholder="Your Message"
                rows="5"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default ContactUs;

