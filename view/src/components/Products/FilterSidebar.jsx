// FILE: src/components/Products/FilterSidebar.jsx
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const BASE_URL = "https://shopit-56mz.onrender.com";

function FilterSidebar({ category, subCategory, applyFilter }) {
  const containerRef = useRef(null);

  const [filters, setFilters] = useState({
    color: [],
    size: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });

  const [options, setOptions] = useState({
    colors: [],
    sizes: [],
    brands: [],
    minPrice: 0,
    maxPrice: 100,
  });

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.scrollbarWidth = "none";
      containerRef.current.style.msOverflowStyle = "none";
    }
  }, []);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/filters/${category}/${subCategory}`
        );

        setOptions(res.data);
        setFilters({
          color: [],
          size: [],
          brand: [],
          minPrice: res.data.minPrice,
          maxPrice: res.data.maxPrice,
        });
      } catch (err) {
        console.error("Error fetching filter options", err);
      }
    };

    if (category && subCategory) {
      fetchFilterOptions();
    }
  }, [category, subCategory]);

  const handleFilterChange = (type, value, checked) => {
    const newFilters = { ...filters };

    if (type === "size" || type === "brand") {
      if (checked) newFilters[type].push(value);
      else newFilters[type] = newFilters[type].filter((v) => v !== value);
    } else if (type === "color") {
      if (newFilters.color.includes(value)) {
        newFilters.color = newFilters.color.filter((c) => c !== value);
      } else {
        newFilters.color.push(value);
      }
    }

    setFilters(newFilters);
    applyFilter(newFilters);
  };

  const handlePriceRangeChange = (e) => {
    const value = Number(e.target.value);
    const newFilters = {
      ...filters,
      minPrice: options.minPrice,
      maxPrice: value,
    };

    setFilters(newFilters);
    applyFilter(newFilters);
  };

  const clearAllFilters = () => {
    const resetFilters = {
      color: [],
      size: [],
      brand: [],
      minPrice: options.minPrice,
      maxPrice: options.maxPrice,
    };

    setFilters(resetFilters);
    applyFilter(resetFilters);
  };

  const hasActiveFilters =
    filters.color.length > 0 ||
    filters.size.length > 0 ||
    filters.brand.length > 0 ||
    filters.maxPrice !== options.maxPrice;

  return (
    <>
      <style>{`
        .filter-sidebar-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div
        ref={containerRef}
        className="filter-sidebar-container bg-gray-50 h-full p-4 lg:p-6 overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 border-b pb-3">
          <h3 className="text-xl lg:text-2xl font-bold">Filters</h3>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Colors */}
        {options.colors.length > 0 && (
          <div className="mb-6">
            <label className="font-semibold text-gray-700 mb-3 block">Color</label>
            <div className="flex flex-wrap gap-2">
              {options.colors.map((color) => (
                <button
                  key={color}
                  style={{ backgroundColor: color }}
                  className={`w-10 h-10 rounded-full border-2 transition-all ${
                    filters.color.includes(color)
                      ? "border-blue-500 ring-2 ring-blue-300 scale-110"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onClick={() => handleFilterChange("color", color)}
                  title={color}
                />
              ))}
            </div>
          </div>
        )}

        {/* Sizes */}
        {options.sizes.length > 0 && (
          <div className="mb-6">
            <label className="font-semibold text-gray-700 mb-3 block">Size</label>
            <div className="flex flex-wrap gap-2">
              {options.sizes.map((size) => (
                <label
                  key={size}
                  className={`min-w-[3rem] px-3 py-2 border-2 rounded-lg cursor-pointer transition-all ${
                    filters.size.includes(size)
                      ? "border-blue-500 bg-blue-50 text-blue-700 font-semibold"
                      : "border-gray-300 hover:border-gray-400 bg-white"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={filters.size.includes(size)}
                    onChange={(e) =>
                      handleFilterChange("size", size, e.target.checked)
                    }
                    className="hidden"
                  />
                  {size}
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Brands */}
        {options.brands.length > 0 && (
          <div className="mb-6">
            <label className="font-semibold text-gray-700 mb-3 block">Brand</label>
            <div className="space-y-2">
              {options.brands.map((brand) => (
                <label
                  key={brand}
                  className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.brand.includes(brand)}
                    onChange={(e) =>
                      handleFilterChange("brand", brand, e.target.checked)
                    }
                    className="w-5 h-5"
                  />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Price */}
        <div className="mb-6">
          <label className="font-semibold text-gray-700 mb-3 block">
            Price Range
          </label>
          <div className="flex justify-between text-sm mb-2">
            <span>${options.minPrice}</span>
            <span className="font-semibold text-blue-600">
              ${filters.maxPrice}
            </span>
          </div>

          <input
            type="range"
            min={options.minPrice}
            max={options.maxPrice}
            value={filters.maxPrice}
            onChange={handlePriceRangeChange}
            className="w-full"
          />
        </div>
      </div>
    </>
  );
}

export default FilterSidebar;
