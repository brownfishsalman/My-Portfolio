"use client";

import { useEffect, useRef } from "react";

/**
 * The three pens. Draws the visitor's own scroll onto the roll:
 *   CH1 scroll rate (px/ms), CH2 section index, CH3 progress along the roll.
 * The pens sit at a fixed carriage (72 % of the viewport); paper below the
 * carriage is unrecorded, and ink is permanent once laid.
 */
const STEP = 6; // px of paper per sample
const CARRIAGE = 0.72;

export type RollSection = { id: string; label: string };

type Props = {
  /** The sections on this roll, in order. Drives CH2 and its step labels. */
  sections: RollSection[];
};

export function ChannelBand({ sections }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const ch1 = useRef<SVGPathElement>(null);
  const ch2 = useRef<SVGPathElement>(null);
  const ch3 = useRef<SVGPathElement>(null);
  const labels = useRef<SVGGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const band = svg?.parentElement;
    if (!svg || !band) return;

    let width = 0;
    let height = 0;
    let bandTop = 0;
    let lanes = 3;
    let sectionTops: number[] = [];
    let samples = new Float32Array(0); // -1 = unrecorded
    let lastY = window.scrollY;
    let lastT = performance.now();
    let smoothed = 0; // light smoothing so wheel ticks read as a pen, not a comb
    let raf = 0;

    const measure = () => {
      const rect = band.getBoundingClientRect();
      width = rect.width;
      height = band.offsetHeight;
      bandTop = rect.top + window.scrollY;
      lanes = window.matchMedia("(max-width: 767px)").matches ? 1 : 3;
      svg.setAttribute("viewBox", `0 0 ${Math.max(1, width)} ${Math.max(1, height)}`);
      svg.style.height = `${height}px`;
      sectionTops = sections.map(({ id }) => {
        const el = document.getElementById(id);
        return el ? el.getBoundingClientRect().top + window.scrollY : Number.POSITIVE_INFINITY;
      });
      // CH2 step labels: the pen writes the section name beside each step once it gets there.
      const g = labels.current;
      if (g) {
        const laneW = width / lanes;
        const span = Math.max(4, laneW - 12);
        const texts = Array.from(g.querySelectorAll('text'));
        sections.forEach((sec, i) => {
          const t = texts[i];
          if (!t) return;
          const top = sectionTops[i] - bandTop;
          const x = laneW + 6 + (span * (i + 1)) / Math.max(1, sections.length) + 5;
          t.setAttribute('x', x.toFixed(1));
          t.setAttribute('y', (top + 14).toFixed(1));
          t.style.display = lanes === 3 && Number.isFinite(top) ? '' : 'none';
        });
      }
      const n = Math.ceil(height / STEP) + 1;
      if (n !== samples.length) {
        const next = new Float32Array(n).fill(-1);
        next.set(samples.subarray(0, Math.min(n, samples.length)));
        samples = next;
      }
    };

    const carriage = () => window.scrollY + window.innerHeight * CARRIAGE - bandTop;

    const draw = () => {
      const maxStep = Math.min(samples.length - 1, Math.floor(carriage() / STEP));
      if (maxStep < 0) return;
      const laneW = width / lanes;
      const inset = 6;
      const span = Math.max(4, laneW - inset * 2);
      const a1: string[] = [];
      const a2: string[] = [];
      const a3: string[] = [];
      let sectionIdx = 0;
      for (let i = 0; i <= maxStep; i++) {
        const y = i * STEP;
        const docY = bandTop + y;
        while (sectionIdx < sectionTops.length && sectionTops[sectionIdx] <= docY) sectionIdx++;
        const v = Math.max(0, samples[i]);
        const cmd = i === 0 ? "M" : "L";
        const x1 = inset + span * (1 - Math.exp(-v / 2.5));
        a1.push(`${cmd}${x1.toFixed(1)} ${y}`);
        if (lanes === 3) {
          const x2 = laneW + inset + (span * sectionIdx) / Math.max(1, sectionTops.length);
          const x3 = laneW * 2 + inset + (span * y) / Math.max(1, height);
          a2.push(`${cmd}${x2.toFixed(1)} ${y}`);
          a3.push(`${cmd}${x3.toFixed(1)} ${y}`);
        }
      }
      const reached = maxStep * STEP;
      labels.current?.querySelectorAll('text').forEach((t, i) => {
        t.setAttribute('opacity', sectionTops[i] - bandTop <= reached ? '1' : '0');
      });
      ch1.current?.setAttribute("d", a1.join(""));
      ch2.current?.setAttribute("d", lanes === 3 ? a2.join("") : "");
      ch3.current?.setAttribute("d", lanes === 3 ? a3.join("") : "");
    };

    const record = () => {
      raf = 0;
      const now = performance.now();
      const y = window.scrollY;
      const dt = Math.max(1, now - lastT);
      const raw = Math.abs(y - lastY) / dt;
      smoothed = smoothed * 0.55 + raw * 0.45;
      const v = smoothed;
      lastY = y;
      lastT = now;
      const maxStep = Math.min(samples.length - 1, Math.floor(carriage() / STEP));
      // Newly reached steps get a pen pulse shaped over the range they were skipped through.
      let a = -1;
      for (let i = 0; i <= maxStep; i++) {
        if (samples[i] < 0) {
          if (a < 0) a = i;
        }
      }
      if (a >= 0) {
        const len = maxStep - a + 1;
        for (let i = a; i <= maxStep; i++) {
          if (samples[i] < 0) {
            const t = (i - a + 1) / (len + 1);
            samples[i] = v * (len > 3 ? Math.sin(Math.PI * t) : 1);
          }
        }
      }
      draw();
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(record);
    };

    measure();
    record();

    const ro = new ResizeObserver(() => {
      measure();
      schedule();
    });
    ro.observe(band);
    ro.observe(document.body);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [sections]);

  return (
    <svg
      ref={svgRef}
      className="absolute inset-x-0 top-0 block w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{ pointerEvents: "none" }}
    >
      <path ref={ch3} fill="none" stroke="var(--ink-muted)" strokeWidth="1.25" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      <path ref={ch2} fill="none" stroke="var(--ink)" strokeWidth="1.25" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      <path ref={ch1} fill="none" stroke="var(--pen)" strokeWidth="1.6" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      <g ref={labels} fill="var(--ink-muted)" fontFamily="var(--font-b612-mono), monospace" fontSize="9" letterSpacing="0.08em">
        {sections.map((sec) => (
          <text key={sec.id} opacity="0" style={{ textTransform: "uppercase" }}>
            {sec.label.toUpperCase()}
          </text>
        ))}
      </g>
    </svg>
  );
}
