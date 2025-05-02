"use client";

type EditMenuProps = {
  x: number;
  y: number;
  onUpload: () => void;
  onRemove: () => void;
};

export default function EditMenu({ x, y, onUpload, onRemove }: EditMenuProps) {
  return (
    <div
      className="fixed z-50 bg-white/90 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded shadow-md p-2 flex flex-col gap-1 transition-opacity duration-200"
      style={{
        top: y + 10,
        left: x + 10,
      }}
    >
      <button
        onClick={onUpload}
        className="px-3 py-1 rounded bg-black text-white dark:bg-white dark:text-black text-sm hover:opacity-80"
      >
        Upload
      </button>
      <button
        onClick={onRemove}
        className="px-3 py-1 rounded bg-red-600 text-white text-sm hover:opacity-80"
      >
        Remove
      </button>
    </div>
  );
}
