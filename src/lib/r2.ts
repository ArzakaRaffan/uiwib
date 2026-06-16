// src/lib/r2.ts — SERVER ONLY, never import in client components
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

const BUCKET = process.env.R2_BUCKET_NAME ?? "uiwib-assets";
const PUBLIC_URL = (process.env.R2_PUBLIC_URL ?? "https://pub-5080dc5a6739471db0d03a2c2b4f8381.r2.dev").replace(/\/$/, "");

export async function uploadImage(
  file: File | Blob,
  folder: "competition" | "training" | "job-expo" | "partners" | "misc",
  fileName: string
): Promise<string> {
  const key = `${folder}/${Date.now()}-${fileName}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  await r2.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: buffer,
      ContentType: file.type || "application/octet-stream",
    })
  );

  return `${PUBLIC_URL}/${key}`;
}

export async function deleteImage(publicUrl: string): Promise<void> {
  try {
    const key = new URL(publicUrl).pathname.slice(1);
    await r2.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }));
  } catch (e) {
    console.error("Failed to delete image from R2:", e);
  }
}
