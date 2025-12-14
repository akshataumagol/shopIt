import React from "react";
import { Link } from "react-router-dom";

function ProductGrid({ products }) {
  // Debugging: Log the products to ensure correct data is being passed
  console.log("Products in ProductGrid:", products);

  if (!products || products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product._id} className="bg-white p-4 rounded-lg">
          <Link to={`/products/${product._id}`}>
            <div className="w-full h-96 mb-4">
              <img
                src={
                  product.image?.[0]?.url || product.image?.[0] || ""
                }
                alt={product.name || "Product Image"}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            <h3 className="text-sm mb-2">{product.name}</h3>

            <p className="text-gray-500 font-medium text-sm tracking-tighter">
              ${product.price}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ProductGrid;
