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
  const [savedCartItems, setSavedCartItems] = useState([]);

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
    if (!email || !cart.length) return;
    setSavedCartItems([...cart]);
    setCheckoutId(Date.now());
  };

  const handlePaymentSuccess = async (paymentDetails) => {
    setLoading(true);

    const itemsToSend = savedCartItems.length ? savedCartItems : cart;

    try {
      const formattedCart = itemsToSend.map((item) => ({
        productId: item._id || item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        size: item.size,
        color: item.color,
      }));

      const orderData = {
        email,
        shippingAddress,
        cart: formattedCart,
        subtotal,
        paymentDetails,
      };

      const res = await fetch(`${BASE_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error("Order failed");

      clearCart();
      navigate(`/order-confirmation/${data._id}`);
    } catch (err) {
      alert("Order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h1 className="text-3xl font-bold mb-6">Checkout</h1>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-4 p-3 border rounded"
              required
            />

            {Object.keys(shippingAddress).map((key) => (
              <input
                key={key}
                placeholder={key}
                value={shippingAddress[key]}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    [key]: e.target.value,
                  })
                }
                className="w-full mb-3 p-3 border rounded"
                required
              />
            ))}

            {!checkoutId && (
              <button
                onClick={handleCreateCheckout}
                className="w-full bg-black text-white py-3 rounded"
              >
                Continue to Payment
              </button>
            )}

            {checkoutId && (
              <PayPalButton
                amount={subtotal}
                onSuccess={handlePaymentSuccess}
                disabled={loading}
              />
            )}
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            {cart.map((item, i) => (
              <div key={i} className="flex justify-between mb-2">
                <span>
                  {item.name} × {item.quantity}
                </span>
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
