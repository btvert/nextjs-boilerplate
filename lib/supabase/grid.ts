import supabase from "./supabase";

export async function uploadGridImage(file: File, username: string, cellIndex: number) {
  const filePath = `${username}/${cellIndex}_${Date.now()}`;

  const { error: uploadError } = await supabase.storage
    .from("grid_images")
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data: publicUrlData } = supabase
    .storage
    .from("grid_images")
    .getPublicUrl(filePath);

  const imageUrl = publicUrlData.publicUrl;

  const { error: updateError } = await supabase.from("user_grid")
    .upsert({ username, cell_index: cellIndex, image_url: imageUrl });

  if (updateError) throw updateError;

  return imageUrl;
}
