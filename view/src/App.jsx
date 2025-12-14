/*import React from "react";
import "./App.css";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import { Toaster } from "sonner";
import CollectionPage from "./pages/CollectionPage";
import ProductDetails from "./components/Products/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Checkout from "./components/Cart/Checkout"; 
import OrderConfirmation from "./pages/OrderConfirmationPage";

function App() {
  console.log("✅ App component rendered");

  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="Collection/:collection" element={<CollectionPage />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="OrderConfirmation" element={<OrderConfirmation/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;*/
// App.js
/*import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext"; // Import CartProvider
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Checkout from "./components/Cart/Checkout";
import OrderConfirmation from "./pages/OrderConfirmationPage";
import CollectionPage from "./pages/CollectionPage"; // Import CollectionPage
import ProductDetails from "./components/Products/ProductDetails"; // Import ProductDetails
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
            <Route path="checkout" element={<Checkout />} />
            <Route path="order-confirmation" element={<OrderConfirmation />} />
            
           
            <Route path="collection/:category/:subCategory" element={<CollectionPage />} />
            <Route path="product/:id" element={<ProductDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
*/
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
