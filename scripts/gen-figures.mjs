// Generates the placeholder "prints" used until the owner uploads real photos.
// Every figure is computed from real engineering equations and labelled EXAMPLE.
// Run: node scripts/gen-figures.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = join(process.cwd(), "public", "placeholders");
mkdirSync(OUT, { recursive: true });

const W = 1600;
const H = 1000;
const PAPER = "#dfe3e8";
const INK = "#1a1e24";
const INK2 = "#5b626b";
const PEN = "#e8452c";
const GRID = "#c9cfd6";

const fmt = (n) => (Math.round(n * 100) / 100).toString();

function frame(title, subtitle, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" font-family="'B612 Mono', 'Courier New', monospace">
<rect width="${W}" height="${H}" fill="${PAPER}"/>
<defs>
  <pattern id="g" width="40" height="40" patternUnits="userSpaceOnUse">
    <path d="M40 0H0V40" fill="none" stroke="${GRID}" stroke-width="1"/>
  </pattern>
</defs>
<rect x="60" y="60" width="${W - 120}" height="${H - 120}" fill="url(#g)" stroke="${INK}" stroke-width="2"/>
<text x="80" y="100" font-size="26" fill="${INK}" font-weight="700">${title}</text>
<text x="80" y="130" font-size="18" fill="${INK2}">${subtitle}</text>
<g transform="translate(${W - 80},${H - 84})" text-anchor="end">
  <text font-size="16" fill="${INK2}">FIG. — EXAMPLE PRINT · REPLACE WITH YOUR OWN PHOTO OR FIGURE IN THE ADMIN PANEL</text>
</g>
${body}
</svg>`;
}

// Axis helper: maps data to a plot box.
function plot({ x, y, w, h, xr, yr, xl, yl, xt = 5, yt = 5 }) {
  const sx = (v) => x + ((v - xr[0]) / (xr[1] - xr[0])) * w;
  const sy = (v) => y + h - ((v - yr[0]) / (yr[1] - yr[0])) * h;
  let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${INK}" stroke-width="1.5"/>`;
  for (let i = 0; i <= xt; i++) {
    const v = xr[0] + ((xr[1] - xr[0]) * i) / xt;
    s += `<line x1="${fmt(sx(v))}" y1="${y + h}" x2="${fmt(sx(v))}" y2="${y + h + 8}" stroke="${INK}"/>`;
    s += `<text x="${fmt(sx(v))}" y="${y + h + 28}" font-size="14" fill="${INK}" text-anchor="middle">${fmt(v)}</text>`;
  }
  for (let i = 0; i <= yt; i++) {
    const v = yr[0] + ((yr[1] - yr[0]) * i) / yt;
    s += `<line x1="${x - 8}" y1="${fmt(sy(v))}" x2="${x}" y2="${fmt(sy(v))}" stroke="${INK}"/>`;
    s += `<text x="${x - 14}" y="${fmt(sy(v) + 5)}" font-size="14" fill="${INK}" text-anchor="end">${fmt(v)}</text>`;
  }
  s += `<text x="${x + w / 2}" y="${y + h + 56}" font-size="16" fill="${INK}" text-anchor="middle">${xl}</text>`;
  s += `<text transform="translate(${x - 64},${y + h / 2}) rotate(-90)" font-size="16" fill="${INK}" text-anchor="middle">${yl}</text>`;
  return { s, sx, sy };
}

function pathFrom(points, sx, sy) {
  return points.map((p, i) => `${i ? "L" : "M"}${fmt(sx(p[0]))} ${fmt(sy(p[1]))}`).join("");
}

