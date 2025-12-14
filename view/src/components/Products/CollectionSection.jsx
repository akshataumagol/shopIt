import React from 'react';
import mensCollectionImage from '../../assets/mens-collection.webp';
import WommensCollectionImage from '../../assets/womens-collection.webp';
import { Link } from 'react-router-dom';

function CollectionSection() {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        {/* Women's Collection Section */}
        <div className="relative flex-1">
          <Link to="/collection/new-arrivals/trending"> {/* Wrap image and text in the same Link */}
            <img 
              src={WommensCollectionImage} 
              alt="Women's collection" 
              className="w-full h-[700px] object-cover" 
            />
            <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Trending collection</h2>
              <span className="text-gray-900">Shop Now</span>
            </div>
          </Link>
        </div>

        {/* Men's Collection Section */}
        <div className="relative flex-1">
          <Link to="/collection/new-arrivals/sale"> {/* Wrap image and text in the same Link */}
            <img 
              src={mensCollectionImage} 
              alt="Men's collection" 
              className="w-full h-[700px] object-cover" 
            />
            <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Sale collection</h2>
              <span className="text-gray-900">Shop Now</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CollectionSection;
