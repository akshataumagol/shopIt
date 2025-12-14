import React, { useState, useEffect } from 'react';
import Hero from '../components/Layout/Hero';
import CollectionSection from '../components/Products/CollectionSection';
import ProductGrid from '../components/Products/ProductGrid';
import { productAPI } from '../utils/api';

function Home() {
  const [mensWear, setMensWear] = useState([]);
  const [homeLivingFurniture, setHomeLivingFurniture] = useState([]); // New state for Home & Living - Furniture
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        // Fetch products by category and subcategory
        const mensData = await productAPI.getByCategory('clothing', 'men');
        const homeLivingData = await productAPI.getByCategory('home-living', 'furniture'); // Fetch Home & Living - Furniture

        // Set state for all categories
        setMensWear(mensData);
        setHomeLivingFurniture(homeLivingData); // Set the fetched furniture data
      } catch (error) {
        console.error('Failed to fetch products:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Hero />
      <CollectionSection />

      {/* Loading indicator */}
      {loading && <div className="text-center py-10">Loading products...</div>}

      {/* Display Men's Wear */}
      {!loading && mensWear.length === 0 && (
        <div className="text-center py-10">No Men's Wear products found.</div>
      )}

      {!loading && mensWear.length > 0 && (
        <>
          <h2 className="text-3xl text-center font-bold mb-4">Men's Wear</h2>
          <div className="container mx-auto">
            <ProductGrid products={mensWear} />
          </div>
        </>
      )}

      {/* Why Choose Us Section */}
      <section className="bg-gradient-to-r from-blue-500 to-teal-500 py-16 mt-12 relative overflow-hidden">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-8 animate__animated animate__fadeIn">
            Why Choose Us?
          </h2>
          <p className="text-lg text-white mb-10 animate__animated animate__fadeIn animate__delay-1s">
            We're proud of our track record and our loyal customers. Here's why people love shopping with us:
          </p>

          {/* Statistics Cards with Hover Effect */}
          <div className="flex flex-col md:flex-row justify-center gap-12">
            <div className="max-w-sm bg-white shadow-lg rounded-lg p-8 transition-transform transform hover:scale-105 hover:shadow-xl animate__animated animate__fadeIn animate__delay-2s">
              <h3 className="text-3xl font-semibold text-gray-800 mb-4">10+ Years in Business</h3>
              <p className="text-gray-600">Providing high-quality products and exceptional service since 2013.</p>
            </div>

            <div className="max-w-sm bg-white shadow-lg rounded-lg p-8 transition-transform transform hover:scale-105 hover:shadow-xl animate__animated animate__fadeIn animate__delay-3s">
              <h3 className="text-3xl font-semibold text-gray-800 mb-4">100K+ Happy Customers</h3>
              <p className="text-gray-600">Over 100,000 satisfied customers who trust our products every day!</p>
            </div>

            <div className="max-w-sm bg-white shadow-lg rounded-lg p-8 transition-transform transform hover:scale-105 hover:shadow-xl animate__animated animate__fadeIn animate__delay-4s">
              <h3 className="text-3xl font-semibold text-gray-800 mb-4">500K+ Products Sold</h3>
              <p className="text-gray-600">We’ve sold over half a million products, delivering quality and satisfaction with every purchase.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Display Home & Living - Furniture */}
      {!loading && homeLivingFurniture.length === 0 && (
        <div className="text-center py-10 ">No Home & Living Furniture products found.</div>
      )}

      {!loading && homeLivingFurniture.length > 0 && (
        <>
          <h2 className="text-3xl text-center font-bold mb-4 mt-12">Home & Living - Furniture</h2>
          <div className="container mx-auto">
            <ProductGrid products={homeLivingFurniture} />
          </div>
        </>
      )}
    </>
  );
}

export default Home;
