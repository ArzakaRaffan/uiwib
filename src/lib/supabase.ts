// src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

// Public client — safe to use in browser (read-only operations)
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Admin client — SERVER ONLY, never import this in client components
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const BUCKET = process.env.NEXT_PUBLIC_STORAGE_BUCKET ?? "uiwib-assets";

/**
 * Upload a file to Supabase Storage.
 * Call this from API routes only (uses service role key).
 * @returns public URL of the uploaded file
 */
export async function uploadImage(
  file: File | Blob,
  folder: "competition" | "training" | "job-expo" | "partners" | "misc",
  fileName: string
): Promise<string> {
  const path = `${folder}/${Date.now()}-${fileName}`;

  const { error } = await supabaseAdmin.storage
    .from(BUCKET)
    .upload(path, file, { upsert: false });

  if (error) throw new Error(`Upload failed: ${error.message}`);

  const { data } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

/**
 * Delete a file from Supabase Storage by its public URL.
 */
export async function deleteImage(publicUrl: string): Promise<void> {
  const url = new URL(publicUrl);
  // Extract path after /object/public/{bucket}/
  const pathStart = url.pathname.indexOf(`/${BUCKET}/`) + `/${BUCKET}/`.length;
  const filePath = url.pathname.slice(pathStart);

  const { error } = await supabaseAdmin.storage.from(BUCKET).remove([filePath]);
  if (error) console.error("Failed to delete image:", error.message);
}
