import supabase from "./supabase";

export async function uploadGridImage(file: File, username: string, cellIndex: number) {
  const ext = file.name.split('.').pop();
  const filePath = `${username}/${cellIndex}_${Date.now()}.${ext}`;

  // Upload the file
  const { error: uploadError } = await supabase.storage
    .from("grid_images")
    .upload(filePath, file, { upsert: true });

  if (uploadError) throw uploadError;

  // Get public URL
  const { data: publicUrlData } = supabase
    .storage
    .from("grid_images")
    .getPublicUrl(filePath);

  const imageUrl = publicUrlData.publicUrl;

  // Save to user_grid
  const { error: updateError } = await supabase.from("user_grid")
    .upsert({
      username,
      cell_index: cellIndex,
      image_url: imageUrl,
      storage_path: filePath
    });

  if (updateError) throw updateError;

  return imageUrl;
}

export async function getGridData(username: string) {
  const { data, error } = await supabase
    .from("user_grid")
    .select("cell_index, image_url")
    .eq("username", username);

  if (error) throw error;

  // Convert to { [cell_index]: image_url }
  const gridMap: Record<number, string> = {};
  data.forEach((row) => {
    gridMap[row.cell_index] = row.image_url;
  });

  return gridMap;
}

export async function removeGridImage(username: string, cellIndex: number) {
  // First get storage path
  const { data, error: selectError } = await supabase
    .from("user_grid")
    .select("storage_path")
    .eq("username", username)
    .eq("cell_index", cellIndex)
    .single();

  if (selectError) throw selectError;

  const storagePath = data?.storage_path;

  // Delete file from Supabase storage
  if (storagePath) {
    const { error: storageError } = await supabase
      .storage
      .from("grid_images")
      .remove([storagePath]);

    if (storageError) throw storageError;
  }

  // Remove row from table
  const { error } = await supabase
    .from("user_grid")
    .delete()
    .eq("username", username)
    .eq("cell_index", cellIndex);

  if (error) throw error;
}
