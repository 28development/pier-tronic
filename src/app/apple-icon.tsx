import { readFile } from "fs/promises";
import path from "path";

// Image metadata
export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

// Image generation
export default async function AppleIcon() {
  // Read the actual apple-icon.png from the public folder
  const imageBuffer = await readFile(
    path.join(process.cwd(), "public", "apple-icon.png")
  );

  return new Response(new Uint8Array(imageBuffer), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
