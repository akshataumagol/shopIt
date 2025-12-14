import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/orders/${orderId}`);
        const data = await res.json();
        setOrder(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (loading) return <p>Loading order...</p>;
  if (!order) return <p>Order not found.</p>;

  const calculateEstimatedDelivery = (date) => {
    const d = new Date(date);
    d.setDate(d.getDate() + 10);
    return d.toLocaleDateString();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
        Thank You For Your Order
      </h1>

      <div className="p-6 rounded-lg border">
        <div className="flex justify-between mb-6">
          <h2 className="text-xl font-semibold">Order ID: {order._id}</h2>
          <p className="text-gray-500">
            Order Date: {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>

        <p className="text-emerald-700 text-sm mb-6">
          Estimated Delivery: {calculateEstimatedDelivery(order.createdAt)}
        </p>

        {order.items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between mb-4 p-2 border rounded"
          >
            <img src={item.image} className="w-16 h-16 rounded" />
            <div className="flex-1 ml-4">
              <h4 className="font-semibold">{item.name}</h4>
              <p className="text-gray-500">{item.color} | {item.size}</p>
            </div>
            <p>Qty: {item.quantity}</p>
            <p className="font-medium">${item.price * item.quantity}</p>
          </div>
        ))}

        <div className="grid grid-cols-2 gap-6 mt-8">
          <div>
            <h4 className="text-lg font-semibold mb-2">Payment</h4>
            <p>{order.payment.method}</p>
            <p>Status: {order.payment.status}</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Delivery</h4>
            <p>{order.shippingAddress.address}</p>
            <p>{order.shippingAddress.city}, {order.shippingAddress.country}</p>
            <p>{order.shippingAddress.postalCode}</p>
            <p>{order.shippingAddress.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
