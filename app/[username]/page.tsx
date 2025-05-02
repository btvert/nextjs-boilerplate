"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";
import UserGrid from "@/components/UserGrid";

type Props = {
  params: {
    username: string;
  };
};

export default function UserPage({ params }: Props) {
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
          setIsOwner(true); // they're logged into this exact board
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
    <div className="h-screen w-screen overflow-hidden bg-black">
      {isOwner && (
        <div className="absolute top-4 right-4 text-white text-sm">
          Logged in as <strong>{username}</strong>
        </div>
      )}
      <UserGrid />
    </div>
  );
}
