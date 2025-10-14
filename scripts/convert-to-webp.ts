import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const IMAGES_DIR = path.resolve(process.cwd(), "public/images");
const VALID_INPUT_EXTENSIONS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".JPG",
  ".JPEG",
  ".PNG",
]);

async function convertFileToWebP(inputFilePath: string): Promise<void> {
  const parsed = path.parse(inputFilePath);
  const outputFilePath = path.join(parsed.dir, `${parsed.name}.webp`);

  // Skip if WebP already exists and is newer or same mtime
  try {
    const inputStat = fs.statSync(inputFilePath);
    const outputStat = fs.statSync(outputFilePath);
    if (outputStat.mtimeMs >= inputStat.mtimeMs) return;
  } catch {
    // continue if output missing
  }

  const buffer = fs.readFileSync(inputFilePath);
  const image = sharp(buffer, { failOn: "none" });

  // Use near-lossless for PNGs, quality 82 default for photos
  const isPng = parsed.ext.toLowerCase() === ".png";

  const webp = image.webp({
    quality: isPng ? 90 : 82,
    effort: 5,
    nearLossless: isPng,
  });

  await webp.toFile(outputFilePath);

  console.log(`Converted → ${path.relative(process.cwd(), outputFilePath)}`);
}

function walk(dir: string, out: string[] = []): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

async function main(): Promise<void> {
  if (!fs.existsSync(IMAGES_DIR)) {
    console.error(`Images directory not found: ${IMAGES_DIR}`);
    process.exit(1);
  }

  const files = walk(IMAGES_DIR).filter((p) =>
    VALID_INPUT_EXTENSIONS.has(path.parse(p).ext)
  );
  if (files.length === 0) {
    console.log("No images to convert.");
    return;
  }

  for (const file of files) {
    try {
      await convertFileToWebP(file);
    } catch (err) {
      console.error(`Failed to convert ${file}:`, err);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
