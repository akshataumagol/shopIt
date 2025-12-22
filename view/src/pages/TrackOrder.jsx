import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const BASE_URL = "https://shopit-56mz.onrender.com";

const steps = [
  { key: "processing", label: "Order Processing" },
  { key: "shipped", label: "Shipped" },
  { key: "out_for_delivery", label: "Out for Delivery" },
  { key: "delivered", label: "Delivered" },
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading order status...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }

  const currentStepIndex = steps.findIndex(
    (step) => step.key === (order.status || "processing")
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6 lg:p-8">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Track Your Order
          </h1>
          <p className="text-gray-600">
            Order ID: <span className="font-medium">{order._id}</span>
          </p>
        </div>

        {/* CURRENT STATUS */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8 text-center">
          <p className="text-sm text-green-800 font-medium">
            Current Status
          </p>
          <p className="text-xl font-semibold text-green-700 capitalize">
            {(order.status || "processing").replaceAll("_", " ")}
          </p>
        </div>

        {/* TRACKING STEPS */}
        <div className="space-y-6 mb-10">
          {steps.map((step, index) => (
            <div key={step.key} className="flex items-center gap-4">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-white
                  ${
                    index <= currentStepIndex
                      ? "bg-green-600"
                      : "bg-gray-300"
                  }`}
              >
                {index + 1}
              </div>

              <div className="flex-1">
                <p
                  className={`font-semibold ${
                    index <= currentStepIndex
                      ? "text-green-700"
                      : "text-gray-500"
                  }`}
                >
                  {step.label}
                </p>
                {index === currentStepIndex && (
                  <p className="text-sm text-gray-500">
                    Your order is currently in this stage
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="px-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </Link>

          <Link
            to={`/order-confirmation/${order._id}`}
            className="px-8 py-3 border border-black text-black rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            View Order Details
          </Link>
        </div>

      </div>
    </div>
  );
};

export default TrackOrder;
