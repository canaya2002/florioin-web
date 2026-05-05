#!/usr/bin/env node
/**
 * Optimize raw images dropped into public/images/_raw/ and write AVIF + WebP
 * variants into the appropriate subfolder (mirrors the relative path).
 *
 * Usage:
 *   npm run optimize:images
 *
 * Conventions:
 *   - Input filename starts with a folder hint, e.g.:
 *       _raw/product/inbox-light.png  → product/inbox-light.{avif,webp}
 *     Or use top-level _raw files; they go to public/images/.
 *   - Existing files are skipped unless --force is passed.
 */
import { readdir, mkdir, stat, copyFile } from "node:fs/promises";
import { join, parse, relative } from "node:path";
import { existsSync } from "node:fs";

import sharp from "sharp";

const argv = new Set(process.argv.slice(2));
const FORCE = argv.has("--force");
const ROOT = process.cwd();
const RAW_DIR = join(ROOT, "public", "images", "_raw");
const OUT_DIR = join(ROOT, "public", "images");

const SUPPORTED = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif", ".tif", ".tiff"]);

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else if (entry.isFile()) {
      yield full;
    }
  }
}

async function processFile(file) {
  const { ext, name, dir } = parse(file);
  if (!SUPPORTED.has(ext.toLowerCase())) return;
  if (name.startsWith(".")) return;

  const rel = relative(RAW_DIR, dir);
  const outDir = join(OUT_DIR, rel);
  await mkdir(outDir, { recursive: true });

  const outBase = join(outDir, name);
  const targets = [
    { ext: "avif", options: { quality: 60, effort: 5 } },
    { ext: "webp", options: { quality: 78 } },
  ];

  for (const { ext: outExt, options } of targets) {
    const outPath = `${outBase}.${outExt}`;
    if (!FORCE && existsSync(outPath)) {
      const inStat = await stat(file);
      const outStat = await stat(outPath);
      if (outStat.mtimeMs >= inStat.mtimeMs) {
        continue;
      }
    }
    const pipe = sharp(file).rotate();
    if (outExt === "avif") {
      await pipe.avif(options).toFile(outPath);
    } else {
      await pipe.webp(options).toFile(outPath);
    }
    console.log(`✓ ${relative(ROOT, outPath)}`);
  }

  // Also copy the original PNG/JPG so <Image> can fallback when needed.
  const fallbackOut = `${outBase}${ext.toLowerCase()}`;
  if (!existsSync(fallbackOut)) {
    await copyFile(file, fallbackOut);
    console.log(`  ${relative(ROOT, fallbackOut)} (copy)`);
  }
}

async function main() {
  if (!existsSync(RAW_DIR)) {
    console.log("No raw input directory found at public/images/_raw/. Nothing to do.");
    return;
  }
  let count = 0;
  for await (const file of walk(RAW_DIR)) {
    await processFile(file);
    count += 1;
  }
  if (count === 0) {
    console.log("public/images/_raw/ is empty — drop raw images here and re-run.");
  } else {
    console.log(`\nProcessed ${count} input file(s).`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
