import React, { useRef } from "react";

function AboutUs() {
  const sliderRef = useRef(null);

  const features = [
    { title: "Premium Quality", desc: "Products curated to meet the highest quality standards." },
    { title: "Secure Payments", desc: "Trusted and encrypted payment gateways." },
    { title: "Fast Delivery", desc: "Quick shipping with real-time tracking." },
    { title: "Customer Support", desc: "Friendly and responsive support team." },
    { title: "Easy Returns", desc: "Hassle-free return and refund policy." },
    { title: "Trusted Brand", desc: "Loved by thousands of happy customers." },
  ];

  const impactItems = [
    {
      title: "50K+ Orders",
      desc: "Delivered worldwide with speed and reliability.",
      img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    },
    {
      title: "98% Satisfaction",
      desc: "Customers trust and recommend us.",
      img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    },
    {
      title: "100+ Brands",
      desc: "Partnered with premium brands globally.",
      img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    },
    {
      title: "20+ Countries",
      desc: "Serving customers across borders.",
      img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    },
    {
      title: "5M+ Visitors",
      desc: "Monthly traffic powered by trust.",
      img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    },
    {
      title: "99.9% Uptime",
      desc: "Reliable systems & secure tech.",
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    },
  ];

  const scroll = (direction) => {
    const card = sliderRef.current.querySelector(".slide");
    const cardWidth = card.offsetWidth + 32;

    sliderRef.current.scrollBy({
      left: direction === "right" ? cardWidth : -cardWidth,
      behavior: "smooth",
    });
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
        <div className="max-w-4xl px-6 text-white">
          <h1 className="text-5xl font-bold mb-6">About Us</h1>
          <p className="text-lg text-gray-200">
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
                className="bg-gray-50 rounded-2xl p-8 text-center hover:-translate-y-3 transition-all duration-300 hover:shadow-xl"
              >
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SIMPLE PERFECT SLIDER */}
      <section className="py-28 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">

          <div className="flex items-center justify-between mb-10">
            <h2 className="text-4xl font-bold">Our Impact</h2>

            <div className="flex gap-3">
              <button
                onClick={() => scroll("left")}
                className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-900 hover:text-white transition"
              >
                ‹
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-900 hover:text-white transition"
              >
                ›
              </button>
            </div>
          </div>

          <div
            ref={sliderRef}
            className="flex gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
          >
            {impactItems.map((item, index) => (
              <div
                key={index}
                className="slide snap-start min-w-[380px] bg-white rounded-3xl shadow-xl overflow-hidden"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="h-56 w-full object-cover"
                />
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* DIFFERENT 4TH SECTION */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20">

          <div>
            <h2 className="text-4xl font-bold mb-6">How We Think</h2>
            <p className="text-gray-600 leading-relaxed">
              We don’t chase trends. We build systems that last, scale,
              and earn trust over time.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {["Clarity", "Security", "Speed", "Support"].map((item, i) => (
              <div
                key={i}
                className="bg-gray-100 rounded-2xl p-10 text-center hover:shadow-lg transition"
              >
                <h4 className="text-xl font-semibold">{item}</h4>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}

export default AboutUs;
