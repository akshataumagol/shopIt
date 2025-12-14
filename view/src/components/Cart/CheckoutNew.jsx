import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useCart } from '../../context/CartContext';
import { orderAPI } from '../../utils/api';
import PayPalButton from './PayPalButton';

function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart, loading: cartLoading } = useCart();
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
  });

  const subtotal = cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
  const tax = subtotal * 0.1;
  const shipping = 10;
  const total = subtotal + tax + shipping;

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateOrder = async (e) => {
    e.preventDefault();

    if (!cart || cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setIsCreatingOrder(true);
    try {
      const orderData = {
        items: cart,
        shippingAddress,
        total,
        subtotal,
        tax,
        shipping,
      };

      const response = await orderAPI.create(orderData);
      setOrderId(response._id);
      toast.success('Order created successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to create order');
      console.error(error);
    } finally {
      setIsCreatingOrder(false);
    }
  };

  const handlePaymentSuccess = async (details) => {
    try {
      const response = await orderAPI.paypalCapture(orderId, {
        paypalOrderId: details.id,
      });
      toast.success('Payment successful!');
      await clearCart();
      navigate('/order-confirmation', { state: { orderId: response._id } });
    } catch (error) {
      toast.error(error.message || 'Payment capture failed');
    }
  };

  if (cartLoading) {
    return <div className="p-6 text-center">Loading cart...</div>;
  }

  if (!cart || cart.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="mb-4">Your cart is empty</p>
        <button onClick={() => navigate('/')} className="bg-black text-white px-6 py-2 rounded">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6">
      {/* Checkout Form */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Checkout</h2>

        {!orderId ? (
          <form onSubmit={handleCreateOrder}>
            {/* Contact Details */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={shippingAddress.firstName}
                    onChange={handleAddressChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={shippingAddress.lastName}
                    onChange={handleAddressChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={shippingAddress.address}
                  onChange={handleAddressChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={shippingAddress.city}
                    onChange={handleAddressChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={shippingAddress.postalCode}
                    onChange={handleAddressChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Country</label>
                <input
                  type="text"
                  name="country"
                  value={shippingAddress.country}
                  onChange={handleAddressChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={shippingAddress.phone}
                  onChange={handleAddressChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isCreatingOrder}
              className="w-full bg-black text-white py-2 rounded font-semibold hover:bg-gray-800 disabled:opacity-50"
            >
              {isCreatingOrder ? 'Creating Order...' : 'Continue to Payment'}
            </button>
          </form>
        ) : (
          <PayPalButton orderId={orderId} amount={total} onSuccess={handlePaymentSuccess} />
        )}
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 rounded-lg p-6 h-fit">
        <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

        {/* Cart Items */}
        <div className="mb-6 border-b pb-4">
          {cart.map((item) => (
            <div key={item.productId} className="flex justify-between mb-4">
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-600">
                  Qty: {item.quantity} {item.size && `| Size: ${item.size}`}{' '}
                  {item.color && `| Color: ${item.color}`}
                </p>
              </div>
              <p className="font-semibold">${((item.price || 0) * (item.quantity || 1)).toFixed(2)}</p>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div className="space-y-2 mb-6">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (10%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="border-t pt-2 flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
