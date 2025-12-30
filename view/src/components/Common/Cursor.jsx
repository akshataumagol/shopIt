import React, { useEffect, useState } from "react";

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  // Track mouse position
  useEffect(() => {
    const moveCursor = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", moveCursor);

    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  // Detect hover over buttons/links
  useEffect(() => {
    const addHover = () => setHovered(true);
    const removeHover = () => setHovered(false);

    const elements = document.querySelectorAll("button, a, .cursor-hover");
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
      className={`fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-50 transition-all duration-200 ease-out
        ${hovered ? "bg-white opacity-80 scale-150" : "bg-white opacity-50 scale-100"}`}
      style={{
        transform: `translate3d(${position.x - 12}px, ${position.y - 12}px, 0)`, // Centered and smaller cursor
      }}
    ></div>
  );
};

export default Cursor;
