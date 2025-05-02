"use client";

import { useEffect, useState } from "react";

const generateGrid = () => {
  return Array.from({ length: 48 * 24 }, (_, i) => i + 1);
};

export default function UserGrid() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const baseWidth = 1920;
      const baseHeight = 960; // 24 rows × 40px
      const scaleFactor = Math.min(
        window.innerWidth / baseWidth,
        window.innerHeight / baseHeight
      );
      setScale(scaleFactor);
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const tiles = generateGrid();

  return (
    <div className="bg-black w-screen h-screen overflow-hidden flex items-center justify-center">
      <div
        style={{
          width: "1920px",
          height: "960px",
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(48, 40px)",
            gridTemplateRows: "repeat(24, 40px)",
            width: "1920px",
            height: "960px",
          }}
        >
          {tiles.map((tile) => (
            <div
              key={tile}
              className="bg-neutral-900 hover:bg-neutral-700 transition-colors duration-150"
              style={{
                width: "40px",
                height: "40px",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
