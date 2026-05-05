#!/usr/bin/env node
/**
 * Convert GIFs in public/videos/_raw_gifs/ into MP4 (H.264) + WebM (VP9) +
 * a poster JPG. Output goes to public/videos/<subfolder>/ (the subfolder is
 * inferred from the relative path inside _raw_gifs/, defaulting to demos/).
 *
 * Requires `ffmpeg` to be installed and available on PATH. We don't bundle it
 * because it's huge and Carlos may already have it.
 *
 * Usage:
 *   npm run convert:gifs
 */
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, readdir } from "node:fs/promises";
import { join, parse, relative } from "node:path";

const ROOT = process.cwd();
const RAW = join(ROOT, "public", "videos", "_raw_gifs");
const OUT = join(ROOT, "public", "videos");

function checkFfmpeg() {
  try {
    execFileSync("ffmpeg", ["-version"], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".gif")) {
      yield full;
    }
  }
}

async function convert(input) {
  const { name, dir } = parse(input);
  const rel = relative(RAW, dir) || "demos";
  const outDir = join(OUT, rel);
  await mkdir(outDir, { recursive: true });

  const outMp4 = join(outDir, `${name}.mp4`);
  const outWebm = join(outDir, `${name}.webm`);
  const outPoster = join(outDir, `${name}.poster.jpg`);

  // H.264 MP4 with even dimensions (yuv420p compat).
  execFileSync(
    "ffmpeg",
    [
      "-y",
      "-i",
      input,
      "-movflags",
      "+faststart",
      "-pix_fmt",
      "yuv420p",
      "-vf",
      "scale=trunc(iw/2)*2:trunc(ih/2)*2",
      "-c:v",
      "libx264",
      "-preset",
      "slow",
      "-crf",
      "23",
      "-an",
      outMp4,
    ],
    { stdio: "inherit" },
  );

  // VP9 WebM
  execFileSync(
    "ffmpeg",
    [
      "-y",
      "-i",
      input,
      "-c:v",
      "libvpx-vp9",
      "-b:v",
      "0",
      "-crf",
      "32",
      "-row-mt",
      "1",
      "-an",
      outWebm,
    ],
    { stdio: "inherit" },
  );

  // First-frame poster
  execFileSync(
    "ffmpeg",
    ["-y", "-i", input, "-frames:v", "1", "-q:v", "3", outPoster],
    { stdio: "inherit" },
  );

  console.log(`✓ ${relative(ROOT, outMp4)}`);
  console.log(`✓ ${relative(ROOT, outWebm)}`);
  console.log(`✓ ${relative(ROOT, outPoster)}`);
}

async function main() {
  if (!checkFfmpeg()) {
    console.error(
      "ffmpeg not found on PATH. Install from https://ffmpeg.org/download.html and re-run.",
    );
    process.exit(1);
  }
  if (!existsSync(RAW)) {
    console.log("No raw GIFs directory at public/videos/_raw_gifs/. Nothing to do.");
    return;
  }
  let count = 0;
  for await (const gif of walk(RAW)) {
    await convert(gif);
    count += 1;
  }
  if (count === 0) {
    console.log("public/videos/_raw_gifs/ is empty — drop GIFs here and re-run.");
  } else {
    console.log(`\nConverted ${count} GIF(s).`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
