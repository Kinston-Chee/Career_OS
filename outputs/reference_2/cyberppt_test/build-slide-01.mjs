import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import PptxGenJS from "pptxgenjs";
import sharp from "sharp";

const here = path.dirname(fileURLToPath(import.meta.url));
const source = path.resolve(here, "../photo_2026-07-24_23-49-52.jpg");
const asset = path.join(here, "assets", "slide-01-glass-platform.png");
const out = path.join(here, "pages", "slide-01.pptx");
const iconRoot = "C:/Users/kinst/.codex/skills/cyber-ppt/assets/icons/tabler-outline";

await fs.mkdir(path.dirname(asset), { recursive: true });
await fs.mkdir(path.dirname(out), { recursive: true });
await sharp(source).extract({ left: 690, top: 150, width: 550, height: 620 }).png().toFile(asset);
for (const icon of ["chart-bar", "user", "box", "trending-up"]) {
  await sharp(path.join(iconRoot, `${icon}.svg`)).resize(80, 80).png().toFile(path.join(here, "assets", `${icon}.png`));
}

const pptx = new PptxGenJS();
pptx.defineLayout({ name: "REFERENCE_4X3", width: 10, height: 7.5 });
pptx.layout = "REFERENCE_4X3";
pptx.author = "CareerOS / CyberPPT test";
pptx.subject = "Reference reconstruction test";
pptx.title = "NOVA LINK 智慧商业SaaS平台";
pptx.company = "CareerOS";
pptx.lang = "zh-CN";
pptx.theme = {
  headFontFace: "Microsoft YaHei",
  bodyFontFace: "Microsoft YaHei",
  lang: "zh-CN",
};

const slide = pptx.addSlide();
slide.background = { color: "F8FAFF" };
slide.addImage({ path: asset, x: 5.1, y: 1.05, w: 4.75, h: 5.35, transparency: 0 });

slide.addText("NOVA LINK", {
  x: 0.5, y: 0.25, w: 2.1, h: 0.25,
  fontFace: "Arial", fontSize: 16, bold: true, charSpacing: 2.5,
  color: "071735", margin: 0, breakLine: false,
});
slide.addText("NOVA LINK", {
  x: 0.5, y: 1.78, w: 3.8, h: 0.58,
  fontFace: "Arial", fontSize: 38, bold: true,
  color: "06163A", margin: 0, breakLine: false,
});
slide.addText("智慧商业SaaS平台", {
  x: 0.5, y: 2.47, w: 3.95, h: 0.55,
  fontSize: 27, bold: true, color: "06163A", margin: 0, fit: "shrink",
});
slide.addText("以AI驱动增长效率", {
  x: 0.5, y: 3.28, w: 3.2, h: 0.33,
  fontSize: 19, color: "164FAD", margin: 0,
});
slide.addShape(pptx.ShapeType.line, {
  x: 0.52, y: 3.77, w: 0.62, h: 0,
  line: { color: "2467D8", width: 2.4 },
});
slide.addText("一体化智能经营中枢，助力企业实现精细化运营与持续增长", {
  x: 0.5, y: 3.93, w: 4.12, h: 0.28,
  fontSize: 10.5, color: "7A8394", margin: 0,
});

const features = [
  ["chart-bar.svg", "数据洞察", "洞察 · 决策"],
  ["user.svg", "智能运营", "触达 · 转化"],
  ["box.svg", "全域协同", "整合 · 提效"],
  ["trending-up.svg", "增长加速", "优化 · 增长"],
];
for (const [i, [icon, title, sub]] of features.entries()) {
  const x = 0.5 + i * 1.08;
  slide.addShape(pptx.ShapeType.ellipse, {
    x, y: 4.52, w: 0.56, h: 0.56,
    fill: { color: "FFFFFF", transparency: 8 },
    line: { color: "E4EAF4", width: 1 },
    shadow: { type: "outer", color: "AABAD0", blur: 2, angle: 45, distance: 1, opacity: 0.14 },
  });
  slide.addImage({ path: path.join(here, "assets", icon.replace(".svg", ".png")), x: x + 0.13, y: 4.65, w: 0.3, h: 0.3 });
  slide.addText(title, {
    x: x - 0.13, y: 5.16, w: 0.83, h: 0.23,
    fontSize: 11, bold: true, align: "center", color: "0C1C42", margin: 0,
  });
  slide.addText(sub, {
    x: x - 0.13, y: 5.46, w: 0.83, h: 0.2,
    fontSize: 8.2, align: "center", color: "8A93A4", margin: 0,
  });
}

slide.addText("智  联  商  业  ·  增  长  无  界", {
  x: 0.5, y: 6.93, w: 3.15, h: 0.18,
  fontSize: 8.5, color: "65718A", charSpacing: 1.2, margin: 0,
});
slide.addShape(pptx.ShapeType.line, {
  x: 3.85, y: 7.02, w: 5.25, h: 0,
  line: { color: "D9DFEA", width: 0.7 },
});

slide.addNotes("[Sources]\n- User-provided reference image: outputs/reference_2/photo_2026-07-24_23-49-52.jpg\n- Icons: CyberPPT bundled Tabler outline library");
await pptx.writeFile({ fileName: out });
console.log(out);
