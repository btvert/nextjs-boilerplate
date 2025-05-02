"use client";
import React from "react";

type EditMenuProps = {
  x: number;
  y: number;
  onUpload: () => void;
  onRemove: () => void;
};

export default function EditMenu({ x, y, onUpload, onRemove }: EditMenuProps) {
  return (
    <div
      className="fixed z-50 w-48 rounded-xl bg-neutral-900 shadow-xl border border-neutral-700"
      style={{
        top: y,
        left: x,
        transform: "translate(-50%, 0)",
      }}
    >
      <div className="flex flex-col py-2">
        <button
          onClick={onUpload}
          className="flex justify-start px-4 py-2 text-sm hover:bg-neutral-800 text-white transition"
        >
          Upload
        </button>
        <button
          onClick={onRemove}
          className="flex justify-start px-4 py-2 text-sm hover:bg-neutral-800 text-red-400 transition"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
