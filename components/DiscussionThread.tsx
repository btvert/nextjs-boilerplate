"use client";

import { useEffect, useRef, useState } from "react";
import { getMessages, postMessage } from "@/lib/supabase/messages";
import supabase from "@/lib/supabase/supabase";
import { useUser } from "@supabase/auth-helpers-react"; // if you're using auth-helpers

export default function DiscussionThread({ boardOwner }: { boardOwner: string }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const user = useUser(); // optional: replace with your session user if needed

  const fetchMessages = async () => {
    const data = await getMessages(boardOwner);
    setMessages(data);
  };

  const handlePost = async () => {
    if (!user || !newMessage.trim()) return;

    setLoading(true);
    await postMessage(boardOwner, user.user_metadata.username || user.email, newMessage);
    setNewMessage("");
    await fetchMessages();
    setLoading(false);
  };

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="w-full bg-black text-white px-4 py-6 mt-8 max-w-screen-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Discussion</h2>
      <div className="space-y-3 max-h-[400px] overflow-y-auto border border-gray-700 rounded p-4 bg-gray-900">
        {messages.map((msg) => (
          <div key={msg.id} className="bg-gray-800 p-2 rounded">
            <p className="text-sm text-gray-400">{msg.author} said:</p>
            <p className="text-base">{msg.content}</p>
            {/* Show delete only if the user is the board owner */}
            {user?.user_metadata?.username === boardOwner && (
              <button className="text-red-400 text-xs mt-1">Delete (soon)</button>
            )}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="mt-4 flex gap-2">
        <input
          className="flex-1 bg-gray-800 text-white p-2 rounded outline-none"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          onClick={handlePost}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
