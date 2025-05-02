const generateGrid = () => {
  return Array.from({ length: 48 * 27 }, (_, i) => i + 1);
};

export default function UserGrid() {
  const tiles = generateGrid();

  return (
    <div className="w-screen h-screen overflow-hidden bg-black px-0 sm:px-20 py-4">
      <div
        className="grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(48, 1fr)",
          gridTemplateRows: "repeat(27, 1fr)",
          width: "100%",
          height: "100%",
        }}
      >
        {tiles.map((tile) => (
          <div
            key={tile}
            className="bg-neutral-900 hover:bg-neutral-700 transition-all"
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
