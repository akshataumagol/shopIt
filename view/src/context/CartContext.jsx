// FILE: src/context/CartContext.js
/*import { createContext, useContext, useState, useEffect } from "react";

// CartContext creation
const CartContext = createContext();

// CartProvider component to wrap your app and provide the cart state
export function CartProvider({ children }) {
  // Load cart from localStorage if exists, else empty array
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add item to cart
  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find(
        (p) =>
          p.productId === item.productId &&
          p.size === item.size &&
          p.color === item.color
      );
      if (exists) {
        return prev.map((p) =>
          p.productId === item.productId &&
          p.size === item.size &&
          p.color === item.color
            ? { ...p, quantity: p.quantity + item.quantity }
            : p
        );
      }
      return [...prev, item];
    });
  };

  // Update quantity of item in cart (now includes size and color)
  const updateQuantity = (productId, newQty, size, color) => {
    if (newQty <= 0) return removeFromCart(productId, size, color);
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId &&
        item.size === size &&
        item.color === color
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  // Remove item from cart (now includes size and color)
  const removeFromCart = (productId, size, color) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item.productId === productId && item.size === size && item.color === color)
      )
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  // Get total price of cart
  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  // Get total number of items in cart
  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getCartTotal,
        getCartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};*/

// FILE: src/context/CartContext.js
import { createContext, useContext, useState, useEffect } from "react";

// CartContext creation
const CartContext = createContext();

// CartProvider component to wrap your app and provide the cart state
export function CartProvider({ children }) {
  // User state - load from localStorage if exists
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Load cart from localStorage if exists, else empty array
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add item to cart
  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find(
        (p) =>
          p.productId === item.productId &&
          p.size === item.size &&
          p.color === item.color
      );
      if (exists) {
        return prev.map((p) =>
          p.productId === item.productId &&
          p.size === item.size &&
          p.color === item.color
            ? { ...p, quantity: p.quantity + item.quantity }
            : p
        );
      }
      return [...prev, item];
    });
  };

  // Update quantity of item in cart (now includes size and color)
  const updateQuantity = (productId, newQty, size, color) => {
    if (newQty <= 0) return removeFromCart(productId, size, color);
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId &&
        item.size === size &&
        item.color === color
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  // Remove item from cart (now includes size and color)
  const removeFromCart = (productId, size, color) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item.productId === productId && item.size === size && item.color === color)
      )
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  // Get total price of cart
  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  // Get total number of items in cart
  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  // Logout function to clear user
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getCartTotal,
        getCartItemCount,
        user,
        setUser,
        logout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