/* 1. Fixed-wing UAV flight controller: pitch-rate step response of a PID loop */
{
  // Closed-loop second order approximation: wn = 6 rad/s, zeta = 0.55
  const wn = 6, z = 0.55;
  const wd = wn * Math.sqrt(1 - z * z);
  const pts = [];
  for (let t = 0; t <= 2.5; t += 0.01) {
    const y = 1 - Math.exp(-z * wn * t) * (Math.cos(wd * t) + (z / Math.sqrt(1 - z * z)) * Math.sin(wd * t));
    pts.push([t, y]);
  }
  const p = plot({ x: 160, y: 200, w: 760, h: 600, xr: [0, 2.5], yr: [0, 1.4], xl: "TIME (s)", yl: "PITCH ANGLE (normalised)", xt: 5, yt: 7 });
  let body = p.s;
  body += `<path d="${pathFrom([[0, 1], [2.5, 1]], p.sx, p.sy)}" stroke="${INK2}" stroke-dasharray="6 6" fill="none"/>`;
  body += `<path d="${pathFrom(pts, p.sx, p.sy)}" stroke="${PEN}" stroke-width="3" fill="none"/>`;
  // Overshoot annotation
  const tp = Math.PI / wd;
  const mp = 1 + Math.exp((-z * Math.PI) / Math.sqrt(1 - z * z));
  body += `<line x1="${fmt(p.sx(tp))}" y1="${fmt(p.sy(mp))}" x2="${fmt(p.sx(tp) + 80)}" y2="${fmt(p.sy(mp) - 40)}" stroke="${INK}"/>`;
  body += `<text x="${fmt(p.sx(tp) + 88)}" y="${fmt(p.sy(mp) - 44)}" font-size="16" fill="${INK}">Mp = ${fmt((mp - 1) * 100)} %  ·  tp = ${fmt(tp)} s</text>`;
  // PCB sketch on the right
  body += `<g transform="translate(1040,200)">
    <rect x="0" y="0" width="420" height="420" rx="14" fill="none" stroke="${INK}" stroke-width="2"/>
    <circle cx="24" cy="24" r="8" fill="none" stroke="${INK}"/><circle cx="396" cy="24" r="8" fill="none" stroke="${INK}"/>
    <circle cx="24" cy="396" r="8" fill="none" stroke="${INK}"/><circle cx="396" cy="396" r="8" fill="none" stroke="${INK}"/>
    <rect x="150" y="150" width="120" height="120" fill="none" stroke="${INK}" stroke-width="2"/>
    <text x="210" y="216" font-size="16" fill="${INK}" text-anchor="middle">U1 · STM32F4</text>
    <rect x="60" y="60" width="60" height="40" fill="none" stroke="${INK}"/><text x="90" y="86" font-size="12" fill="${INK}" text-anchor="middle">IMU</text>
    <rect x="300" y="60" width="60" height="40" fill="none" stroke="${INK}"/><text x="330" y="86" font-size="12" fill="${INK}" text-anchor="middle">BARO</text>
    <rect x="60" y="320" width="100" height="40" fill="none" stroke="${INK}"/><text x="110" y="346" font-size="12" fill="${INK}" text-anchor="middle">GNSS</text>
    <rect x="260" y="320" width="100" height="40" fill="none" stroke="${INK}"/><text x="310" y="346" font-size="12" fill="${INK}" text-anchor="middle">SERVO OUT</text>
    <path d="M120 80H150V150M300 80H270V150M110 320V270H150M310 320V270H270" fill="none" stroke="${PEN}" stroke-width="2"/>
    <text x="210" y="450" font-size="16" fill="${INK2}" text-anchor="middle">CONTROLLER BOARD · 4-LAYER · 60 × 60 mm</text>
  </g>`;
  body += `<text x="1040" y="740" font-size="16" fill="${INK}">LOOP: PID on pitch rate, 250 Hz</text>
<text x="1040" y="768" font-size="16" fill="${INK}">GAINS: Kp 0.42 · Ki 0.08 · Kd 0.021</text>
<text x="1040" y="796" font-size="16" fill="${INK}">MODEL: 2nd-order fit, ωn = ${wn} rad/s, ζ = ${z}</text>`;
  writeFileSync(join(OUT, "uav-flight-controller.svg"), frame("FIXED-WING UAV FLIGHT CONTROLLER", "Pitch step response of the closed loop, simulated vs. flight log (example figure)", body));
}

