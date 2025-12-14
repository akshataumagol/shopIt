// src/pages/CollectionPage.jsx
import React, { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { FaFilter } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import FilterSidebar from "../components/Products/FilterSidebar";
import ProductGrid from "../components/Products/ProductGrid";
import SortOptions from "../components/Products/SortOptions";

const BASE_URL = "https://shopit-56mz.onrender.com";

function CollectionPage() {
  const { category, subCategory } = useParams();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [error, setError] = useState(null);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = `${BASE_URL}/api/products`;
        if (category) url += `/${category}`;
        if (category && subCategory) url += `/${subCategory}`;

        const response = await axios.get(url);
        setProducts(response.data);
        setFilteredProducts(response.data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Error fetching products.");
        setProducts([]);
        setFilteredProducts([]);
      }
    };
    fetchProducts();
  }, [category, subCategory]);

  const applyFilter = (filters) => {
    let updatedProducts = [...products];
    updatedProducts = updatedProducts.filter(
      (p) => p.price >= filters.minPrice && p.price <= filters.maxPrice
    );
    if (filters.color.length > 0) {
      updatedProducts = updatedProducts.filter((p) =>
        p.colors.some((c) => filters.color.includes(c))
      );
    }
    if (filters.size.length > 0) {
      updatedProducts = updatedProducts.filter((p) =>
        p.sizes.some((s) => filters.size.includes(s))
      );
    }
    if (filters.brand.length > 0) {
      updatedProducts = updatedProducts.filter((p) =>
        filters.brand.includes(p.brand)
      );
    }
    setFilteredProducts(updatedProducts);
  };

  useEffect(() => {
    const sortBy = searchParams.get("sortBy");
    if (!sortBy) return;

    let sortedProducts = [...filteredProducts];

    switch (sortBy) {
      case "priceAsc":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "Popularity":
        sortedProducts.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        break;
      default:
        break;
    }

    setFilteredProducts(sortedProducts);
  }, [searchParams]);

  return (
    <div className="flex w-full min-h-screen relative">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div
        ref={sidebarRef}
        className={`
          fixed lg:sticky top-0 left-0 h-screen
          lg:w-1/6 w-80 max-w-[85vw]
          bg-white
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          z-50 lg:z-0
          overflow-y-auto
        `}
      >
        <button
          onClick={toggleSidebar}
          className="lg:hidden absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
        >
          <IoMdClose className="w-6 h-6" />
        </button>

        <FilterSidebar
          category={category}
          subCategory={subCategory}
          applyFilter={applyFilter}
        />
      </div>

      <div className="flex-1 lg:w-5/6 w-full p-4 lg:p-6">
        <button
          onClick={toggleSidebar}
          className="lg:hidden mb-4 border border-gray-300 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors"
        >
          <FaFilter className="w-4 h-4" />
          <span className="font-medium">Filters</span>
          {filteredProducts.length !== products.length && (
            <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
              Active
            </span>
          )}
        </button>

        <h2 className="text-xl lg:text-2xl font-bold uppercase mb-4">
          {category ? category.charAt(0).toUpperCase() + category.slice(1) : "All"} Collection
          {subCategory && ` – ${subCategory.charAt(0).toUpperCase() + subCategory.slice(1)}`}
        </h2>

        <SortOptions />

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found.</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CollectionPage;
