import { useEffect, useRef, useState } from "react";

const generateGrid = () => {
  return Array.from({ length: 48 * 27 }, (_, i) => i + 1);
};

export default function UserGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
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
    <div className="bg-black w-screen h-screen overflow-hidden">
      <div
        ref={containerRef}
        style={{
          width: "1920px",
          height: "1080px",
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          display: "grid",
          gridTemplateColumns: "repeat(48, 40px)",
          gridTemplateRows: "repeat(27, 40px)",
        }}
      >
        {tiles.map((tile) => (
          <div
            key={tile}
            style={{
              backgroundColor: "#1a1a1a",
              width: "40px",
              height: "40px",
            }}
          />
        ))}
      </div>
    </div>
  );
}
