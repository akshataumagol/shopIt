/*import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const OrderConfirmationPage = () => {
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/api/orders/${orderId}`
        );

        if (!res.ok) {
          throw new Error("Order not found");
        }

        const data = await res.json();
        setOrder(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) fetchOrder();
  }, [orderId]);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  if (error) {
    return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;
  }

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "auto" }}>
      <h1>✅ Order Confirmed</h1>
      <p><strong>Order ID:</strong> {order._id}</p>

      <h2>Items</h2>
      {order.items.map((item, i) => (
        <div key={i} style={{ marginBottom: "10px" }}>
          <p>{item.name}</p>
          <p>Qty: {item.quantity}</p>
          <p>Price: ${item.price}</p>
        </div>
      ))}

      <h3>Total: ${order.totalAmount}</h3>

      <Link to="/">Continue Shopping</Link>
    </div>
  );
};

export default OrderConfirmationPage;*/
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

export default OrderConfirmationPage;

