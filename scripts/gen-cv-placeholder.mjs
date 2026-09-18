// Writes public/cv-example.pdf: a one-page placeholder so the Download CV buttons work
// before the owner uploads a real CV in the admin panel. Run: node scripts/gen-cv-placeholder.mjs
import { writeFileSync } from "node:fs";
import { join } from "node:path";

const lines = [
  "SALMAN SAADIQ - CURRICULUM VITAE (EXAMPLE PLACEHOLDER)",
  "",
  "This is a placeholder file that ships with the portfolio site.",
  "Upload your real CV as a PDF in the admin panel:",
  "Site settings -> Contact & CV -> CV / resume (PDF).",
  "",
  "Once uploaded, every Download CV button on the site points at your file.",
];

const esc = (s) => s.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
let content = "BT\n/F1 12 Tf\n72 740 Td\n14 TL\n";
for (const l of lines) content += `(${esc(l)}) Tj T*\n`;
content += "ET\n";

const objects = [
  "<< /Type /Catalog /Pages 2 0 R >>",
  "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
  "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>",
  `<< /Length ${Buffer.byteLength(content, "latin1")} >>\nstream\n${content}endstream`,
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
];

let pdf = "%PDF-1.4\n";
const offsets = [];
objects.forEach((body, i) => {
  offsets.push(Buffer.byteLength(pdf, "latin1"));
  pdf += `${i + 1} 0 obj\n${body}\nendobj\n`;
});
const xref = Buffer.byteLength(pdf, "latin1");
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
for (const o of offsets) pdf += `${String(o).padStart(10, "0")} 00000 n \n`;
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;

const out = join(process.cwd(), "public", "cv-example.pdf");
writeFileSync(out, Buffer.from(pdf, "latin1"));
console.log("wrote", out);
