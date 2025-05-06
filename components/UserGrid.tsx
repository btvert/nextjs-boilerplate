"use client";

import { useEffect, useState } from "react";

const generateGrid = () => {
  return Array.from({ length: 48 * 27 }, (_, i) => i + 1);
};

export default function UserGrid({ isEditMode = false }: { isEditMode?: boolean }) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const baseWidth = 1920;
      const baseHeight = 1080;
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
    <div
      className="w-full max-w-full overflow-hidden flex items-center justify-center"
      style={{ position: "relative", background: "black" }}
    >
      <div
        style={{
          width: "1920px",
          height: "1080px",
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(48, 40px)",
            gridTemplateRows: "repeat(27, 40px)",
            width: "1920px",
            height: "1080px",
          }}
        >
          {tiles.map((tile) => (
            <div
              key={tile}
              className="bg-neutral-900 hover:bg-neutral-700 transition-colors duration-150 cursor-pointer"
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
