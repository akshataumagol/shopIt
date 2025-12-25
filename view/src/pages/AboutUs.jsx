import React from "react";

function AboutUs() {
  const features = [
    { title: "Premium Quality", desc: "Products curated to meet the highest quality standards." },
    { title: "Secure Payments", desc: "Trusted and encrypted payment gateways." },
    { title: "Fast Delivery", desc: "Quick shipping with real-time tracking." },
    { title: "Customer Support", desc: "Friendly and responsive support team." },
    { title: "Easy Returns", desc: "Hassle-free return and refund policy." },
    { title: "Trusted Brand", desc: "Loved by thousands of happy customers." },
  ];

  const impactItems = [
    { title: "50K+", desc: "Orders Delivered" },
    { title: "98%", desc: "Customer Satisfaction" },
    { title: "100+", desc: "Partner Brands" },
    { title: "20+", desc: "Countries Served" },
    { title: "5M+", desc: "Monthly Visitors" },
    { title: "99.9%", desc: "System Uptime" },
  ];

  return (
    <div className="text-gray-800 overflow-x-hidden">

      {/* HERO */}
      <section className="min-h-screen flex items-center justify-center text-center bg-gray-900 text-white px-6">
        <div className="max-w-4xl">
          <h1 className="text-5xl font-bold mb-6">About Us</h1>
          <p className="text-lg text-gray-300">
            We build trust through quality products and seamless experiences.
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-14">Why Choose Us</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-xl transition"
              >
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT (STATIC GRID) */}
      <section className="py-28 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-16">Our Impact</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {impactItems.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-10 shadow hover:shadow-xl transition"
              >
                <h3 className="text-4xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20">
          <div>
            <h2 className="text-4xl font-bold mb-6">Our Philosophy</h2>
            <p className="text-gray-600 leading-relaxed">
              We build long-term systems focused on trust, clarity, and customer
              satisfaction — not short-term gains.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {["Trust", "Quality", "Speed", "Support"].map((item, i) => (
              <div
                key={i}
                className="bg-gray-100 rounded-2xl p-10 text-center font-semibold"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORCE NO HORIZONTAL SCROLL */}
      <style>
        {`
          html, body {
            overflow-x: hidden;
          }
        `}
      </style>

    </div>
  );
}

export default AboutUs;
