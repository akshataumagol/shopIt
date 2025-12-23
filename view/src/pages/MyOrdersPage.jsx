import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://shopit-56mz.onrender.com";

function MyOrdersPage({ email }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!email) return;

    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/orders/user/${email}`);
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [email]);

  if (loading) {
    return (
      <div className="flex justify-center py-10 text-gray-500">
        Loading orders...
      </div>
    );
  }

  /* 🟢 NO ORDERS */
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-2">No Orders Yet</h2>
        <p className="text-gray-500 mb-6">
          You haven’t placed any orders yet.
        </p>
        <a
          href="/"
          className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
        >
          Continue Shopping
        </a>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-2">
              <p className="font-semibold">Order #{order._id.slice(-6)}</p>
              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  order.payment.status === "Paid"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.payment.status}
              </span>
            </div>

            <p className="text-gray-600 text-sm mb-1">
              Ordered on{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>

            <p className="font-semibold mt-2">
              Total: ₹{order.total.toFixed(2)}
            </p>

            <div className="mt-4">
              <a
                href={`/track-order/${order._id}`}
                className="text-sm text-blue-600 hover:underline"
              >
                Track Order →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyOrdersPage;
