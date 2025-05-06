import supabase from "./supabase";

export async function incrementStat(username: string, field: "views" | "chats") {
  const { error } = await supabase.rpc("increment_user_stat", {
    p_username: username,
    p_field: field
  });

  if (error) throw error;
}
