/*import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import TrackOrder from "./pages/TrackOrder";
import Checkout from "./components/Cart/Checkout";
import OrderConfirmation from "./pages/OrderConfirmationPage";
import CollectionPage from "./pages/CollectionPage";
import ProtectedRoute from ".././routes/ProtectedRoute";
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
            <Route path="/track-order/:orderId" element={<TrackOrder />} />
             path="/checkout"
  element={
    <ProtectedRoute>
      <Checkout />
    </ProtectedRoute>
  }
/>
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

export default App;*/
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AboutUs from "./pages/AboutUs";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import TrackOrder from "./pages/TrackOrder";
import Checkout from "./components/Cart/Checkout";
import OrderConfirmation from "./pages/OrderConfirmationPage";
import CollectionPage from "./pages/CollectionPage";
import ProductDetails from "./components/Products/ProductDetails";
import ProtectedRoute from "./components/Common/ProtectedRoute";
import { Toaster } from "sonner";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
            <Route path="/about-us" element={<AboutUs />} />

            <Route path="/track-order/:orderId" element={<TrackOrder />} />
            
            {/* Protected Checkout Route */}
            <Route
              path="checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            
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
