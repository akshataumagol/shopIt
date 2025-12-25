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

  return (
    <div className="text-gray-800 overflow-x-hidden">

      {/* HERO */}
      <section
        className="min-h-screen flex items-center justify-center text-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('https://images.unsplash.com/photo-1523275335684-37898b6baf30')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-4xl px-6 text-white animate-fadeIn">
          <h1 className="text-5xl font-bold mb-6">About Us</h1>
          <p className="text-lg text-gray-200">
            We build trust through quality products, secure systems, and customer-first service.
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
                className="bg-gray-50 rounded-2xl p-8 text-center transition-all duration-500 hover:-translate-y-3 hover:shadow-xl animate-fadeIn"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="py-24 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To create a reliable and customer-focused shopping platform where quality,
              affordability, and convenience meet.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We believe long-term success comes from transparency, consistency,
              and genuine customer care.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-10 animate-fadeIn">
            <h3 className="text-xl font-semibold mb-4">What Drives Us</h3>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li>✔ Customer trust & satisfaction</li>
              <li>✔ Ethical sourcing</li>
              <li>✔ Secure technology</li>
              <li>✔ Continuous innovation</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 1 – SCROLL LEFT / STICKY RIGHT */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">

          {/* LEFT SCROLL */}
          <div className="space-y-12">
            {[
              { year: "2021", title: "The Beginning", desc: "Started with a simple but powerful vision." },
              { year: "2022", title: "Rapid Growth", desc: "Expanded products and logistics nationwide." },
              { year: "2023", title: "Customer Trust", desc: "Thousands of satisfied repeat customers." },
              { year: "2024", title: "Innovation Focus", desc: "Improved technology and service reliability." },
            ].map((item, i) => (
              <div
                key={i}
                className="border-l-4 border-gray-800 pl-6 animate-fadeIn"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <span className="text-sm text-gray-400">{item.year}</span>
                <h3 className="text-xl font-semibold mt-1">{item.title}</h3>
                <p className="text-gray-600 mt-2">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* RIGHT STICKY */}
          <div className="sticky top-28 h-fit">
            <div className="bg-gray-900 text-white rounded-3xl p-10 shadow-2xl">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-gray-300 mb-6">
                These values shape our culture and decisions.
              </p>
              <ul className="space-y-4 text-sm">
                <li>✔ Integrity in everything</li>
                <li>✔ Customer-first thinking</li>
                <li>✔ Quality over quantity</li>
                <li>✔ Long-term vision</li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2 – DIFFERENT (STICKY LEFT + FLOATING CARDS) */}
      <section className="py-28 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">

          {/* LEFT STICKY */}
          <div className="sticky top-32">
            <h2 className="text-4xl font-bold mb-6">Our Impact</h2>
            <p className="text-gray-600 leading-relaxed">
              Beyond sales, we focus on creating meaningful impact through
              reliability, customer trust, and operational excellence.
            </p>
          </div>

          {/* RIGHT FLOATING CARDS */}
          <div className="grid sm:grid-cols-2 gap-8">
            {[
              { title: "50K+", desc: "Orders Delivered" },
              { title: "98%", desc: "Customer Satisfaction" },
              { title: "100+", desc: "Partner Brands" },
              { title: "24/7", desc: "Support Availability" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 shadow-lg hover:-translate-y-2 transition-all duration-500 animate-fadeIn"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <h3 className="text-3xl font-bold">{item.title}</h3>
                <p className="text-gray-500 mt-2 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ANIMATION */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.8s ease-out forwards;
          }
        `}
      </style>

    </div>
  );
}

export default AboutUs;