/* 2. Brushless ESC: three-phase back-EMF (trapezoidal) with commutation windows */
{
  const p = plot({ x: 160, y: 200, w: 1280, h: 520, xr: [0, 360], yr: [-1.2, 1.2], xl: "ELECTRICAL ANGLE (deg)", yl: "BACK-EMF (normalised)", xt: 6, yt: 4 });
  let body = p.s;
  const trap = (th) => {
    const t = ((th % 360) + 360) % 360;
    if (t < 60) return t / 60;
    if (t < 180) return 1;
    if (t < 240) return 1 - (t - 180) / 60;
    if (t < 360) return -1 + (t < 300 ? 0 : (t - 300) / 60) * 0 - (t < 300 ? 0 : 0);
    return 0;
  };
  const wave = (offset) => {
    const pts = [];
    for (let th = 0; th <= 360; th += 1) {
      const t = ((th + offset) % 360 + 360) % 360;
      let v;
      if (t < 30) v = t / 30;
      else if (t < 150) v = 1;
      else if (t < 210) v = 1 - (t - 150) / 30;
      else if (t < 330) v = -1;
      else v = -1 + (t - 330) / 30;
      pts.push([th, v]);
    }
    return pts;
  };
  void trap;
  const colors = [PEN, INK, INK2];
  ["A", "B", "C"].forEach((ph, i) => {
    body += `<path d="${pathFrom(wave(-i * 120), p.sx, p.sy)}" stroke="${colors[i]}" stroke-width="${i === 0 ? 3 : 2}" fill="none"/>`;
    body += `<text x="${p.sx(8)}" y="${p.sy(1.05) - 8 - i * 0}" font-size="14" fill="${colors[i]}" transform="translate(${i * 60},0)">PH ${ph}</text>`;
  });
  for (let k = 0; k < 6; k++) {
    const a = k * 60;
    body += `<line x1="${fmt(p.sx(a))}" y1="${p.sy(1.2)}" x2="${fmt(p.sx(a))}" y2="${p.sy(-1.2)}" stroke="${INK2}" stroke-dasharray="4 8"/>`;
    body += `<text x="${fmt(p.sx(a + 30))}" y="${p.sy(-1.2) - 12}" font-size="14" fill="${INK2}" text-anchor="middle">STEP ${k + 1}</text>`;
  }
  body += `<text x="160" y="800" font-size="16" fill="${INK}">SIX-STEP COMMUTATION · HALL SENSED · 12 V / 20 A MOSFET BRIDGE</text>
<text x="160" y="828" font-size="16" fill="${INK}">MEASURED: ripple 6.1 % at 8 000 rpm · η = 0.91 at 120 W</text>`;
  writeFileSync(join(OUT, "brushless-esc.svg"), frame("BRUSHLESS MOTOR ESC FROM SCRATCH", "Three-phase back-EMF and commutation windows (example figure)", body));
}

/* 3. Wind-tunnel airfoil rig: NACA 2412 section with pressure taps and Cp distribution */
{
  const naca = (m, pp, t, n = 80) => {
    const up = [], lo = [];
    for (let i = 0; i <= n; i++) {
      const x = 0.5 * (1 - Math.cos((Math.PI * i) / n));
      const yt = 5 * t * (0.2969 * Math.sqrt(x) - 0.126 * x - 0.3516 * x ** 2 + 0.2843 * x ** 3 - 0.1036 * x ** 4);
      let yc, dyc;
      if (x < pp) { yc = (m / pp ** 2) * (2 * pp * x - x ** 2); dyc = ((2 * m) / pp ** 2) * (pp - x); }
      else { yc = (m / (1 - pp) ** 2) * (1 - 2 * pp + 2 * pp * x - x ** 2); dyc = ((2 * m) / (1 - pp) ** 2) * (pp - x); }
      const th = Math.atan(dyc);
      up.push([x - yt * Math.sin(th), yc + yt * Math.cos(th)]);
      lo.push([x + yt * Math.sin(th), yc - yt * Math.cos(th)]);
    }
    return { up, lo };
  };
  const { up, lo } = naca(0.02, 0.4, 0.12);
  const ax = 120, ay = 200, aw = 700, ah = 300;
  const sx = (x) => ax + x * aw;
  const sy = (y) => ay + ah / 2 - y * aw;
  let body = `<path d="${up.map((p, i) => `${i ? "L" : "M"}${fmt(sx(p[0]))} ${fmt(sy(p[1]))}`).join("")}${[...lo].reverse().map((p) => `L${fmt(sx(p[0]))} ${fmt(sy(p[1]))}`).join("")}Z" fill="none" stroke="${INK}" stroke-width="3"/>`;
  body += `<line x1="${sx(0)}" y1="${sy(0)}" x2="${sx(1)}" y2="${sy(0)}" stroke="${INK2}" stroke-dasharray="6 6"/>`;
  // pressure taps
  const taps = [0.05, 0.1, 0.2, 0.3, 0.45, 0.6, 0.75, 0.9];
  taps.forEach((x, i) => {
    const iu = Math.round(Math.acos(1 - 2 * x) / Math.PI * 80);
    const pt = up[iu];
    body += `<circle cx="${fmt(sx(pt[0]))}" cy="${fmt(sy(pt[1]))}" r="5" fill="${PEN}"/>`;
    body += `<line x1="${fmt(sx(pt[0]))}" y1="${fmt(sy(pt[1]) - 8)}" x2="${fmt(sx(pt[0]))}" y2="${fmt(sy(pt[1]) - 40)}" stroke="${PEN}"/>`;
    body += `<text x="${fmt(sx(pt[0]))}" y="${fmt(sy(pt[1]) - 48)}" font-size="13" fill="${PEN}" text-anchor="middle">T${i + 1}</text>`;
  });
  body += `<text x="${ax}" y="${ay + ah + 40}" font-size="16" fill="${INK}">NACA 2412 · c = 150 mm · 8 UPPER-SURFACE TAPS · 3D-PRINTED PLA, SANDED</text>`;
  // Cp plot: thin-airfoil approximation for upper surface at alpha = 4 deg
  const alpha = (4 * Math.PI) / 180;
  const cp = [];
  for (let x = 0.02; x <= 1; x += 0.01) {
    const th = Math.acos(1 - 2 * x);
    const gamma = 2 * alpha * (1 + Math.cos(th)) / Math.sin(th) + 0.3 * Math.sin(th); // crude camber term
    const v = 1 + gamma / 2;
    cp.push([x, 1 - v * v]);
  }
  const p = plot({ x: 980, y: 220, w: 460, h: 520, xr: [0, 1], yr: [-2.5, 1], xl: "x / c", yl: "Cp (upper surface)", xt: 5, yt: 7 });
  body += p.s;
  body += `<path d="${pathFrom(cp, p.sx, p.sy)}" stroke="${INK}" stroke-width="2" fill="none"/>`;
  taps.forEach((x) => {
    const c = cp.find((q) => Math.abs(q[0] - x) < 0.006) ?? cp[0];
    body += `<circle cx="${fmt(p.sx(x))}" cy="${fmt(p.sy(c[1] * 0.92 + 0.05))}" r="6" fill="${PEN}"/>`;
  });
  body += `<text x="${p.sx(0.5)}" y="${p.sy(0.9)}" font-size="14" fill="${INK2}" text-anchor="middle">— thin-airfoil model · ● measured, α = 4°</text>`;
  body += `<text x="120" y="820" font-size="16" fill="${INK}">TUNNEL: 300 × 300 mm open-return · U∞ = 18 m/s · Re ≈ 1.8 × 10⁵</text>`;
  writeFileSync(join(OUT, "airfoil-pressure-rig.svg"), frame("WIND-TUNNEL AIRFOIL PRESSURE RIG", "Instrumented NACA 2412 section and measured Cp distribution (example figure)", body));
}

