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

function convertToH264(
  inputPublicPath: string,
  outputPublicPath: string
): Promise<string> {
  const absInput = path.join(VIDEO_DIR, inputPublicPath);
  const absOutput = path.join(VIDEO_DIR, outputPublicPath);

  return new Promise((resolve, reject) => {
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
      absOutput,
    ];
    execFile(getFfmpegPath(), args, (err) => {
      if (err) return reject(err);
      try {
        fs.accessSync(absOutput, fs.constants.F_OK);
        resolve(outputPublicPath.replaceAll("\\", "/"));
      } catch {
        reject(new Error("Conversion output missing"));
      }
    });
  });
}

function convertToOgg(
  inputPublicPath: string,
  outputPublicPath: string
): Promise<string> {
  const absInput = path.join(VIDEO_DIR, inputPublicPath);
  const absOutput = path.join(VIDEO_DIR, outputPublicPath);

  return new Promise((resolve, reject) => {
    const args = [
      "-y",
      "-i",
      absInput,
      "-c:v",
      "libtheora",
      "-q:v",
      "7",
      "-c:a",
      "libvorbis",
      "-q:a",
      "4",
      absOutput,
    ];
    execFile(getFfmpegPath(), args, (err) => {
      if (err) return reject(err);
      try {
        fs.accessSync(absOutput, fs.constants.F_OK);
        resolve(outputPublicPath.replaceAll("\\", "/"));
      } catch {
        reject(new Error("OGG conversion output missing"));
      }
    });
  });
}

function deriveBasePublicPath(inputPublicPath: string): {
  basePublic: string;
  mp4OriginalPublic: string;
  mp4OutPublic: string;
  oggOutPublic: string;
  inputForConversion: string;
} {
  const parsed = path.parse(inputPublicPath);
  const baseName = parsed.name.replace(/-h264$/, "");
  const basePublic = path.join(parsed.dir, baseName).replaceAll("\\", "/");
  const mp4OriginalPublic = `${basePublic}.mp4`;
  const mp4OutPublic = `${basePublic}-h264.mp4`;
  const oggOutPublic = `${basePublic}.ogg`;
  const originalAbs = path.join(VIDEO_DIR, mp4OriginalPublic);
  const currentAbs = path.join(VIDEO_DIR, inputPublicPath);
  const inputForConversion = fs.existsSync(originalAbs)
    ? mp4OriginalPublic
    : inputPublicPath;
  return {
    basePublic,
    mp4OriginalPublic,
    mp4OutPublic,
    oggOutPublic,
    inputForConversion,
  };
}

async function processFile(tsxPath: string): Promise<void> {
  const original = fs.readFileSync(tsxPath, "utf8");
  const mp4s = findMp4Paths(original);
  if (mp4s.length === 0) return;

  let updated = original;
  for (const p of mp4s) {
    try {
      const { mp4OutPublic, oggOutPublic, inputForConversion } =
        deriveBasePublicPath(p);
      const optimized = await convertToH264(inputForConversion, mp4OutPublic);
      // Attempt OGG as well (best-effort) from the same input
      try {
        const oggOut = await convertToOgg(inputForConversion, oggOutPublic);
        console.log(`Also produced OGG for ${p} → ${oggOut}`);
      } catch (e) {
        console.warn(`OGG conversion skipped for ${p}:`, e);
      }
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
