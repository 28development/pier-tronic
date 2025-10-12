import { readFile } from "fs/promises";
import path from "path";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

// Image generation - uses the apple-icon as base and serves it as favicon
export default async function Icon() {
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
