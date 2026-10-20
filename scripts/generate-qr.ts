import { mkdir, writeFile } from "node:fs/promises";
import QRCode from "qrcode";
import sharp from "sharp";

const url = process.argv[2] ?? "https://lanre-world.vercel.app";
const PLUM = "#241633";
const GOLD = "#e9a93b";

const qr = await QRCode.toString(url, {
  type: "svg",
  errorCorrectionLevel: "H",
  margin: 2,
  color: { dark: PLUM, light: "#ffffff" },
});

const size = Number(/viewBox="0 0 (\d+) \d+"/.exec(qr)?.[1]);
if (!size) throw new Error("Could not read the QR code size");

// Centre badge: white ring, plum disc, gold "L". Sizes are relative to the code.
const u = size / 100;
const c = size / 2;
const badge = `<g shape-rendering="geometricPrecision">
  <circle cx="${c}" cy="${c}" r="${11.5 * u}" fill="#ffffff"/>
  <circle cx="${c}" cy="${c}" r="${9.5 * u}" fill="${PLUM}"/>
  <path fill="${GOLD}" d="M${c - 3 * u} ${c - 4 * u}H${c - 0.4 * u}V${c + 1.4 * u}H${c + 3.2 * u}V${c + 4 * u}H${c - 3 * u}Z"/>
</g>`;

const svg = qr.replace("</svg>", `${badge}</svg>`);

await mkdir("public", { recursive: true });
await writeFile("public/qr.svg", svg);

// Whole pixels per square keeps the PNG sharp.
const scale = Math.ceil(1200 / size);
await sharp(Buffer.from(svg), { density: 72 * scale })
  .png()
  .toFile("public/qr.png");

console.log(`QR codes for ${url} saved to public/qr.svg and public/qr.png`);
