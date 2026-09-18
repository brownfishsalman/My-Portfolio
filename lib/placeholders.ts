// Example content shown until the site is connected to Sanity, and seeded into
// Sanity by `npm run seed` so the owner can edit or delete it from the admin panel.
// Everything here is illustrative and is stamped EXAMPLE on the page.
import type { PortableTextBlock } from "@portabletext/types";
import type { Experience, Picture, Project, Publication, SiteSettings, SkillGroup } from "./types";

let keyCounter = 0;
const key = () => `k${(keyCounter++).toString(36)}`;

/** Build a Portable Text paragraph (or heading) from plain text. */
export function block(text: string, style: "normal" | "h3" | "h4" = "normal"): PortableTextBlock {
  return {
    _type: "block",
    _key: key(),
    style,
    markDefs: [],
    children: [{ _type: "span", _key: key(), text, marks: [] }],
  };
}

export function bullets(items: string[]): PortableTextBlock[] {
  return items.map((text) => ({
    _type: "block",
    _key: key(),
    style: "normal",
    listItem: "bullet",
    level: 1,
    markDefs: [],
    children: [{ _type: "span", _key: key(), text, marks: [] }],
  }));
}

const fig = (file: string, alt: string, caption?: string): Picture => ({
  url: `/placeholders/${file}`,
  alt,
  caption,
  width: 1600,
  height: 1000,
  local: true,
});

export const placeholderSettings: SiteSettings = {
  name: "Salman Saadiq",
  tagline: "Electrical & Electronics Engineering student with a passion for aeronautics.",
  degree: "BEng Electrical & Electronics Engineering",
  university: "Your University",
  yearLabel: "Year 3",
  location: "City, Country",
  bio: [
    block(
      "I am an undergraduate in Electrical & Electronics Engineering who keeps ending up around aircraft. What I enjoy most is the full arc of a problem: writing the equations down, checking them in simulation, and then building the thing and finding out where the model was wrong.",
    ),
    block(
      "My work sits where electronics meets flight: flight controllers, motor drives, sensor rigs for aerodynamics experiments, and the power electronics that keep all of it running. This site is my record of that work, project by project, from analysis to build to test.",
    ),
    block("Replace this text in the admin panel: Site settings → Bio."),
  ],
  bioPlain:
    "Undergraduate in Electrical & Electronics Engineering with a passion for aeronautics; flight controllers, motor drives, aerodynamics rigs and power electronics.",
  portrait: { url: "/placeholders/portrait.svg", alt: "Portrait placeholder", width: 800, height: 960, local: true },
  email: "you@example.com",
  github: "https://github.com/your-handle",
  linkedin: "https://www.linkedin.com/in/your-handle",
  cvUrl: "/cv-example.pdf",
  footerNote: "Record of work",
  contactNote: "If this record is relevant to your research group, lab, or programme, I would like to hear from you.",
};