/* 4. Solar MPPT charger: I-V and P-V curve with the maximum power point */
{
  const Isc = 5.2, Voc = 21.6, n = 1.3, Vt = 0.02585 * 36; // 36 cells
  const I0 = Isc / (Math.exp(Voc / (n * Vt)) - 1);
  const iv = [], pv = [];
  let best = [0, 0];
  for (let v = 0; v <= Voc; v += 0.1) {
    const i = Math.max(0, Isc - I0 * (Math.exp(v / (n * Vt)) - 1));
    iv.push([v, i]);
    pv.push([v, v * i]);
    if (v * i > best[1]) best = [v, v * i];
  }
  const p = plot({ x: 160, y: 200, w: 760, h: 560, xr: [0, 24], yr: [0, 100], xl: "PANEL VOLTAGE (V)", yl: "POWER (W)", xt: 6, yt: 5 });
  let body = p.s;
  body += `<path d="${pathFrom(pv, p.sx, p.sy)}" stroke="${PEN}" stroke-width="3" fill="none"/>`;
  body += `<path d="${pathFrom(iv.map(([v, i]) => [v, i * 16]), p.sx, p.sy)}" stroke="${INK}" stroke-width="2" stroke-dasharray="8 6" fill="none"/>`;
  body += `<circle cx="${fmt(p.sx(best[0]))}" cy="${fmt(p.sy(best[1]))}" r="8" fill="none" stroke="${INK}" stroke-width="2"/>`;
  body += `<text x="${fmt(p.sx(best[0]) + 16)}" y="${fmt(p.sy(best[1]) - 12)}" font-size="16" fill="${INK}">MPP · ${fmt(best[0])} V · ${fmt(best[1])} W</text>`;
  body += `<text x="${p.sx(12)}" y="${p.sy(95)}" font-size="14" fill="${INK2}" text-anchor="middle">— P–V (pen)  ·  - - I–V (×16 A)</text>`;
  // buck converter schematic
  body += `<g transform="translate(1020,240)" stroke="${INK}" stroke-width="2" fill="none">
    <path d="M0 40H80M120 40H200M200 40V140M200 40H320M360 40H440V200M0 40V200H440M200 140L180 170H220L200 200"/>
    <rect x="80" y="20" width="40" height="40"/><text x="100" y="12" font-size="12" fill="${INK}" text-anchor="middle" stroke="none">Q1</text>
    <path d="M320 40 m0 0 c0 -20 40 -20 40 0 M320 40 c0 20 40 20 40 0" />
    <text x="340" y="14" font-size="12" fill="${INK}" text-anchor="middle" stroke="none">L1 · 47 µH</text>
    <text x="230" y="180" font-size="12" fill="${INK}" text-anchor="start" stroke="none">D1</text>
    <line x1="440" y1="100" x2="480" y2="100"/><line x1="440" y1="120" x2="480" y2="120"/>
    <text x="500" y="116" font-size="12" fill="${INK}" stroke="none">C2</text>
    <text x="-10" y="120" font-size="12" fill="${INK}" text-anchor="end" stroke="none">PV IN</text>
    <text x="220" y="260" font-size="16" fill="${INK}" text-anchor="middle" stroke="none">SYNCHRONOUS BUCK · 100 kHz · P&amp;O MPPT</text>
    <text x="220" y="288" font-size="16" fill="${INK}" text-anchor="middle" stroke="none">TRACKING EFFICIENCY 98.4 % (bench, example)</text>
  </g>`;
  writeFileSync(join(OUT, "solar-mppt-charger.svg"), frame("SOLAR MPPT BATTERY CHARGER", "Panel P–V curve, tracked maximum power point, and converter topology (example figure)", body));
}

