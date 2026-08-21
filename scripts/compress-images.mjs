import sharp from "sharp";
import { readdirSync, statSync, writeFileSync, readFileSync } from "fs";
import { join, extname } from "path";

const ROOT = "public";
const MAX_DIM = 2000;
const JPEG_QUALITY = 72;
const WEBP_QUALITY = 76;

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

const files = walk(ROOT).filter((f) =>
  [".jpg", ".jpeg", ".png", ".webp"].includes(extname(f).toLowerCase())
);

let totalBefore = 0;
let totalAfter = 0;
let changed = 0;

for (const file of files) {
  const before = statSync(file).size;
  const buf = readFileSync(file);
  const ext = extname(file).toLowerCase();
  let pipeline = sharp(buf).resize({
    width: MAX_DIM,
    height: MAX_DIM,
    fit: "inside",
    withoutEnlargement: true,
  });

  if (ext === ".png") {
    pipeline = pipeline.png({ compressionLevel: 9, adaptiveFiltering: true, palette: true });
  } else if (ext === ".webp") {
    pipeline = pipeline.webp({ quality: WEBP_QUALITY });
  } else {
    pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });
  }

  const out = await pipeline.toBuffer();
  totalBefore += before;

  if (out.length < before) {
    writeFileSync(file, out);
    totalAfter += out.length;
    changed++;
    console.log(
      `${file}: ${(before / 1024).toFixed(0)}KB -> ${(out.length / 1024).toFixed(0)}KB`
    );
  } else {
    totalAfter += before;
  }
}

console.log("---");
console.log(`Files changed: ${changed}/${files.length}`);
console.log(`Total before: ${(totalBefore / 1024 / 1024).toFixed(2)}MB`);
console.log(`Total after:  ${(totalAfter / 1024 / 1024).toFixed(2)}MB`);
console.log(`Saved: ${((totalBefore - totalAfter) / 1024 / 1024).toFixed(2)}MB`);
