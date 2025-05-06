"use client";

const generateGrid = () => {
  return Array.from({ length: 48 * 27 }, (_, i) => i + 1);
};

export default function UserGrid({ isEditMode = false }: { isEditMode?: boolean }) {
  const tiles = generateGrid();

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center overflow-hidden">
      <div
        className="grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(48, 1fr)",
          gridTemplateRows: "repeat(27, 1fr)",
          width: "100vw",
          aspectRatio: "16 / 9",
          maxHeight: "100vh",
        }}
      >
        {tiles.map((tile) => (
          <div
            key={tile}
            className="bg-neutral-900 hover:bg-neutral-700 transition-colors duration-150 cursor-pointer"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        ))}
      </div>
    </div>
  );
}
