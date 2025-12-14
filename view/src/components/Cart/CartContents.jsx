/*import React from 'react';
import {RiDeleteBin6Line} from 'react-icons/ri';
function CartContents() {
    const cartProducts = [{
        productId: 1,
        name: "T-Shirt",
        size: "M",
        color: "Red",
        quantity: 1,
        price: 15,
        image: "https://picsum.photos/500/500?random=30"
    },
    {
        productId: 2,
        name: "T-Shirt",
        size: "M",
        color: "Red",
        quantity: 1,
        price: 15,
        image: "https://picsum.photos/500/500?random=30"
    },
    {
        productId: 3,
        name: "T-Shirt",
        size: "M",
        color: "Red",
        quantity: 1,
        price: 15,
        image: "https://picsum.photos/500/500?random=30"
    }]
    return (
        <>
            <div>
                {cartProducts.map((product, index) => (

                    <div key={index} className='flex items-start justify-between py-4 border-b'>
                        <div className='flex items-start'>
                            <img src={product.image} alt={product.name} className="w-20 h-24 object-cover mr-4 rounded" />
                        </div>
                         <div>
                     
                            <h3>{product.name}</h3>
                            <p className='text-sm text-gray-500 '>
                                size:{product.size} | color:{product.color}
                            </p>
                            <div className='flex items-center mt-2'>
                                <button className='border rounded px-2 py-1 text-xl font-medium '>-</button>
                                <span className='mx-4'>{product.quantity}</span>
                                <button className='border rounded px-2 py-1 text-xl font-medium '>+</button>
                            </div>
                               </div>
                               
                      <div>
                   
                            
                        </div>
                        <div>
                            <p className='font-medium'>${product.price.toLocaleString()}</p>
                            <button>
                                <RiDeleteBin6Line className='h-6 w-6 mt-2 text-red' />
                            </button>
                            </div>
                    </div>
                 
               
            
                ))}
            </div>
        </>
    );
}

export default CartContents;
*/
// CartContents.js
// FILE: src/components/Cart/CartContents.jsx

/*import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useCart } from "../../context/CartContext";

function CartContents() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  if (cart.length === 0)
    return <p className="p-6">Your cart is empty.</p>;

  return (
    <div className="p-6">
      {cart.map((product) => (
        <div
          key={product.productId}
          className="flex justify-between items-start border-b py-4"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-20 h-24 object-cover rounded"
          />

          <div>
            <h3 className="font-medium">{product.name}</h3>
            <p className="text-gray-500 text-sm">
              Size: {product.size} | Color: {product.color}
            </p>

            <div className="flex items-center mt-2">
              <button
                onClick={() =>
                  updateQuantity(product.productId, product.quantity - 1)
                }
                className="px-2 py-1 border rounded"
              >
                -
              </button>

              <span className="mx-4">{product.quantity}</span>

              <button
                onClick={() =>
                  updateQuantity(product.productId, product.quantity + 1)
                }
                className="px-2 py-1 border rounded"
              >
                +
              </button>
            </div>
          </div>

          <div className="text-right">
            <p className="font-semibold">${product.price}</p>
            <button onClick={() => removeFromCart(product.productId)}>
              <RiDeleteBin6Line className="text-red-500 mt-2" size={22} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CartContents;*/
// FILE: src/components/Cart/CartContents.jsx
// FILE: src/components/Cart/CartContents.jsx
// FILE: src/components/Cart/CartContents.jsx
// FILE: src/components/Cart/CartContents.jsx
import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useCart } from "../../context/CartContext";

function CartContents() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  if (cart.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="p-2">
      {cart.map((product, index) => (
        <div
          key={`${product.productId}-${product.size}-${product.color}-${index}`}
          className="flex justify-between items-start border-b py-4"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-20 h-24 object-cover rounded"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/80x96?text=Product';
            }}
          />

          <div className="flex-1 px-4">
            <h3 className="font-medium">{product.name}</h3>
            <p className="text-gray-500 text-sm">
              Size: {product.size} | Color: {product.color}
            </p>

            <div className="flex items-center mt-2">
              <button
                onClick={() =>
                  updateQuantity(
                    product.productId,
                    product.quantity - 1,
                    product.size,
                    product.color
                  )
                }
                className="px-3 py-1 border rounded hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={product.quantity <= 1}
              >
                -
              </button>
              <span className="mx-4 font-medium">{product.quantity}</span>
              <button
                onClick={() =>
                  updateQuantity(
                    product.productId,
                    product.quantity + 1,
                    product.size,
                    product.color
                  )
                }
                className="px-3 py-1 border rounded hover:bg-gray-100 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          <div className="text-right">
            <p className="font-semibold">
              ${(product.price * product.quantity).toFixed(2)}
            </p>
            <p className="text-sm text-gray-500">
              ${product.price.toFixed(2)} each
            </p>
            <button
              onClick={() =>
                removeFromCart(product.productId, product.size, product.color)
              }
              className="hover:scale-110 transition-transform mt-2"
              aria-label="Remove from cart"
            >
              <RiDeleteBin6Line className="text-red-500" size={22} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CartContents;