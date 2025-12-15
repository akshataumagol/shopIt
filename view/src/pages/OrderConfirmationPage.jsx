import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BASE_URL = "https://shopit-56mz.onrender.com";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/orders/${orderId}`);
        if (!res.ok) throw new Error("Failed to fetch order");
        const data = await res.json();
        setOrder(data);
      } catch (err) {
        console.error("ORDER FETCH ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-medium">Loading order...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-red-500">Order not found.</p>
      </div>
    );
  }

  const subtotal = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const estimatedDelivery = (() => {
    const d = new Date(order.createdAt);
    d.setDate(d.getDate() + 10);
    return d.toLocaleDateString();
  })();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-10">
        Thank You For Your Order
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: ORDER DETAILS */}
        <div className="lg:col-span-2 bg-white border rounded-xl p-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between mb-6 gap-2">
            <h2 className="text-xl font-semibold">
              Order ID: {order._id}
            </h2>
            <p className="text-gray-500">
              Order Date:{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>

          <p className="text-emerald-700 text-sm mb-6">
            Estimated Delivery: {estimatedDelivery}
          </p>

          {/* Item List */}
          <div className="space-y-4">
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 border-b pb-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-24 object-cover rounded-lg border"
                />

                <div className="flex-1">
                  <h4 className="font-semibold">{item.name}</h4>
                  {(item.color || item.size) && (
                    <p className="text-gray-500 text-sm">
                      {item.color} {item.size && `| ${item.size}`}
                    </p>
                  )}
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="font-medium">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          {/* Payment & Delivery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div>
              <h4 className="text-lg font-semibold mb-2">Payment</h4>
              <p>Method: {order.payment?.method || "PayPal"}</p>
              <p>Status: {order.payment?.status || "Completed"}</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2">Delivery</h4>
              <p>{order.shippingAddress?.address}</p>
              <p>
                {order.shippingAddress?.city},{" "}
                {order.shippingAddress?.country}
              </p>
              <p>{order.shippingAddress?.postalCode}</p>
              <p>{order.shippingAddress?.phone}</p>
            </div>
          </div>
        </div>

        {/* RIGHT: ORDER SUMMARY */}
        <div className="bg-gray-50 border rounded-xl p-6 h-fit">
          <h3 className="text-xl font-semibold mb-6">
            Order Summary
          </h3>

          <div className="space-y-3 text-lg">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="text-green-600">Free</span>
            </div>

            <div className="flex justify-between text-xl font-bold border-t pt-4">
              <span>Total</span>
              <span>₹{subtotal}</span>
            </div>
          </div>

          <div className="mt-6 text-sm text-gray-500">
            You’ll receive an email confirmation shortly.
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
