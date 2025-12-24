import React from "react";

function AboutUs() {
  return (
    <div className="bg-white text-gray-800">
      
      {/* SECTION 1 */}
      <section className="py-20 bg-gray-50">
        <div
          className="max-w-6xl mx-auto px-6 text-center"
          style={{
            animation: "fadeIn 0.8s ease-out forwards",
          }}
        >
          <h1 className="text-4xl font-bold mb-4 transition-transform duration-500 hover:scale-105">
            About Us
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We create a seamless and secure shopping experience by delivering
            quality products that fit your everyday needs.
          </p>
        </div>
      </section>

      {/* SECTION 2 */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Trusted Quality",
              desc: "Every product is carefully selected to meet high standards.",
            },
            {
              title: "Secure Payments",
              desc: "Safe and reliable payment methods you can trust.",
            },
            {
              title: "Fast Delivery",
              desc: "Quick shipping with real-time order tracking.",
            },
            {
              title: "Customer Support",
              desc: "Friendly support whenever you need assistance.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="border rounded-xl p-6 text-center transform transition-all duration-500 hover:-translate-y-2 hover:shadow-lg"
              style={{
                animation: `fadeIn 0.8s ease-out forwards`,
                animationDelay: `${index * 0.15}s`,
                opacity: 0,
              }}
            >
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INLINE KEYFRAMES */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
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
