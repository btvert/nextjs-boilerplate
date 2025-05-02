const generateGrid = () => {
  return Array.from({ length: 48 * 27 }, (_, i) => i + 1);
};

export default function UserGrid() {
  const tiles = generateGrid();

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen grid"
      style={{
        gridTemplateColumns: "repeat(48, 1fr)",
        gridTemplateRows: "repeat(27, 1fr)",
      }}
    >
      {tiles.map((tile) => (
        <div
          key={tile}
          style={{
            backgroundColor: "#1a1a1a",
            width: "100%",
            height: "100%",
          }}
        />
      ))}
    </div>
  );
}
