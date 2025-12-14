import React, { useState, useEffect } from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { HiMiniXMark } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom'; // To navigate to the search results page

function SearchBar({ categories }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const navigate = useNavigate(); // To redirect after search

  useEffect(() => {
    // Filter subcategories based on search term
    if (searchTerm.trim() === '') {
      setFilteredSubcategories([]);
    } else {
      const subcategories = categories.flatMap(cat => cat.subcategories);
      const filtered = subcategories.filter(sub => 
        sub.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSubcategories(filtered);
    }
  }, [searchTerm, categories]);

  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    // Find the category and subcategory that matches the search term
    const foundCategory = categories.find((cat) => 
      cat.subcategories.some((sub) => sub.toLowerCase() === searchTerm.toLowerCase())
    );

    if (foundCategory) {
      const categorySlug = foundCategory.name.toLowerCase();
      const subcategorySlug = searchTerm.toLowerCase();
      
      // Navigate to the corresponding collection page
      navigate(`/collection/${categorySlug}/${subcategorySlug}`);
    } else {
      // If no match is found, just reset the search and maybe show an error
      console.log("No matching category/subcategory found");
    }

    setIsOpen(false);
  };

  return (
    <div className={`flex items-center justify-center w-full transition-all duration-300 ${isOpen ? "absolute top-0 left-0 w-full bg-white h-24 z-50" : "w-auto"}`}>
      {isOpen ? (
        <form onSubmit={handleSearch} className="relative flex items-center justify-center w-full">
          <div className="relative w-1/2">
            <input 
              type="text" 
              placeholder="Search" 
              onChange={(e) => setSearchTerm(e.target.value)} 
              value={searchTerm} 
              className="bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700"
            />
            <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800">
              <HiMagnifyingGlass className="h-6 w-6" />
            </button>
          </div>

          {/* Display the filtered subcategories if there are any matches */}
          {filteredSubcategories.length > 0 && (
            <div className="absolute left-2 top-full mt-2 w-full bg-white shadow-md p-4 rounded-lg">
              <ul className="space-y-2">
                {filteredSubcategories.map((sub, index) => (
                  <li key={index}>
                    <button
                      onClick={() => {
                        setSearchTerm(sub); // Set the search term to the subcategory
                        handleSearch({ preventDefault: () => {} }); // Trigger search
                      }}
                      className="text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      {sub}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Close Button */}
          <button
            type="button"
            onClick={handleSearchToggle}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
          >
            <HiMiniXMark className="h-6 w-6" />
          </button>
        </form>
      ) : (
        <button onClick={handleSearchToggle}>
          <HiMagnifyingGlass className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
