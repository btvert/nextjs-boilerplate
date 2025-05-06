// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase/supabase";
import UserGrid from "@/components/UserGrid";
import SidebarStats from "@/components/SidebarStats";
import DiscussionThread from "@/components/DiscussionThread";

export default function UserPage({ params }) {
  const { username } = params;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();

      if (data?.user?.email) {
        const { data: userRow } = await supabase
          .from("users")
          .select("username")
          .eq("email", data.user.email)
          .single();

        if (userRow?.username === username) {
          setIsOwner(true);
        }
      }

      setIsLoading(false);
    };

    checkAuth();
  }, [username]);

  if (isLoading) {
    return <div className="text-white h-screen w-screen grid place-items-center">Loading...</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-black">
      {/* Left Sidebar */}
      <aside className="w-[225px] bg-black text-white p-4 flex-shrink-0">
        <div className="text-xl font-mono font-semibold mb-4">/{username}</div>
        <SidebarStats username={username} />
      </aside>

      {/* Center Scrollable Area */}
      <main className="flex-1 h-screen overflow-y-scroll overflow-x-hidden scrollbar-hide">
        <div className="min-h-screen py-6 w-full max-w-full">
          {isOwner && (
            <div className="text-sm text-right text-gray-400 mb-2 pr-4">
              Logged in as <strong>{username}</strong>
            </div>
          )}

          <UserGrid isEditMode={isOwner} />
          <DiscussionThread boardOwner={username} />
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="w-[225px] bg-black text-white p-4 flex-shrink-0">
        <div className="text-center text-sm opacity-50">Edit Panel (Coming Soon)</div>
      </aside>
    </div>
  );
}
