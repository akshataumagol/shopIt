/*import React from "react";
import { IoMdClose } from "react-icons/io";
import CartContents from "../Cart/CartContents";

function CartDrawer({ drawerOpen, toggleCartDrawer, user }) {
  return (
    <div
      className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[33rem] h-full bg-white shadow-lg 
        transform transition-transform duration-300 flex flex-col z-50 
        ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
    >
     
      <div className="flex justify-end p-4">
        <button onClick={toggleCartDrawer}>
          <IoMdClose className="h-6 w-6 text-gray-600" />
        </button>
      </div>

     
      <div className="flex-grow overflow-y-auto p-4">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        <CartContents user={user} />
      </div>

     
      <div className="p-4 bg-white border-t sticky bottom-0">
        <button
          onClick={() => {
            if (!user) {
              window.location.href = "/login";
            } else {
              window.location.href = "/checkout";
            }
          }}
          className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          Checkout
        </button>
        <p className="text-sm text-gray-500 text-center mt-2">
          Shipping, taxes, and discount code calculated at checkout
        </p>
      </div>
    </div>
  );
}

export default CartDrawer;*/
import React from "react";
import { IoMdClose } from "react-icons/io";
import CartContents from "../Cart/CartContents";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function CartDrawer({ drawerOpen, toggleCartDrawer }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    toggleCartDrawer();

    if (!user) {
      // ✅ FIX: pass redirect using state
      navigate("/login", { state: { from: "/checkout" } });
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[33rem] h-full bg-white shadow-lg
        transform transition-transform duration-300 flex flex-col z-50
        ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="flex justify-end p-4">
        <button onClick={toggleCartDrawer}>
          <IoMdClose className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      <div className="flex-grow overflow-y-auto p-4">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        <CartContents />
      </div>

      <div className="p-4 bg-white border-t">
        <button
          onClick={handleCheckout}
          className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800"
        >
          Checkout
        </button>

        <p className="text-sm text-gray-500 text-center mt-2">
          Shipping, taxes, and discounts calculated at checkout
        </p>
      </div>
    </div>
  );
}

export default CartDrawer;



