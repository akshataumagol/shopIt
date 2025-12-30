// src/components/Common/CustomCursor.jsx
import React, { useEffect, useState } from "react";

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  // Track mouse position
  useEffect(() => {
    const moveCursor = (e) => setPosition({ x: e.clientX, y: e.clientY });

    // Only track mousemove on desktop
    if (window.innerWidth > 768) {
      window.addEventListener("mousemove", moveCursor);
    }

    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  // Detect hover over interactive elements (button, link, etc.)
  useEffect(() => {
    const addHover = () => setHovered(true);
    const removeHover = () => setHovered(false);

    // Select buttons, links, and elements with .cursor-hover class
    const elements = document.querySelectorAll("button, a, .cursor-hover, input, textarea, div");
    elements.forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] transition-all duration-200 ease-out
        ${hovered ? "bg-red-500 opacity-80 scale-150" : "bg-red-500 opacity-50 scale-100"}`}
      style={{
        transform: `translate3d(${position.x - 16}px, ${position.y - 16}px, 0)`, // Adjusted to center the cursor correctly
      }}
    ></div>
  );
};

export default Cursor;
