"use client";

import { useEffect, useRef, useState } from "react";
import { uploadGridImage, getGridData } from "@/lib/supabase/grid";

const generateGrid = () => {
  return Array.from({ length: 48 * 27 }, (_, i) => i + 1);
};

export default function UserGrid({
  isEditMode = false,
  username,
}: {
  isEditMode?: boolean;
  username: string;
}) {
  const [scale, setScale] = useState(1);
  const [gridImages, setGridImages] = useState<Record<number, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedTile, setSelectedTile] = useState<number | null>(null);

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

  useEffect(() => {
    if (!username) return;
    const loadGrid = async () => {
      const data = await getGridData(username);
      setGridImages(data);
    };
    loadGrid();
  }, [username]);

  const handleTileClick = (tileIndex: number) => {
    if (!isEditMode) return;
    setSelectedTile(tileIndex);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && selectedTile !== null && username) {
      const imageUrl = await uploadGridImage(file, username, selectedTile);
      setGridImages((prev) => ({ ...prev, [selectedTile]: imageUrl }));
      setSelectedTile(null);
    }
  };

  const tiles = generateGrid();

  return (
    <div
      className="bg-black w-screen h-screen overflow-hidden flex items-center justify-center"
      style={{ position: "relative" }}
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
              onClick={() => handleTileClick(tile)}
              className="relative bg-neutral-900 hover:bg-neutral-700 transition-colors duration-150 cursor-pointer"
              style={{
                width: "40px",
                height: "40px",
              }}
            >
              {gridImages[tile] && (
                <img
                  src={gridImages[tile]}
                  alt={`Tile ${tile}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
}
