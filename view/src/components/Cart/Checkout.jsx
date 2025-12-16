import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import PayPalButton from "./PayPalButton";

const BASE_URL = "https://shopit-56mz.onrender.com";

function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();

  const [checkoutId, setCheckoutId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCreateCheckout = (e) => {
    e.preventDefault();

    if (!email) return alert("Please enter email");
    if (!cart.length) return alert("Cart is empty");

    setCheckoutId(Date.now());
  };

  const handlePaymentSuccess = async (paymentDetails) => {
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          shippingAddress,
          items: cart,
          subtotal,
          payment: paymentDetails,
        }),
      });

      const order = await res.json();

      if (!res.ok) {
        console.error(order);
        alert("Failed to place order");
        return;
      }

      clearCart();
      navigate(`/order-confirmation/${order._id}`);
    } catch (err) {
      console.error("CHECKOUT ERROR:", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* LEFT SIDE - Checkout Form */}
          <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-900">Checkout</h1>

            {/* Contact Details */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Contact Details
              </h3>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                required
              />
            </div>

            {/* Delivery Address */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Delivery Address
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={shippingAddress.firstName}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        firstName: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={shippingAddress.lastName}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        lastName: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                    required
                  />
                </div>

                <input
                  type="text"
                  placeholder="Address"
                  value={shippingAddress.address}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      address: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    value={shippingAddress.city}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        city: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Postal Code"
                    value={shippingAddress.postalCode}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        postalCode: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                    required
                  />
                </div>

                <input
                  type="text"
                  placeholder="Country"
                  value={shippingAddress.country}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      country: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                  required
                />

                <input
                  type="tel"
                  placeholder="Phone"
                  value={shippingAddress.phone}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      phone: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                  required
                />
              </div>
            </div>

            {!checkoutId && (
              <button
                onClick={handleCreateCheckout}
                className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Continue to Payment
              </button>
            )}

            {checkoutId && (
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Payment Method
                </h3>
                <PayPalButton
                  amount={subtotal}
                  onSuccess={handlePaymentSuccess}
                  disabled={loading}
                />
                {loading && (
                  <p className="text-center text-gray-500">
                    Processing your order...
                  </p>
                )}
              </div>
            )}
          </div>

          {/* RIGHT SIDE - Order Summary */}
          <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8 lg:sticky lg:top-8 h-fit">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              {cart.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 pb-4 border-b border-gray-200 last:border-0"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-28 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-500 mb-1">
                      Size: {item.size} | Color: {item.color}
                    </p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-200">
                <span>Total</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
*/
/*import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import PayPalButton from "./PayPalButton";

const BASE_URL = "https://shopit-56mz.onrender.com";

function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();

  const [checkoutId, setCheckoutId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCreateCheckout = (e) => {
    e.preventDefault();

    if (!email) return alert("Please enter email");
    if (!cart.length) return alert("Cart is empty");

    setCheckoutId(Date.now());
  };

  const handlePaymentSuccess = async (paymentDetails) => {
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          shippingAddress,
          items: cart,
          subtotal,
          payment: paymentDetails,
        }),
      });

      const order = await res.json();

      if (!res.ok) {
        console.error(order);
        alert("Failed to place order");
        return;
      }

      clearCart();

      // ✅ IMPORTANT: redirect AFTER order created
      navigate(`/order-confirmation/${order._id}`);
    } catch (err) {
      console.error("CHECKOUT ERROR:", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
     
      <div>
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>

        <form
          onSubmit={handleCreateCheckout}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border rounded col-span-full"
            required
          />

          {Object.keys(shippingAddress).map((field) => (
            <input
              key={field}
              type="text"
              placeholder={field.replace(/([A-Z])/g, " $1")}
              value={shippingAddress[field]}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  [field]: e.target.value,
                })
              }
              className="p-3 border rounded"
              required
            />
          ))}

          <button
            type="submit"
            className="col-span-full bg-black text-white py-3 rounded"
          >
            Continue to Payment
          </button>
        </form>

        {checkoutId && (
          <div className="mt-6">
            <PayPalButton
              amount={subtotal}
              onSuccess={handlePaymentSuccess}
              disabled={loading}
            />
          </div>
        )}
      </div>

     
      <div className="bg-white border rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

        {cart.map((item, i) => (
          <div key={i} className="flex justify-between mb-2">
            <span>{item.name} x {item.quantity}</span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}

        <hr className="my-4" />
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>₹{subtotal}</span>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
*/
