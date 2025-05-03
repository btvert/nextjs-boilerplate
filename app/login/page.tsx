"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError || !data.user) {
      setError("Invalid email or password.");
      return;
    }

    const userId = data.user.id;

    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("username")
      .eq("id", userId)
      .single();

    if (userError || !userData?.username) {
      console.error("Failed to find user in 'users' table:", userError);
      setError("Login succeeded, but user data is missing.");
      return;
    }

    router.push(`/${userData.username}`);
  };

  return (
    <div className="grid place-items-center h-screen p-8 font-[family-name:var(--font-geist-sans)] bg-black text-white">
      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full sm:w-[300px]">
        <h1 className="text-xl font-bold text-center mb-2">Login to Your Board</h1>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 rounded bg-neutral-800 border border-neutral-700 text-white"
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 rounded bg-neutral-800 border border-neutral-700 text-white"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="bg-white text-black font-semibold px-4 py-2 rounded hover:bg-neutral-200"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
