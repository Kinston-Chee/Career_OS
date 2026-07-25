import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs/promises";
import sharp from "sharp";

const here = path.dirname(fileURLToPath(import.meta.url));
const reference = path.resolve(here, "../photo_2026-07-24_23-49-52.jpg");
const render = path.join(here, "renders", "slide-01", "Slide1.PNG");
const out = path.join(here, "qa", "slide-01-side-by-side.png");
await fs.mkdir(path.dirname(out), { recursive: true });
const left = await sharp(reference).resize(1000, 750, { fit: "fill" }).png().toBuffer();
const right = await sharp(render).resize(1000, 750, { fit: "fill" }).png().toBuffer();
await sharp({
  create: { width: 2020, height: 750, channels: 4, background: "#FFFFFF" },
}).composite([
  { input: left, left: 0, top: 0 },
  { input: right, left: 1020, top: 0 },
]).png().toFile(out);
console.log(out);