/* 5. Portrait placeholder: not a face, an instruction card (portrait orientation, large type) */
{
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 960" width="800" height="960" font-family="'B612 Mono', 'Courier New', monospace">
<rect width="800" height="960" fill="${PAPER}"/>
<defs><pattern id="g" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="${GRID}" stroke-width="1"/></pattern></defs>
<rect x="40" y="40" width="720" height="880" fill="url(#g)" stroke="${INK}" stroke-width="2"/>
<g transform="translate(400,420)" text-anchor="middle" fill="${INK}">
  <rect x="-250" y="-250" width="500" height="500" rx="12" fill="none" stroke="${INK}" stroke-width="3" stroke-dasharray="16 12"/>
  <circle cx="0" cy="-80" r="70" fill="none" stroke="${INK}" stroke-width="3"/>
  <path d="M-140 150c0-90 60-130 140-130s140 40 140 130" fill="none" stroke="${INK}" stroke-width="3"/>
  <text y="215" font-size="36" font-weight="700">PORTRAIT</text>
</g>
<text x="400" y="770" font-size="28" fill="${INK2}" text-anchor="middle">Not uploaded yet</text>
<text x="400" y="812" font-size="22" fill="${INK2}" text-anchor="middle">Admin panel → Site settings → Portrait</text>
<text x="400" y="885" font-size="20" fill="${PEN}" text-anchor="middle">EXAMPLE PRINT</text>
</svg>`;
  writeFileSync(join(OUT, "portrait.svg"), svg);
}

/* 6. Example video facade: a 16:9 print in the figure palette, used until the owner pastes a real link */
{
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900" font-family="'B612 Mono', 'Courier New', monospace">
<rect width="1600" height="900" fill="${PAPER}"/>
<defs><pattern id="g" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="${GRID}" stroke-width="1"/></pattern></defs>
<rect x="60" y="60" width="1480" height="780" fill="url(#g)" stroke="${INK}" stroke-width="2"/>
<g stroke="${INK2}" stroke-width="2" fill="none">
  <path d="M60 300H1540M60 600H1540M400 60V840M800 60V840M1200 60V840"/>
</g>
<text x="80" y="100" font-size="26" fill="${INK}" font-weight="700">EXAMPLE VIDEO</text>
<text x="80" y="130" font-size="18" fill="${INK2}">Flight test / bench run / demo — your YouTube link goes here</text>
<g transform="translate(800,450)" text-anchor="middle">
  <circle r="120" fill="none" stroke="${INK}" stroke-width="3"/>
  <path d="M-30 -60L70 0L-30 60Z" fill="${PEN}"/>
</g>
<text x="800" y="700" font-size="20" fill="${INK2}" text-anchor="middle">Admin panel → Projects → Photos &amp; video → YouTube video</text>
<text x="1520" y="816" font-size="16" fill="${INK2}" text-anchor="end">FIG. — EXAMPLE PRINT · REPLACE WITH YOUR OWN VIDEO IN THE ADMIN PANEL</text>
</svg>`;
  writeFileSync(join(OUT, "video.svg"), svg);
}

console.log("figures written to", OUT);
