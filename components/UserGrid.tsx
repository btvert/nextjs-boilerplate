type GridItem = {
  id: number;
  image: string;
  tooltip: string;
};

const generateGrid = (): GridItem[] => {
  return Array.from({ length: 1296 }, (_, i) => ({
    id: i + 1,
    image: `/img/thumbnails/${i + 1}.png`,
    tooltip: `LOT #${i + 1}`,
  }));
};

export default function UserGrid() {
  const tiles = generateGrid();

  return (
    <div className="w-screen h-screen overflow-hidden bg-black px-2 sm:px-24 py-4">
      <div
        className="grid gap-[1px] bg-neutral-800"
        style={{
          gridTemplateColumns: "repeat(48, auto)",
          gridAutoRows: "auto",
        }}
      >
        {tiles.map((tile) => (
          <div
            key={tile.id}
            className="w-[14px] h-[14px] sm:w-[20px] sm:h-[20px] bg-neutral-900 bg-cover bg-center relative group"
            title={tile.tooltip}
            style={{ backgroundImage: `url(${tile.image})` }}
          >
            <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-50 text-xs text-white flex items-center justify-center">
              {tile.tooltip}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
