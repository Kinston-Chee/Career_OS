import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import PptxGenJS from "pptxgenjs";
import sharp from "sharp";

const here = path.dirname(fileURLToPath(import.meta.url));
const source = path.resolve(here, "../photo_2026-07-24_23-49-52.jpg");
const asset = path.join(here, "assets", "careeros-glass-system.png");
const out = path.join(here, "pages", "careeros-cover.pptx");
const iconRoot = "C:/Users/kinst/.codex/skills/cyber-ppt/assets/icons/tabler-outline";
const features = [
  ["database", "Career Memory", "Preserve · Prove"],
  ["route", "Career Intelligence", "Explore · Prepare"],
  ["users", "Talent Discovery", "Explain · Validate"],
  ["building-bank", "University Action", "Detect · Intervene"],
];

await fs.mkdir(path.dirname(asset), { recursive: true });
await fs.mkdir(path.dirname(out), { recursive: true });
await sharp(source).extract({ left: 690, top: 150, width: 550, height: 620 }).png().toFile(asset);
for (const [icon] of features) {
  await sharp(path.join(iconRoot, `${icon}.svg`)).resize(80, 80).png().toFile(path.join(here, "assets", `${icon}.png`));
}
await sharp(path.join(iconRoot, "briefcase.svg")).resize(80, 80).png().toFile(path.join(here, "assets", "briefcase.png"));

const pptx = new PptxGenJS();
pptx.defineLayout({ name: "REFERENCE_4X3", width: 10, height: 7.5 });
pptx.layout = "REFERENCE_4X3";
pptx.author = "CareerOS";
pptx.subject = "Asynchronous product pitch";
pptx.title = "CareerOS — AI-Powered Career Operating System";
pptx.company = "CareerOS";
pptx.lang = "en-US";
pptx.theme = { headFontFace: "Aptos Display", bodyFontFace: "Aptos", lang: "en-US" };

const slide = pptx.addSlide();
slide.background = { color: "F8FAFF" };
slide.addImage({ path: asset, x: 5.1, y: 1.05, w: 4.75, h: 5.35 });
slide.addShape(pptx.ShapeType.ellipse, {
  x: 9.08, y: 3.18, w: 0.62, h: 0.62,
  fill: { color: "FFFFFF", transparency: 4 },
  line: { color: "E1E8F3", width: 1 },
  shadow: { type: "outer", color: "AABAD0", blur: 2, angle: 45, distance: 1, opacity: 0.15 },
});
slide.addImage({ path: path.join(here, "assets", "briefcase.png"), x: 9.23, y: 3.33, w: 0.32, h: 0.32 });

slide.addText("CAREEROS", {
  x: 0.5, y: 0.25, w: 2.1, h: 0.25,
  fontFace: "Arial", fontSize: 16, bold: true, charSpacing: 2.5,
  color: "071735", margin: 0,
});
slide.addText("CareerOS", {
  x: 0.5, y: 1.7, w: 3.7, h: 0.62,
  fontFace: "Arial", fontSize: 39, bold: true, color: "06163A", margin: 0,
});
slide.addText("AI-Powered Career Operating System", {
  x: 0.5, y: 2.46, w: 4.45, h: 0.55,
  fontSize: 23, bold: true, color: "06163A", margin: 0, fit: "shrink",
});
slide.addText("Remember the signal. Act earlier.", {
  x: 0.5, y: 3.28, w: 4.1, h: 0.33,
  fontSize: 18.5, color: "164FAD", margin: 0,
});
slide.addShape(pptx.ShapeType.line, {
  x: 0.52, y: 3.77, w: 0.62, h: 0,
  line: { color: "2467D8", width: 2.4 },
});
slide.addText("CareerOS connects student evidence, employer demand, and university action so gaps can be addressed earlier.", {
  x: 0.5, y: 3.93, w: 4.28, h: 0.46,
  fontSize: 10.5, color: "727D91", margin: 0, breakLine: false,
});

for (const [i, [icon, title, sub]] of features.entries()) {
  const x = 0.5 + i * 1.08;
  slide.addShape(pptx.ShapeType.ellipse, {
    x, y: 4.58, w: 0.56, h: 0.56,
    fill: { color: "FFFFFF", transparency: 8 },
    line: { color: "E4EAF4", width: 1 },
    shadow: { type: "outer", color: "AABAD0", blur: 2, angle: 45, distance: 1, opacity: 0.14 },
  });
  slide.addImage({ path: path.join(here, "assets", `${icon}.png`), x: x + 0.13, y: 4.71, w: 0.3, h: 0.3 });
  slide.addText(title, {
    x: x - 0.18, y: 5.2, w: 0.92, h: 0.34,
    fontSize: 9.2, bold: true, align: "center", color: "0C1C42", margin: 0, fit: "shrink",
  });
  slide.addText(sub, {
    x: x - 0.18, y: 5.58, w: 0.92, h: 0.2,
    fontSize: 7.5, align: "center", color: "8A93A4", margin: 0,
  });
}

slide.addText("STUDENT  ·  EMPLOYER  ·  UNIVERSITY", {
  x: 0.5, y: 6.93, w: 3.15, h: 0.18,
  fontSize: 8.2, color: "65718A", charSpacing: 1.05, margin: 0,
});
slide.addShape(pptx.ShapeType.line, {
  x: 3.85, y: 7.02, w: 5.25, h: 0,
  line: { color: "D9DFEA", width: 0.7 },
});

slide.addNotes("[Sources]\n- CareerOS deck production blueprint: docs/pitch/CAREEROS_DECK_PRODUCTION_BLUEPRINT.md\n- CareerOS deep value discovery: docs/pitch/CAREEROS_DEEP_VALUE_DISCOVERY.md\n- Visual reference: outputs/reference_2/photo_2026-07-24_23-49-52.jpg\n- Icons: CyberPPT bundled Tabler outline library");
await pptx.writeFile({ fileName: out });
console.log(out);
