"use client";

export default function EditSlideout() {
  return (
    <div className="group absolute right-0 top-0 h-full">
      {/* Pull Tab Area */}
      <div className="w-[20px] h-full" />

      {/* Slideout Content */}
      <div className="fixed top-0 right-[-225px] h-full w-[225px] bg-black text-white transition-all duration-300 group-hover:right-0 z-50 shadow-lg border-l border-neutral-800 p-4">
        <div className="text-center text-sm opacity-60 mb-4">Edit Panel</div>

        {/* Tools Placeholder */}
        <div className="space-y-2 text-sm">
          <button className="w-full px-3 py-2 rounded bg-neutral-800 hover:bg-neutral-700 transition">Upload Image</button>
          <button className="w-full px-3 py-2 rounded bg-neutral-800 hover:bg-neutral-700 transition">Remove Image</button>
          <button className="w-full px-3 py-2 rounded bg-neutral-800 hover:bg-neutral-700 transition">Exit Edit Mode</button>
        </div>
      </div>
    </div>
  );
}
