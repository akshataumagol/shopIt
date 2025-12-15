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

    if (!email) {
      alert("Please enter email");
      return;
    }

    if (!cart.length) {
      alert("Cart is empty");
      return;
    }

    setCheckoutId(Date.now());
  };

  const handlePaymentSuccess = async (paymentDetails) => {
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
        console.error("ORDER SAVE FAILED:", order);
        alert("Failed to place order");
        return;
      }

      clearCart();
      navigate(`/order-confirmation/${order._id}`);
    } catch (error) {
      console.error("CHECKOUT ERROR:", error);
      alert("Something went wrong while placing order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* LEFT: Checkout Form */}
      <div>
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>

        <form
          onSubmit={handleCreateCheckout}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Email */}
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border rounded col-span-full"
            required
          />

          {/* Shipping Address */}
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
              className="p-2 border rounded"
              required
            />
          ))}

          <button
            type="submit"
            className="col-span-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            Continue to Payment
          </button>
        </form>

        {/* PayPal */}
        {checkoutId && (
          <div className="mt-6">
            <PayPalButton
              amount={subtotal}
              onSuccess={handlePaymentSuccess}
              disabled={loading}
            />
          </div>
        )}

        {loading && (
          <p className="mt-4 text-center text-gray-500">
            Processing your order...
          </p>
        )}
      </div>

      {/* RIGHT: Order Summary */}
      <div className="bg-gray-50 p-6 rounded-lg h-fit">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          <>
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b py-3"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <p className="font-medium">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            ))}

            <div className="flex justify-between mt-4 text-lg font-semibold">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between text-lg">
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <div className="flex justify-between mt-2 text-xl font-bold border-t pt-4">
              <span>Total</span>
              <span>₹{subtotal}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Checkout;
