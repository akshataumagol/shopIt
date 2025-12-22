import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const BASE_URL = "https://shopit-56mz.onrender.com";

const steps = [
  { key: "processing", label: "Order Processing", icon: "⏳", emoji: "🔄" },
  { key: "shipped", label: "Shipped", icon: "📦", emoji: "✈️" },
  { key: "out_for_delivery", label: "Out for Delivery", icon: "🚚", emoji: "🚀" },
  { key: "delivered", label: "Delivered", icon: "✅", emoji: "🎉" },
];

const TrackOrder = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/orders/${orderId}`);
        if (!res.ok) throw new Error("Order not found");
        const data = await res.json();
        setOrder(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-black mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading order status...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center bg-white rounded-2xl shadow-lg p-8 max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h2>
          <p className="text-red-600 text-lg mb-6">{error}</p>
          <Link
            to="/"
            className="inline-block px-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const currentStepIndex = steps.findIndex(
    (step) => step.key === (order.status || "processing")
  );

  const currentStep = steps[currentStepIndex];
  const progressPercentage = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">

        {/* HEADER CARD */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <span className="text-4xl">{currentStep.emoji}</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Track Your Order
            </h1>
            <p className="text-gray-600 text-lg">
              Order ID: <span className="font-semibold text-gray-900">{order._id}</span>
            </p>
          </div>

          {/* PROGRESS BAR */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-700">Progress</span>
              <span className="text-sm font-semibold text-green-600">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* CURRENT STATUS BANNER */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
            <div className="flex items-center justify-center gap-3">
              <span className="text-3xl animate-pulse">{currentStep.icon}</span>
              <div className="text-center">
                <p className="text-sm text-green-700 font-semibold uppercase tracking-wide mb-1">
                  Current Status
                </p>
                <p className="text-2xl font-bold text-green-800 capitalize">
                  {(order.status || "processing").replaceAll("_", " ")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* TIMELINE CARD */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Journey</h2>
          
          <div className="space-y-6">
            {steps.map((step, index) => {
              const isCompleted = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;
              const isLast = index === steps.length - 1;

              return (
                <div key={step.key} className="relative">
                  <div className="flex items-start gap-4">
                    {/* Icon Circle */}
                    <div className="relative z-10 flex-shrink-0">
                      <div
                        className={`w-16 h-16 flex items-center justify-center rounded-full text-2xl transition-all duration-500 shadow-lg ${
                          isCompleted
                            ? "bg-gradient-to-br from-green-500 to-green-600 scale-110"
                            : "bg-gray-200"
                        } ${isCurrent ? "ring-4 ring-green-200 animate-pulse" : ""}`}
                      >
                        {step.icon}
                      </div>
                      
                      {/* Connecting Line */}
                      {!isLast && (
                        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-1 h-12">
                          <div className={`w-full h-full ${isCompleted ? "bg-green-500" : "bg-gray-300"}`}></div>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-2">
                      <div className={`rounded-xl p-5 border-2 transition-all duration-300 ${
                        isCompleted 
                          ? "bg-green-50 border-green-200" 
                          : "bg-gray-50 border-gray-200"
                      } ${isCurrent ? "shadow-md" : ""}`}>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className={`text-xl font-bold ${
                            isCompleted ? "text-gray-900" : "text-gray-400"
                          }`}>
                            {step.label}
                          </h3>
                          {isCompleted && (
                            <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                              isCurrent 
                                ? "bg-yellow-100 text-yellow-800" 
                                : "bg-green-100 text-green-800"
                            }`}>
                              {isCurrent ? "In Progress" : "Completed"}
                            </span>
                          )}
                        </div>
                        
                        {isCurrent && (
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <p className="text-sm text-green-700 font-medium">
                              Your order is currently at this stage
                            </p>
                          </div>
                        )}
                        
                        {isCompleted && !isCurrent && (
                          <p className="text-sm text-green-600 font-medium">
                            ✓ This step has been completed
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/"
              className="flex-1 px-8 py-4 bg-black text-white rounded-lg font-semibold text-center hover:bg-gray-800 transition-colors shadow-md"
            >
              Continue Shopping
            </Link>

            <Link
              to={`/order-confirmation/${order._id}`}
              className="flex-1 px-8 py-4 border-2 border-black text-black rounded-lg font-semibold text-center hover:bg-gray-100 transition-colors shadow-md"
            >
              View Order Details
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TrackOrder;
