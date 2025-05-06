export async function getUserBadges(username: string) {
  const { data, error } = await supabase
    .from("user_badges")
    .select("badge_url, badge_name")
    .eq("username", username);

  if (error) throw error;
  return data;
}
