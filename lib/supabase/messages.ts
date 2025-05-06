import { supabase } from "./supabase";

export async function getMessages(boardOwner: string) {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("board_owner", boardOwner)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data;
}

export async function postMessage(boardOwner: string, author: string, content: string) {
  const { error } = await supabase.from("messages").insert([
    { board_owner: boardOwner, author, content }
  ]);

  if (error) throw error;
}
