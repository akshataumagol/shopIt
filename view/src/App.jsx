import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Checkout from "./components/Cart/Checkout";
import OrderConfirmation from "./pages/OrderConfirmationPage";
import CollectionPage from "./pages/CollectionPage";
import ProductDetails from "./components/Products/ProductDetails";
import { Toaster } from "sonner";

function App() {
  const [user, setUser] = useState(null);

  return (
    <CartProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home user={user} />} />
            <Route path="login" element={<Login setUser={setUser} />} />
            <Route path="register" element={<Register setUser={setUser} />} />
            <Route path="profile" element={<Profile user={user} />} />
            <Route path="checkout" element={<Checkout user={user} />} />

            {/* Correct Order Confirmation Route with :orderId */}
            <Route
              path="order-confirmation/:orderId"
              element={<OrderConfirmation />}
            />

            <Route
              path="collection/:category/:subCategory"
              element={<CollectionPage />}
            />
            <Route path="/products/:id" element={<ProductDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
