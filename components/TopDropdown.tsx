"use client";
import { useState, useEffect } from "react";
import supabase from "@/lib/supabase";

export default function TopDropdown() {
  const [visible, setVisible] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsername = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from("users")
          .select("username")
          .eq("id", user.id)
          .single();

        if (!error && data?.username) {
          setUsername(data.username);
        }
      }
    };

    fetchUsername();
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-full z-50"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <div
        className="w-full bg-neutral-900 text-white flex items-center justify-between px-6"
        style={{
          height: 80,
          transform: visible ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.3s ease",
        }}
      >
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-white text-black rounded">Home</button>
          <button className="px-4 py-2 bg-white text-black rounded">Login</button>
          <button className="px-4 py-2 bg-white text-black rounded">Logout</button>
        </div>

        {username && visible && (
          <div className="text-sm text-neutral-300">
            Signed in as <span className="font-medium text-white">{username}</span>
          </div>
        )}
      </div>
    </div>
  );
}
