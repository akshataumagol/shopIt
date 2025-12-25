import React, { useRef } from "react";

function AboutUs() {
  const impactScrollRef = useRef(null);

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

  const scrollImpact = () => {
    if (impactScrollRef.current) {
      impactScrollRef.current.scrollTo({
        top: impactScrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

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

      {/* TIMELINE */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
          <div className="space-y-12">
            {["2021", "2022", "2023", "2024"].map((year, i) => (
              <div key={i} className="border-l-4 border-gray-800 pl-6 animate-fadeIn">
                <span className="text-sm text-gray-400">{year}</span>
                <h3 className="text-xl font-semibold mt-1">Milestone {i + 1}</h3>
                <p className="text-gray-600 mt-2">
                  Strategic growth and customer-focused improvements.
                </p>
              </div>
            ))}
          </div>

          <div className="sticky top-28 h-fit">
            <div className="bg-gray-900 text-white rounded-3xl p-10 shadow-2xl">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <ul className="space-y-4 text-sm">
                <li>✔ Integrity</li>
                <li>✔ Reliability</li>
                <li>✔ Innovation</li>
                <li>✔ Customer First</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT – SCROLLABLE */}
      <section className="py-28 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">

          {/* LEFT STICKY */}
          <div className="sticky top-32 space-y-6 h-fit">
            <h2 className="text-4xl font-bold">Our Impact</h2>
            <p className="text-gray-600 leading-relaxed">
              A snapshot of measurable achievements.
            </p>

            <button
              onClick={scrollImpact}
              className="px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition"
            >
              View More ↓
            </button>
          </div>

          {/* RIGHT SCROLLABLE */}
          <div
            ref={impactScrollRef}
            className="max-h-[480px] overflow-y-auto space-y-8 pr-2 scroll-smooth"
          >
            {impactItems.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 shadow-lg animate-fadeIn"
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
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
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
