const generateGrid = () => {
  return Array.from({ length: 48 * 27 }, (_, i) => i + 1);
};

export default function UserGrid() {
  const tiles = generateGrid();

  return (
    <div className="w-screen h-screen overflow-hidden bg-black flex items-center justify-center">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(48, 1fr)",
          gridTemplateRows: "repeat(27, 1fr)",
          width: "1920px", // 48 * 40
          height: "1080px", // 27 * 40
          transform: "scale(calc(100vw / 1920))",
          transformOrigin: "top left",
        }}
      >
        {tiles.map((tile) => (
          <div
            key={tile}
            style={{
              backgroundColor: "#1a1a1a",
              border: "0px solid transparent",
              width: "100%",
              height: "100%",
            }}
          />
        ))}
      </div>
    </div>
  );
}
