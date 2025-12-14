import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineUser, HiOutlineShoppingBag, HiBars3BottomRight } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { useCart } from "../../context/CartContext"; // Import useCart

function NavBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);  // State to toggle the cart drawer
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);  // State for mobile menu
  const { getCartItemCount } = useCart();  // Get cart count function

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);  // Toggle cart drawer visibility
  };

  // Helper function to convert category/subcategory names to URL-friendly format
  const toUrlFormat = (text) => {
    return text
      .toLowerCase()
      .replace(/\s*&\s*/g, "-") // Replace '&' with surrounding spaces with single hyphen
      .replace(/\s+/g, "-")      // Replace remaining spaces with hyphen
      .trim();                    // Remove leading/trailing spaces
  };

  const categories = [
    {
      name: "Clothing",
      subcategories: ["Women", "Men"],
    },
    {
      name: "Kids",
      subcategories: ["Boys"],
    },
    {
      name: "Electronics",
      subcategories: ["Mobiles"],
    },
    {
      name: "Home & Living",
      subcategories: ["Furniture"],
    },
    {
      name: "New Arrivals",
      subcategories: ["Trending", "Sale"],
    },
  ];

  const cartItemCount = getCartItemCount();  // Get the actual cart count

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when a link is clicked
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4 px-6 relative">
        <div>
          <Link to="/" className="text-2xl font-bold">
            ShopIT
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center">
          {categories.map((cat, i) => (
            <div key={i} className="relative group">
              <Link to="#" className="text-gray-700 hover:text-black text-sm font-medium uppercase">
                {cat.name}
              </Link>
              {cat.subcategories && cat.subcategories.length > 0 && (
                <div className="absolute top-full left-0 w-48 bg-white shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 z-50">
                  {cat.subcategories.map((sub, index) => (
                    <Link
                      key={index}
                      to={`/collection/${toUrlFormat(cat.name)}/${toUrlFormat(sub)}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right side icons */}
        <div className="flex items-center space-x-4">
          <Link to="/profile" className="hover:text-black">
            <HiOutlineUser className="h-6 w-6 text-gray-700" />
          </Link>
          <button onClick={toggleCartDrawer} className="relative hover:text-black">
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            {/* Dynamic cart count badge - only show if items exist */}
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center px-1.5 font-semibold">
                {cartItemCount}
              </span>
            )}
          </button>
          <div className="overflow-hidden">
            <SearchBar categories={categories} /> {/* Pass categories to SearchBar */}
          </div>
          <button className="md:hidden hover:text-black" onClick={toggleMobileMenu}>
            <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-40 md:hidden transition-all duration-300 ${isMobileMenuOpen ? 'block' : 'hidden'}`}
        onClick={toggleMobileMenu}  // Close menu on clicking outside
      >
        <div
          className="relative bg-white w-3/4 sm:w-2/3 lg:w-1/3 h-full shadow-xl p-6"
          onClick={(e) => e.stopPropagation()}  // Prevent closing when clicking inside
        >
          <button
            className="absolute top-4 right-4"
            onClick={toggleMobileMenu}  // Close mobile menu
          >
            <IoMdClose className="h-6 w-6 text-gray-700" />
          </button>
          <div className="space-y-4">
            {categories.map((cat, i) => (
              <div key={i} className="relative">
                <Link
                  to="#"
                  className="text-gray-700 hover:text-black text-sm font-medium uppercase"
                  onClick={() => {handleLinkClick()}}  // Close menu after selecting
                >
                  {cat.name}
                </Link>
                {cat.subcategories && cat.subcategories.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {cat.subcategories.map((sub, index) => (
                      <Link
                        key={index}
                        to={`/collection/${toUrlFormat(cat.name)}/${toUrlFormat(sub)}`}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => {handleLinkClick()}}  // Close menu after selecting
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
