import React from "react";

function AboutUs() {
  const features = [
    {
      title: "Premium Quality",
      desc: "Products curated to meet the highest quality standards.",
    },
    {
      title: "Secure Payments",
      desc: "Trusted and encrypted payment gateways.",
    },
    {
      title: "Fast Delivery",
      desc: "Quick shipping with real-time tracking.",
    },
    {
      title: "Customer Support",
      desc: "Friendly and responsive support team.",
    },
    {
      title: "Easy Returns",
      desc: "Hassle-free return and refund policy.",
    },
    {
      title: "Trusted Brand",
      desc: "Loved by thousands of happy customers.",
    },
  ];

  return (
    <div className="text-gray-800">

      {/* HERO SECTION */}
      <section
        className="min-h-screen flex items-center justify-center text-center relative"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('https://images.unsplash.com/photo-1523275335684-37898b6baf30')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="max-w-4xl px-6 text-white"
          style={{ animation: "fadeIn 1s ease-out forwards" }}
        >
          <h1 className="text-5xl font-bold mb-6">About Us</h1>
          <p className="text-lg leading-relaxed text-gray-200">
            We deliver a seamless and secure shopping experience by offering
            quality products, transparent pricing, and reliable service.
          </p>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2
            className="text-3xl font-bold text-center mb-14"
            style={{ animation: "fadeIn 0.8s ease-out forwards" }}
          >
            Why Choose Us
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-8 text-center transform transition-all duration-500 hover:-translate-y-3 hover:shadow-xl"
                style={{
                  animation: "fadeIn 0.8s ease-out forwards",
                  animationDelay: `${index * 0.15}s`,
                  opacity: 0,
                }}
              >
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HALF SECTION */}
      <section className="py-24 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* LEFT CONTENT */}
            <div
              className="space-y-6"
              style={{ animation: "fadeIn 0.8s ease-out forwards" }}
            >
              <h2 className="text-3xl font-bold">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                Our mission is to create a trustworthy and customer-first
                shopping platform where quality, affordability, and convenience
                come together.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We focus on building long-term relationships by delivering value
                through carefully curated products, secure payments, and
                dependable delivery.
              </p>
            </div>

            

          </div>
        </div>
      </section>

      {/* KEYFRAMES */}
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
        `}
      </style>

    </div>
  );
}

export default AboutUs;
