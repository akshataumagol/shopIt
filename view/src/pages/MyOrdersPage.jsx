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

  if (loading) return <p>Loading orders...</p>;

  // ✅ NO ORDERS CASE
  if (orders.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold">No orders yet</h2>
        <p className="text-gray-500 mt-2">
          You haven’t placed any orders.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>

      {orders.map(order => (
        <div
          key={order._id}
          className="border rounded p-4 mb-4 bg-white"
        >
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Total:</strong> ₹{order.total}</p>
          <p><strong>Status:</strong> {order.payment.status}</p>
          <p className="text-sm text-gray-500">
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}

export default MyOrdersPage;
