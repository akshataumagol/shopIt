import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const BASE_URL = "https://shopit-56mz.onrender.com";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/api/orders/${orderId}`);
        
        if (!res.ok) {
          throw new Error("Failed to fetch order");
        }
        
        const data = await res.json();
        setOrder(data);
        
        // Clear cart after successful order
        clearCart();
      } catch (err) {
        console.error("ORDER FETCH ERROR:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId, clearCart]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <p className="text-2xl font-semibold text-red-500 mb-4">
            {error || "Order not found"}
          </p>
          <Link
            to="/"
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors inline-block"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // Calculate totals
  const subtotal = order.items.reduce(
    (sum, item) => sum + (item.price * item.quantity),
    0
  );
  
  const shippingCost = order.shippingCost || 0;
  const tax = order.tax || 0;
  const discount = order.discount || 0;
  const total = order.totalAmount || (subtotal + shippingCost + tax - discount);

  // Calculate estimated delivery date
  const estimatedDelivery = (() => {
    const d = new Date(order.createdAt);
    d.setDate(d.getDate() + 7); // 7 days delivery
    return d.toLocaleDateString("en-US", { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  })();

  const orderDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-lg text-gray-600">
            Thank you for your purchase. Your order has been received.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: ORDER DETAILS */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Info Card */}
            <div className="bg-white border rounded-xl shadow-sm p-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6 pb-6 border-b">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-1">
                    Order #{order._id?.slice(-8).toUpperCase()}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Placed on {orderDate}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    order.orderStatus === 'confirmed' 
                      ? 'bg-emerald-100 text-emerald-700'
                      : order.orderStatus === 'pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {order.orderStatus?.charAt(0).toUpperCase() + order.orderStatus?.slice(1)}
                  </span>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
                <p className="text-emerald-800 font-medium">
                  📦 Estimated Delivery: {estimatedDelivery}
                </p>
              </div>

              {/* Item List */}
              <h3 className="text-lg font-semibold mb-4">Order Items</h3>
              <div className="space-y-4">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 border-b pb-4 last:border-b-0"
                  >
                    <img
                      src={item.image || 'https://placehold.co/100x120?text=Product'}
                      alt={item.name}
                      className="w-20 h-24 object-cover rounded-lg border"
                      onError={(e) => {
                        e.target.src = 'https://placehold.co/100x120?text=Product';
                      }}
                    />

                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{item.name}</h4>
                      {(item.color || item.size) && (
                        <p className="text-gray-500 text-sm mt-1">
                          {item.color && <span>{item.color}</span>}
                          {item.color && item.size && <span> | </span>}
                          {item.size && <span>Size: {item.size}</span>}
                        </p>
                      )}
                      <p className="text-sm text-gray-500 mt-1">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment & Delivery Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Payment Info */}
              <div className="bg-white border rounded-xl shadow-sm p-6">
                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                  </svg>
                  Payment Information
                </h4>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Method:</span>
                    <span className="font-medium capitalize">
                      {order.payment?.method || order.paymentMethod || "Card"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium text-emerald-600 capitalize">
                      {order.payment?.status || order.paymentStatus || "Paid"}
                    </span>
                  </div>
                  {order.payment?.transactionId && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Transaction ID:</span>
                      <span className="font-mono">
                        {order.payment.transactionId.slice(0, 16)}...
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Delivery Info */}
              <div className="bg-white border rounded-xl shadow-sm p-6">
                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  Shipping Address
                </h4>
                <div className="text-gray-700 space-y-1">
                  {order.shippingAddress?.name && (
                    <p className="font-medium">{order.shippingAddress.name}</p>
                  )}
                  <p>{order.shippingAddress?.address || order.shippingAddress?.street}</p>
                  <p>
                    {order.shippingAddress?.city}
                    {order.shippingAddress?.state && `, ${order.shippingAddress.state}`}
                  </p>
                  <p>
                    {order.shippingAddress?.country} - {order.shippingAddress?.postalCode || order.shippingAddress?.zipCode}
                  </p>
                  {order.shippingAddress?.phone && (
                    <p className="mt-2 text-gray-600">
                      Phone: {order.shippingAddress.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: ORDER SUMMARY */}
          <div className="lg:col-span-1">
            <div className="bg-white border rounded-xl shadow-sm p-6 sticky top-6">
              <h3 className="text-xl font-semibold mb-6 border-b pb-4">
                Order Summary
              </h3>

              <div className="space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal ({order.items.length} items)</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>

                {/* Shipping */}
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className={`font-medium ${shippingCost === 0 ? 'text-emerald-600' : ''}`}>
                    {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>

                {/* Tax */}
                {tax > 0 && (
                  <div className="flex justify-between text-gray-700">
                    <span>Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                )}

                {/* Discount */}
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount</span>
                    <span className="font-medium">-${discount.toFixed(2)}</span>
                  </div>
                )}

                {/* Total */}
                <div className="flex justify-between text-xl font-bold border-t pt-4">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 space-y-3">
                <button
                  onClick={() => window.print()}
                  className="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
                  </svg>
                  Print Order
                </button>
                
                <Link
                  to="/"
                  className="w-full px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-center block"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Email Confirmation Note */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>📧 Confirmation sent!</strong><br />
                  Check your email for order details and tracking information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
