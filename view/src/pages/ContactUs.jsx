import React from "react";

const ContactUs = () => {
  return (
    <div className="w-full">

      {/* SECTION 1 : HEADER */}
      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Get in Touch
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Have a question or want to work together?  
          Fill out the form and we’ll get back to you shortly.
        </p>
      </section>

      {/* SECTION 2 : CONTACT CARD */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 border rounded-2xl overflow-hidden shadow-lg">

          {/* LEFT : CONTACT INFO */}
          <div className="p-10 border-b md:border-b-0 md:border-r">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Contact Information
            </h2>

            <div className="space-y-5 text-gray-600">
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

          {/* RIGHT : CONTACT FORM */}
          <div className="p-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Send a Message
            </h2>

            <form className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-800"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-800"
              />

              <textarea
                placeholder="Your Message"
                rows="5"
                className="w-full border rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-gray-800"
              />

              <button
                type="submit"
                className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900 transition"
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
