"use client";

import { useEffect, useState } from "react";
import { getUserBadges } from "@/lib/supabase/badges";
import supabase from "@/lib/supabase/supabase";

export default function SidebarStats({ username }: { username: string }) {
  const [badges, setBadges] = useState<{ badge_url: string; badge_name?: string }[]>([]);
  const [stats, setStats] = useState<{ views: number; chats: number } | null>(null);

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const badgeData = await getUserBadges(username);
        setBadges(badgeData);
      } catch (err) {
        console.error("Failed to load badges:", err);
      }
    };

    const fetchStats = async () => {
      const { data, error } = await supabase
        .from("user_stats")
        .select("views, chats")
        .eq("username", username)
        .single();

      if (!error) setStats(data);
    };

    fetchBadges();
    fetchStats();
  }, [username]);

  return (
    <div className="space-y-6">
      {/* Profile Picture Placeholder */}
      <div className="w-24 h-24 mx-auto rounded-full bg-gray-700 mb-2" />

      {/* Badges */}
      <div>
        <div className="text-sm text-gray-400 mb-1">Badges</div>
        <div className="flex flex-wrap gap-2">
          {badges.map((badge) => (
            <img
              key={badge.badge_url}
              src={badge.badge_url}
              alt={badge.badge_name || "badge"}
              title={badge.badge_name || ""}
              className="w-6 h-6 rounded"
            />
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="text-sm space-y-1">
        <div className="bg-gray-900 rounded px-3 py-2">👁 {stats?.views ?? 0}</div>
        <div className="bg-gray-900 rounded px-3 py-2">💬 {stats?.chats ?? 0}</div>
      </div>
    </div>
  );
}
