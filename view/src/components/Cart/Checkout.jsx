
/*import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import PayPalButton from "./PayPalButton";

function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [checkoutId, setCheckoutId] = useState(null);
  const [loading, setLoading] = useState(false);

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
    if (!cart.length) return alert("Cart is empty");
    setCheckoutId(123); // simulate checkout start
  };

  const handlePaymentSuccess = async (paymentDetails) => {
    setLoading(true);
    try {
      // POST order to backend
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "123", // optional
          email: "user@example.com",
          shippingAddress,
          cart,
          subtotal,
          paymentDetails,
        }),
      });

      const order = await res.json();

      if (!res.ok) {
        console.error("Failed to save order", order);
        alert("Failed to save order");
        setLoading(false);
        return;
      }

      clearCart();

      // Navigate with order ID
      navigate(`/order-confirmation/${order._id}`);
    } catch (err) {
      console.error("Error saving order:", err);
      alert("Error saving order");
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

          <div className="mb-4">
            <label>Email</label>
            <input
              type="email"
              value="user@example.com"
              className="w-full p-2 border rounded"
              disabled
            />
          </div>

          <h3 className="text-lg mb-4">Delivery Address</h3>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="First Name"
              value={shippingAddress.firstName}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, firstName: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={shippingAddress.lastName}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, lastName: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <input
            type="text"
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
              type="text"
              placeholder="City"
              value={shippingAddress.city}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, city: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Postal Code"
              value={shippingAddress.postalCode}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, postalCode: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <input
            type="text"
            placeholder="Country"
            value={shippingAddress.country}
            onChange={(e) =>
              setShippingAddress({ ...shippingAddress, country: e.target.value })
            }
            className="w-full p-2 border rounded mb-4"
            required
          />

          <input
            type="tel"
            placeholder="Phone"
            value={shippingAddress.phone}
            onChange={(e) =>
              setShippingAddress({ ...shippingAddress, phone: e.target.value })
            }
            className="w-full p-2 border rounded mb-4"
            required
          />

          <div className="mt-6">
            {!checkoutId ? (
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded"
              >
                Continue to Payment
              </button>
            ) : (
              <div>
                <h3 className="text-lg mb-4">Pay with PayPal</h3>
                <PayPalButton
                  amount={subtotal}
                  onSuccess={handlePaymentSuccess}
                  onError={() => alert("Payment failed.")}
                />
                {loading && <p className="text-gray-500 mt-2">Processing...</p>}
              </div>
            )}
          </div>
        </form>
      </div>

      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg mb-4">Order Summary</h3>

        {cart.map((product, index) => (
          <div
            key={index}
            className="flex items-start justify-between py-2 border-b"
          >
            <img src={product.image} className="w-20 h-24 object-cover mr-4" />
            <div>
              <h4 className="font-medium">{product.name}</h4>
              <p className="text-sm text-gray-500">Size: {product.size}</p>
              <p className="text-sm text-gray-500">Color: {product.color}</p>
            </div>
            <p>${(product.price * product.quantity).toLocaleString()}</p>
          </div>
        ))}

        <div className="flex justify-between text-lg mt-4">
          <p>Total</p>
          <p>${subtotal.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

export default Checkout;*/
import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import PayPalButton from "./PayPalButton";

function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [checkoutId, setCheckoutId] = useState(null);
  const [loading, setLoading] = useState(false);

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
    if (!cart.length) return alert("Cart is empty");
    setCheckoutId(123); // simulate checkout start
  };

  const handlePaymentSuccess = async (paymentDetails) => {
    setLoading(true);
    try {
      // POST order to backend
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "123", // optional, if you have auth
          email: "user@example.com",
          shippingAddress,
          cart,
          subtotal,
          paymentDetails,
        }),
      });

      const order = await res.json();

      if (!res.ok) {
        console.error("Failed to save order", order);
        alert("Failed to save order");
        setLoading(false);
        return;
      }

      clearCart();

      // Navigate to order confirmation with order ID
      navigate(`/order-confirmation/${order._id}`);
    } catch (err) {
      console.error("Error saving order:", err);
      alert("Error saving order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6">
      {/* LEFT: Shipping Form */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6">Checkout</h2>
        <form onSubmit={handleCreateCheckout}>
          <h3 className="text-lg mb-4">Contact Details</h3>
          <div className="mb-4">
            <label>Email</label>
            <input
              type="email"
              value="user@example.com"
              className="w-full p-2 border rounded"
              disabled
            />
          </div>

          <h3 className="text-lg mb-4">Delivery Address</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="First Name"
              value={shippingAddress.firstName}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, firstName: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={shippingAddress.lastName}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, lastName: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <input
            type="text"
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
              type="text"
              placeholder="City"
              value={shippingAddress.city}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, city: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Postal Code"
              value={shippingAddress.postalCode}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, postalCode: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <input
            type="text"
            placeholder="Country"
            value={shippingAddress.country}
            onChange={(e) =>
              setShippingAddress({ ...shippingAddress, country: e.target.value })
            }
            className="w-full p-2 border rounded mb-4"
            required
          />

          <input
            type="tel"
            placeholder="Phone"
            value={shippingAddress.phone}
            onChange={(e) =>
              setShippingAddress({ ...shippingAddress, phone: e.target.value })
            }
            className="w-full p-2 border rounded mb-4"
            required
          />

          <div className="mt-6">
            {!checkoutId ? (
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded"
              >
                Continue to Payment
              </button>
            ) : (
              <div>
                <h3 className="text-lg mb-4">Pay with PayPal</h3>
                <PayPalButton
                  amount={subtotal}
                  onSuccess={handlePaymentSuccess}
                  onError={() => alert("Payment failed.")}
                />
                {loading && <p className="text-gray-500 mt-2">Processing...</p>}
              </div>
            )}
          </div>
        </form>
      </div>

      {/* RIGHT: Order Summary */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg mb-4">Order Summary</h3>
        {cart.map((product, index) => (
          <div
            key={index}
            className="flex items-start justify-between py-2 border-b"
          >
            <img src={product.image} className="w-20 h-24 object-cover mr-4" />
            <div>
              <h4 className="font-medium">{product.name}</h4>
              <p className="text-sm text-gray-500">Size: {product.size}</p>
              <p className="text-sm text-gray-500">Color: {product.color}</p>
            </div>
            <p>${(product.price * product.quantity).toLocaleString()}</p>
          </div>
        ))}

        <div className="flex justify-between text-lg mt-4">
          <p>Total</p>
          <p>${subtotal.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

