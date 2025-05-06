// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase/supabase";
import UserGrid from "@/components/UserGrid";
import DiscussionThread from "@/components/DiscussionThread";
import StatsSlideout from "@/components/StatsSlideout";
import EditSlideout from "@/components/EditSlideout";

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
    <div className="relative bg-black text-white">
      {/* Fullscreen Grid */}
      <div className="w-screen h-screen overflow-hidden">
        <UserGrid isEditMode={isOwner} />
      </div>

      {/* Invisible Hover Zones for Slideouts */}
      <div className="absolute left-0 top-0 h-screen w-[20px] z-40">
        <StatsSlideout username={username} />
      </div>
      {isOwner && (
        <div className="absolute right-0 top-0 h-screen w-[20px] z-40">
          <EditSlideout />
        </div>
      )}

      {/* Discussion Thread Below */}
      <div className="w-full bg-black">
        <DiscussionThread boardOwner={username} />
      </div>
    </div>
  );
}
