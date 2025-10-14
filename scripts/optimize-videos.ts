import ffmpegStatic from "ffmpeg-static";
import { execFile } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const FILES = [
  path.resolve(process.cwd(), "src/components/hero-section.tsx"),
  path.resolve(process.cwd(), "src/components/team.tsx"),
];

const VIDEO_DIR = path.resolve(process.cwd(), "public");

function findMp4Paths(content: string): string[] {
  const regex = /["'`]\/videos\/[A-Za-z0-9_\-\/]+\.mp4["'`]/g;
  const matches = content.match(regex) ?? [];
  return matches
    .map((m) => m.slice(1, -1))
    .filter((v, i, a) => a.indexOf(v) === i);
}

function getFfmpegPath(): string {
  return ffmpegStatic || "ffmpeg";
}

function convertToH264(inputPublicPath: string): Promise<string> {
  // inputPublicPath like /videos/ana_pak/ana_pak_1.mp4
  const absInput = path.join(VIDEO_DIR, inputPublicPath);
  const parsed = path.parse(absInput);
  const output = path.join(parsed.dir, `${parsed.name}-h264.mp4`);

  return new Promise((resolve, reject) => {
    // ffmpeg -i input -c:v libx264 -profile:v high -level 4.1 -pix_fmt yuv420p -crf 23 -preset medium -movflags +faststart -c:a aac -b:a 128k output
    const args = [
      "-y",
      "-i",
      absInput,
      "-c:v",
      "libx264",
      "-profile:v",
      "high",
      "-level",
      "4.1",
      "-pix_fmt",
      "yuv420p",
      "-crf",
      "23",
      "-preset",
      "medium",
      "-movflags",
      "+faststart",
      "-c:a",
      "aac",
      "-b:a",
      "128k",
      output,
    ];
    execFile(getFfmpegPath(), args, (err) => {
      if (err) return reject(err);
      // ensure output exists
      try {
        fs.accessSync(output, fs.constants.F_OK);
        const publicPath = path
          .join(
            path.parse(inputPublicPath).dir,
            `${path.parse(inputPublicPath).name}-h264.mp4`
          )
          .replaceAll("\\", "/");
        resolve(publicPath);
      } catch {
        reject(new Error("Conversion output missing"));
      }
    });
  });
}

async function processFile(tsxPath: string): Promise<void> {
  const original = fs.readFileSync(tsxPath, "utf8");
  const mp4s = findMp4Paths(original);
  if (mp4s.length === 0) return;

  let updated = original;
  for (const p of mp4s) {
    try {
      const optimized = await convertToH264(p);
      const escaped = p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const re = new RegExp(escaped, "g");
      updated = updated.replace(re, optimized);

      console.log(`Optimized ${p} → ${optimized}`);
    } catch (err) {
      console.error(`Failed to optimize ${p}:`, err);
    }
  }

  if (updated !== original) {
    fs.writeFileSync(tsxPath, updated, "utf8");

    console.log(`Updated ${path.relative(process.cwd(), tsxPath)}`);
  }
}

async function main(): Promise<void> {
  for (const f of FILES) {
    if (!fs.existsSync(f)) continue;
    await processFile(f);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
