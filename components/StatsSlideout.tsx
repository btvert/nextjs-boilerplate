"use client";

import { useEffect, useState } from "react";
import supabase from "@/lib/supabase/supabase";

export default function StatsSlideout({ username }: { username: string }) {
  const [views, setViews] = useState(0);
  const [chats, setChats] = useState(0);

  // Example static fetch — replace with actual Supabase calls
  useEffect(() => {
    // TODO: Replace with real Supabase queries
    setViews(1234);
    setChats(456);
  }, []);

  return (
    <div className="group absolute left-0 top-0 h-full">
      {/* Pull Tab Area */}
      <div className="w-[20px] h-full" />

      {/* Slideout Content */}
      <div className="fixed top-0 left-[-225px] h-full w-[225px] bg-black text-white transition-all duration-300 group-hover:left-0 z-50 shadow-lg border-r border-neutral-800 p-4">
        {/* Username */}
        <div className="text-xl font-mono font-semibold mb-4">/{username}</div>

        {/* Profile Picture */}
        <div className="w-20 h-20 bg-neutral-800 rounded-full mb-4 mx-auto" />

        {/* Badges Row */}
        <div className="flex gap-2 justify-center mb-4">
          {/* Example badge placeholders */}
          <div className="w-6 h-6 bg-yellow-500 rounded" />
          <div className="w-6 h-6 bg-blue-500 rounded" />
          <div className="w-6 h-6 bg-green-500 rounded" />
        </div>

        {/* Stats */}
        <div className="text-center text-sm space-y-2 opacity-80">
          <div>👁️ {views} views</div>
          <div>💬 {chats} chats</div>
        </div>
      </div>
    </div>
  );
}
