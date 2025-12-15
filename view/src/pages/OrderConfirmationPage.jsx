import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { orderAPI } from "../utils/api";

const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const { clearCart } = useCart();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);

        // ✅ FIX: authenticated request
        const data = await orderAPI.getOrderById(orderId);
        setOrder(data);

        clearCart();
      } catch (err) {
        console.error("ORDER FETCH ERROR:", err);
        setError(err.message || "Failed to fetch order");
      } finally {
        setLoading(false);
      }
    };

    if (orderId) fetchOrder();
  }, [orderId, clearCart]);

  // ---------------- LOADING ----------------
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold">Loading order details...</p>
      </div>
    );
  }

  // ---------------- ERROR ----------------
  if (error || !order) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 text-xl mb-4">
            {error || "Order not found"}
          </p>
          <Link
            to="/"
            className="px-6 py-3 bg-black text-white rounded"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // ---------------- CALCULATIONS ----------------
  const subtotal = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shippingCost = order.shippingCost || 0;
  const tax = order.tax || 0;
  const discount = order.discount || 0;
  const total =
    order.totalAmount ||
    subtotal + shippingCost + tax - discount;

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded shadow">

        <h1 className="text-3xl font-bold text-emerald-600 mb-2">
          ✅ Order Confirmed
        </h1>

        <p className="text-gray-600 mb-6">
          Order ID: <span className="font-mono">{order._id}</span>
        </p>

        {/* ITEMS */}
        <h2 className="text-xl font-semibold mb-4">
          Purchased Items
        </h2>

        <div className="space-y-4">
          {order.items.map((item, idx) => (
            <div
              key={idx}
              className="flex gap-4 items-center border-b pb-4"
            >
              <img
                src={item.image || "https://placehold.co/80x100"}
                alt={item.name}
                className="w-20 h-24 object-cover rounded"
              />

              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity}
                </p>
                {item.size && (
                  <p className="text-sm text-gray-500">
                    Size: {item.size}
                  </p>
                )}
                {item.color && (
                  <p className="text-sm text-gray-500">
                    Color: {item.color}
                  </p>
                )}
              </div>

              <div className="font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* SUMMARY */}
        <div className="mt-6 border-t pt-4 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-xl font-bold">
            <span>Total Paid</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="mt-8 flex gap-4">
          <Link
            to="/"
            className="bg-black text-white px-6 py-3 rounded"
          >
            Continue Shopping
          </Link>

          <button
            onClick={() => window.print()}
            className="border px-6 py-3 rounded"
          >
            Print Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
