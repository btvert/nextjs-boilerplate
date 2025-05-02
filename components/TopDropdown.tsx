"use client";
import { useState } from "react";

export default function TopDropdown() {
  const [visible, setVisible] = useState(false);

  return (
    <div
      onMouseLeave={() => setVisible(false)}
      className="fixed top-0 left-0 w-full z-50"
      style={{ height: visible ? 80 : 0, transition: "height 0.3s ease" }}
    >
      {/* Dropdown bar */}
      <div
        className="w-full bg-neutral-900 text-white flex items-center justify-center"
        style={{
          height: 80,
          transform: visible ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.3s ease",
        }}
      >
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-white text-black rounded">Home</button>
          <button className="px-4 py-2 bg-white text-black rounded">Login</button>
          <button className="px-4 py-2 bg-white text-black rounded">Logout</button>
        </div>
      </div>

      {/* Hover tab (tiny SVG or square) */}
      <div
        className="absolute top-[78px] left-1/2 -translate-x-1/2 w-[25px] h-[25px] bg-white cursor-pointer rounded-t"
        onMouseEnter={() => setVisible(true)}
      >
        {/* Optionally: Replace with your SVG */}
      </div>
    </div>
  );
}
