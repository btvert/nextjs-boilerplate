"use client";
import { useState } from "react";

export default function TopDropdown() {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="fixed top-0 left-0 w-full z-50"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <div
        className="w-full bg-neutral-900 text-white flex items-center justify-between px-6"
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
    </div>
  );
}