export const placeholderProjects: Project[] = [
  {
    slug: "fixed-wing-uav-flight-controller",
    title: "Fixed-Wing UAV Flight Controller",
    summary:
      "A custom STM32 autopilot board with a PID attitude loop, designed in Simulink, built as a four-layer PCB and flown on a 1.6 m trainer airframe.",
    date: "2026-04-01",
    featured: true,
    tags: ["STM32", "Control systems", "PCB design", "Flight test"],
    cover: fig(
      "uav-flight-controller.svg",
      "Pitch step response of the flight controller loop with the controller board layout",
      "Simulated pitch step response beside the controller board layout",
    ),
    isExample: true,
    youtubeUrl: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
    links: [
      { label: "Firmware on GitHub", url: "https://github.com/your-handle/uav-flight-controller" },
      { label: "Design report (PDF)", url: "https://example.com/report.pdf" },
    ],
  },
  {
    slug: "brushless-motor-esc-from-scratch",
    title: "Brushless Motor ESC from Scratch",
    summary:
      "A six-step electronic speed controller: back-EMF modelling, a 12 V / 20 A MOSFET bridge on a custom board, and dyno measurements of ripple and efficiency.",
    date: "2025-11-01",
    featured: true,
    tags: ["Power electronics", "Motor control", "PCB design"],
    cover: fig(
      "brushless-esc.svg",
      "Three-phase back-EMF waveforms with commutation windows",
      "Three-phase back-EMF and the six commutation windows",
    ),
    isExample: true,
    links: [{ label: "Schematics and firmware", url: "https://github.com/your-handle/esc" }],
  },
  {
    slug: "wind-tunnel-airfoil-pressure-rig",
    title: "Wind-Tunnel Airfoil Pressure Rig",
    summary:
      "An instrumented NACA 2412 section with eight pressure taps and a multi-channel ADC, compared against thin-airfoil theory in the department's open-return tunnel.",
    date: "2025-05-01",
    featured: true,
    tags: ["Aerodynamics", "Instrumentation", "Data acquisition"],
    cover: fig(
      "airfoil-pressure-rig.svg",
      "NACA 2412 section with pressure tap locations and measured Cp distribution",
      "Tap positions on the section and the measured Cp distribution at α = 4°",
    ),
    isExample: true,
    links: [{ label: "Lab report (PDF)", url: "https://example.com/airfoil-report.pdf" }],
  },
  {
    slug: "solar-mppt-battery-charger",
    title: "Solar MPPT Battery Charger",
    summary:
      "A synchronous buck converter with perturb-and-observe maximum-power-point tracking, designed from the panel's I–V model and verified on the bench.",
    date: "2024-11-01",
    featured: false,
    tags: ["Power electronics", "Embedded", "Renewables"],
    cover: fig(
      "solar-mppt-charger.svg",
      "Panel P-V curve with the tracked maximum power point and the buck converter schematic",
      "Panel P–V curve, tracked MPP, and the converter topology",
    ),
    isExample: true,
    links: [],
  },
];

export const placeholderPublications: Publication[] = [
  {
    title: "Low-Cost Pressure Instrumentation for Undergraduate Wind-Tunnel Airfoil Experiments",
    authors: "S. Saadiq, A. Example, B. Example",
    venue: "Example Student Conference on Aerospace Engineering",
    kind: "conference",
    status: "published",
    date: "2026-03-01",
    summary:
      "An eight-tap pressure rig built from hobby-grade sensors reproduces thin-airfoil Cp distributions within 10 % at Re ≈ 1.8 × 10⁵, at a tenth of the cost of a commercial scanner.",
    url: "https://doi.org/10.0000/example",
    isExample: true,
  },
];

export const placeholderSkills: SkillGroup[] = [
  { title: "Electronics & embedded", skills: ["STM32 / ARM Cortex-M", "C and C++", "KiCad PCB design", "Power electronics", "Sensor interfacing"] },
  { title: "Analysis & simulation", skills: ["MATLAB / Simulink", "Python (NumPy, SciPy)", "LTspice", "XFOIL", "Control systems"] },
  { title: "Aeronautics", skills: ["Flight dynamics", "Aerodynamics", "UAV integration", "Propulsion basics"] },
  { title: "Tools & workshop", skills: ["Git", "SolidWorks / Fusion 360", "3D printing", "Oscilloscope and lab instruments", "Soldering and rework"] },
];

export const placeholderExperience: Experience[] = [
  {
    title: "BEng Electrical & Electronics Engineering",
    organization: "Your University",
    kind: "education",
    start: "2023-09-01",
    current: true,
    location: "City, Country",
    description: "Relevant modules: control systems, power electronics, embedded systems, signals and systems, fluid mechanics (elective).",
    isExample: true,
  },
  {
    title: "Engineering Intern",
    organization: "Example Aerospace Ltd",
    kind: "work",
    start: "2025-06-01",
    end: "2025-08-31",
    current: false,
    location: "City, Country",
    description: "Designed test fixtures for avionics harness validation and wrote the data-logging scripts used by the test team.",
    isExample: true,
  },
  {
    title: "Avionics Lead",
    organization: "University UAV Society",
    kind: "role",
    start: "2024-10-01",
    current: true,
    description: "Lead a team of five on the flight-controller and telemetry stack for the society's competition aircraft.",
    isExample: true,
  },
  {
    title: "Certificate in Aircraft Systems (example)",
    organization: "Online course provider",
    kind: "certificate",
    start: "2025-03-01",
    end: "2025-03-01",
    current: false,
    isExample: true,
  },
];
