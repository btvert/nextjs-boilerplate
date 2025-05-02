const generateGrid = () => {
  return Array.from({ length: 48 * 27 }, (_, i) => i + 1);
};

export default function UserGrid() {
  const tiles = generateGrid();

  return (
    <div className="w-screen h-screen overflow-hidden bg-black grid place-items-center">
      <div
        className="grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(48, 1fr)",
          gridTemplateRows: "repeat(27, 1fr)",
          width: "100vw",
          height: "100vh",
        }}
      >
        {tiles.map((tile) => (
          <div
            key={tile}
            style={{
              backgroundColor: "#1a1a1a",
              aspectRatio: "1 / 1",
              width: "100%",
              height: "100%",
            }}
          />
        ))}
      </div>
    </div>
  );
}
