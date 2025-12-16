// src/components/Products/ProductDetails.jsx
import React, { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../../context/CartContext";

const BASE_URL = "https://shopit-56mz.onrender.com";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/products/${id}`);
        const productData = res.data;

        setProduct(productData);
        if (productData.image?.length > 0) setMainImage(productData.image[0]);
        if (productData.sizes?.length > 0) setSelectedSize(productData.sizes[0]);
        if (productData.colors?.length > 0) setSelectedColor(productData.colors[0]);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color");
      return;
    }

    const cartItem = {
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image[0],
      size: selectedSize,
      color: selectedColor,
      quantity,
    };

    addToCart(cartItem);
    toast.success("Added to cart!");
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-black"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  if (!product) return null;

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="container mx-auto p-6 my-8">
        <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Images */}
            <div className="lg:w-1/2 flex flex-col-reverse lg:flex-row gap-4">
              {product.image?.length > 1 && (
                <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto">
                  {product.image.map((imgUrl, idx) => (
                    <img
                      key={idx}
                      src={imgUrl}
                      alt={`₹{product.name} ${idx + 1}`}
                      className={`w-20 h-20 rounded-lg object-cover cursor-pointer border-2 transition-all flex-shrink-0 ${
                        mainImage === imgUrl
                          ? "border-black ring-2 ring-black"
                          : "border-gray-300 hover:border-gray-500"
                      }`}
                      onClick={() => setMainImage(imgUrl)}
                      onError={(e) =>
                        (e.target.src = "https://placehold.co/100x100?text=No+Image")
                      }
                    />
                  ))}
                </div>
              )}
              <div className="flex-1 flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden">
                <img
                  src={mainImage}
                  alt={product.name}
                  className="w-full h-full object-cover aspect-square"
                  onError={(e) =>
                    (e.target.src = "https://placehold.co/600x600?text=No+Image")
                  }
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:w-1/2 flex flex-col">
              <h1 className="text-3xl lg:text-4xl font-bold mb-3 text-gray-900">
                {product.name}
              </h1>

              {product.brand && (
                <p className="text-gray-500 mb-3 text-sm uppercase tracking-wide">
                  {product.brand}
                </p>
              )}

              <div className="flex items-center gap-4 mb-4">
                <p className="text-3xl font-bold text-black">
                  ₹{product.price?.toFixed(2)}
                </p>
                {product.originalPrice && product.originalPrice > product.price && (
                  <>
                    <p className="text-xl line-through text-gray-400">
                      ₹{product.originalPrice.toFixed(2)}
                    </p>
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {Math.round(
                        ((product.originalPrice - product.price) / product.originalPrice) *
                          100
                      )}
                      % OFF
                    </span>
                  </>
                )}
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

              {product.colors?.length > 0 && (
                <div className="mb-6">
                  <p className="font-semibold text-gray-900 mb-3">
                    Color: <span className="font-normal text-gray-600">{selectedColor}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 border-2 rounded-lg font-medium transition-all ${
                          selectedColor === color
                            ? "bg-black text-white border-black"
                            : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.sizes?.length > 0 && (
                <div className="mb-6">
                  <p className="font-semibold text-gray-900 mb-3">
                    Size: <span className="font-normal text-gray-600">{selectedSize}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-5 py-2.5 border-2 rounded-lg font-medium transition-all ${
                          selectedSize === size
                            ? "bg-black text-white border-black"
                            : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-8">
                <p className="font-semibold text-gray-900 mb-3">Quantity:</p>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    disabled={quantity <= 1}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold text-xl ${
                      quantity <= 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    −
                  </button>
                  <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-lg font-bold text-xl text-gray-700 hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="bg-black text-white w-full py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors mb-6"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
