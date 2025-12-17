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

  const subtotal = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);

  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const handleCreateCheckout = (e) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      alert("Enter valid email");
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          shippingAddress,
          cart,
          subtotal,
          paymentDetails,
        }),
      });

      const order = await res.json();

      if (!res.ok) {
        console.error(order);
        alert("Order failed");
        return;
      }

      clearCart();
      navigate(`/order-confirmation/${order._id}`);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6">
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6">Checkout</h2>

        <form onSubmit={handleCreateCheckout}>
          <h3 className="text-lg mb-4">Contact Details</h3>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            required
          />

          <h3 className="text-lg mb-4">Delivery Address</h3>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              placeholder="First Name"
              value={shippingAddress.firstName}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, firstName: e.target.value })
              }
              className="p-2 border rounded"
              required
            />
            <input
              placeholder="Last Name"
              value={shippingAddress.lastName}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, lastName: e.target.value })
              }
              className="p-2 border rounded"
              required
            />
          </div>

          <input
            placeholder="Address"
            value={shippingAddress.address}
            onChange={(e) =>
              setShippingAddress({ ...shippingAddress, address: e.target.value })
            }
            className="w-full p-2 border rounded mb-4"
            required
          />

          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              placeholder="City"
              value={shippingAddress.city}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, city: e.target.value })
              }
              className="p-2 border rounded"
              required
            />
            <input
              placeholder="Postal Code"
              value={shippingAddress.postalCode}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, postalCode: e.target.value })
              }
              className="p-2 border rounded"
              required
            />
          </div>

          <input
            placeholder="Country"
            value={shippingAddress.country}
            onChange={(e) =>
              setShippingAddress({ ...shippingAddress, country: e.target.value })
            }
            className="w-full p-2 border rounded mb-4"
            required
          />

          <input
            placeholder="Phone"
            value={shippingAddress.phone}
            onChange={(e) =>
              setShippingAddress({ ...shippingAddress, phone: e.target.value })
            }
            className="w-full p-2 border rounded mb-4"
            required
          />

          {!checkoutId ? (
            <button className="w-full bg-black text-white py-3 rounded">
              Continue to Payment
            </button>
          ) : (
            <PayPalButton
              amount={subtotal}
              onSuccess={handlePaymentSuccess}
            />
          )}

          {loading && <p className="mt-2 text-gray-500">Processing…</p>}
        </form>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg mb-4">Order Summary</h3>

        {cart.map((p, i) => (
          <div key={i} className="flex justify-between mb-2">
            <span>{p.name} × {p.quantity}</span>
            <span>${p.price * p.quantity}</span>
          </div>
        ))}

        <div className="flex justify-between mt-4 font-bold">
          <span>Total</span>
          <span>${subtotal}</span>
        </div>
      </div>
    </div>
  );
}

export default Checkout;



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
