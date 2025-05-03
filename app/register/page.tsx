"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError || !data.user) {
      setError(signUpError?.message || "User registration failed.");
      return;
    }

    const userId = data.user.id;

    const { error: dbError } = await supabase.from("users").insert([
      {
        id: userId,      // ✅ Required by your schema
        email,
        username,
      },
    ]);

    if (dbError) {
      console.error("Insert error:", dbError); // ✅ Log to debug unique or null constraint issues
      setError("Account created, but error saving username.");
      return;
    }

    router.push(`/${username}`);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-3xl font-bold text-center sm:text-left">Create Your Board</h1>
        <form onSubmit={handleRegister} className="flex flex-col gap-4 w-full sm:w-[300px]">
          <input
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-black dark:text-white"
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-black dark:text-white"
          />
          <input
            type="password"
            placeholder="Password"
            required
            minLength={10}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-black dark:text-white"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="bg-black dark:bg-white text-white dark:text-black font-semibold px-4 py-2 rounded"
          >
            Register
          </button>
        </form>
      </main>
    </div>
  );
}
