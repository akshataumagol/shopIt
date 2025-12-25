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
  ];

  const scroll = (direction) => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: direction === "right" ? 420 : -420,
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

      {/* IMPACT SLIDER - FIXED */}
      <section className="py-28 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">

          <div className="flex items-center justify-between mb-10">
            <h2 className="text-4xl font-bold">Our Impact</h2>

            <div className="flex gap-3">
              <button
                onClick={() => scroll("left")}
                className="w-12 h-12 rounded-full bg-white shadow hover:bg-gray-900 hover:text-white transition flex items-center justify-center text-2xl"
              >
                ‹
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-12 h-12 rounded-full bg-white shadow hover:bg-gray-900 hover:text-white transition flex items-center justify-center text-2xl"
              >
                ›
              </button>
            </div>
          </div>

          <div
            ref={sliderRef}
            className="flex gap-8 overflow-x-scroll scroll-smooth"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {impactItems.map((item, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-96 bg-white rounded-3xl shadow-xl overflow-hidden hover:-translate-y-2 transition"
              >
                <img src={item.img} alt="" className="h-56 w-full object-cover" />
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* NEW 4TH SECTION - 4 BOXES SIDE BY SIDE */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-600 text-lg">
              What drives us to deliver excellence every single day
            </p>
          </div>

          <div className="grid grid-cols-4 gap-6">
            
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white text-center hover:scale-105 transition-transform duration-300">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-3">Innovation</h3>
              <p className="text-blue-100 text-sm">
                Leading with cutting-edge solutions
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-8 text-white text-center hover:scale-105 transition-transform duration-300">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-3">Precision</h3>
              <p className="text-green-100 text-sm">
                Excellence in every detail
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-8 text-white text-center hover:scale-105 transition-transform duration-300">
              <div className="text-5xl mb-4">💡</div>
              <h3 className="text-xl font-bold mb-3">Creativity</h3>
              <p className="text-purple-100 text-sm">
                Thinking beyond boundaries
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-white text-center hover:scale-105 transition-transform duration-300">
              <div className="text-5xl mb-4">🌟</div>
              <h3 className="text-xl font-bold mb-3">Excellence</h3>
              <p className="text-orange-100 text-sm">
                Outstanding results always
              </p>
            </div>

          </div>

        </div>
      </section>

    
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>

    </div>
  );
}

export default AboutUs;
