import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const BASE_URL = "https://shopit-56mz.onrender.com";

const OrderConfirmationPage = () => {
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
    if (orderId) fetchOrder();
  }, [orderId]);

  const calculateEstimatedDelivery = (date) => {
    const d = new Date(date);
    d.setDate(d.getDate() + 7);
    return d.toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <p className="text-xl font-semibold text-red-600">{error}</p>
          <Link
            to="/"
            className="inline-block mt-6 px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Thank You!</h1>
          <p className="text-lg text-gray-600">
            Your order has been confirmed
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8 mb-6">
          <div className="flex flex-wrap justify-between items-start gap-4 mb-6 pb-6 border-b border-gray-200">
            <div>
              <p className="text-sm text-gray-500 mb-1">Order Number</p>
              <p className="text-xl font-bold text-gray-900">{order._id}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 mb-1">Order Date</p>
              <p className="font-semibold text-gray-900">
                {new Date(order.createdAt).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Estimated Delivery */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-green-800 font-medium">
              📦 Estimated Delivery:{" "}
              {calculateEstimatedDelivery(order.createdAt)}
            </p>
          </div>

          {/* Order Items */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Order Items
            </h3>
            <div className="space-y-4">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 pb-4 border-b border-gray-200 last:border-0"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-500 mb-1">
                      {item.color} | Size: {item.size}
                    </p>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="border-t border-gray-200 pt-4 space-y-2 mb-6">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>
                ₹{(order.totalAmount || order.subtotal).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-200">
              <span>Total</span>
              <span>
                ₹{(order.totalAmount || order.subtotal).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Payment & Delivery Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                Payment Information
              </h4>
              <div className="space-y-1 text-gray-600">
                <p className="font-medium">
                  Method: {order.payment?.method || "PayPal"}
                </p>
                <p className="inline-flex items-center">
                  Status:
                  <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">
                    {order.payment?.status || "completed"}
                  </span>
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                Delivery Address
              </h4>
              <div className="space-y-1 text-gray-600">
                <p className="font-medium">
                  {order.shippingAddress.firstName}{" "}
                  {order.shippingAddress.lastName}
                </p>
                <p>{order.shippingAddress.address}</p>
                <p>
                  {order.shippingAddress.city},{" "}
                  {order.shippingAddress.postalCode}
                </p>
                <p>{order.shippingAddress.country}</p>
                <p>{order.shippingAddress.phone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/"
            className="px-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </Link>
          <button className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-colors">
            Track Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
/*import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const BASE_URL = "https://shopit-56mz.onrender.com";

const OrderConfirmationPage = () => {
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

    if (orderId) fetchOrder();
  }, [orderId]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto" }}>
      <h1>✅ Order Confirmed</h1>
      <p><strong>Order ID:</strong> {order._id}</p>

      <h2>Items</h2>
      {order.items.map((item, i) => (
        <div key={i}>
          {item.name} × {item.quantity} — ₹{item.price}
        </div>
      ))}

      <h3>Total: ₹{order.totalAmount || order.subtotal}</h3>

      <Link to="/">Continue Shopping</Link>
    </div>
  );
};

export default OrderConfirmationPage;*/

