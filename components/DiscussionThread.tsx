"use client";

import { useEffect, useRef, useState } from "react";
import { getMessages, postMessage } from "@/lib/supabase/messages";
import supabase from "@/lib/supabase/supabase";

export default function DiscussionThread({ boardOwner }: { boardOwner: string }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState<any>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
    };

    fetchUser();
  }, []);

  const fetchMessages = async () => {
    const data = await getMessages(boardOwner);
    setMessages(data);
  };

  const handlePost = async () => {
    if (!user || !newMessage.trim()) return;

    const username = user.user_metadata?.username || user.email;
    await postMessage(boardOwner, username, newMessage);
    setNewMessage("");
    await fetchMessages();
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
            {/* Delete button will come later */}
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
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
