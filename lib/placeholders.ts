// Example content shown until the site is connected to Sanity, and seeded into
// Sanity by `npm run seed` so the owner can edit or delete it from the admin panel.
// Everything here is illustrative and is stamped EXAMPLE on the page.
import type { PortableTextBlock } from "@portabletext/types";
import type { Experience, Picture, Project, SiteSettings, SkillGroup } from "./types";

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
    role: "Sole designer: control design, electronics, firmware, flight test",
    youtubeUrl: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
    gallery: [
      fig("uav-flight-controller.svg", "Flight controller figure", "Loop response and board layout"),
      fig("airfoil-pressure-rig.svg", "Airframe section figure", "Wing section used for the trim calculations"),
    ],
    links: [
      { label: "Firmware on GitHub", url: "https://github.com/your-handle/uav-flight-controller" },
      { label: "Design report (PDF)", url: "https://example.com/report.pdf" },
    ],
    analysis: [
      block(
        "The airframe's short-period pitch dynamics were identified from a doublet test and fitted to a second-order model (ωn ≈ 6 rad/s, ζ ≈ 0.55). A PID loop on pitch rate was tuned in Simulink to give an overshoot under 15 % with a peak time of about 0.6 s, leaving margin for the servo bandwidth.",
      ),
      ...bullets([
        "Sensor fusion: complementary filter on a 6-axis IMU at 250 Hz.",
        "Controller: PID on pitch rate, outer proportional loop on pitch angle.",
        "Model check: simulated step response compared against the logged flight response.",
      ]),
    ],
    build: [
      block(
        "The controller board is a four-layer 60 × 60 mm PCB carrying an STM32F4, IMU, barometer, GNSS receiver and eight servo outputs, designed in KiCad. Firmware is bare-metal C with a fixed-rate scheduler so the loop timing is deterministic.",
      ),
    ],
    test: [
      block(
        "Bench tests on a pitch gimbal confirmed the loop response, then three flights on the trainer airframe logged the real step response. The measured overshoot was 17 %, slightly above the model, traced to servo slew-rate limiting at large deflections.",
      ),
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
    role: "Electronics and firmware",
    gallery: [fig("brushless-esc.svg", "ESC figure", "Back-EMF and commutation")],
    links: [{ label: "Schematics and firmware", url: "https://github.com/your-handle/esc" }],
    analysis: [
      block(
        "The motor was modelled as a trapezoidal back-EMF machine. Commutation timing was derived from the Hall-sensor states, and the MOSFET switching losses were estimated for a 20 kHz PWM to size the heatsinking.",
      ),
    ],
    build: [
      block(
        "A two-layer board with a three-phase MOSFET bridge, gate drivers, current-sense shunt and a small microcontroller. The firmware runs six-step commutation with a current limit.",
      ),
    ],
    test: [
      block(
        "On a bench dyno the controller reached 8 000 rpm with 6.1 % torque ripple and 91 % efficiency at 120 W. Ripple at low speed was higher than modelled, which motivated a later sinusoidal-drive revision.",
      ),
    ],
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
    role: "Rig design, electronics, data analysis",
    gallery: [fig("airfoil-pressure-rig.svg", "Airfoil rig figure", "Section and Cp")],
    links: [{ label: "Lab report (PDF)", url: "https://example.com/airfoil-report.pdf" }],
    analysis: [
      block(
        "Thin-airfoil theory gave the expected upper-surface pressure distribution for angles of attack up to 8°. Tap positions were chosen to resolve the suction peak near the leading edge.",
      ),
    ],
    build: [
      block(
        "The section was 3D-printed in PLA with embedded tubing to the taps, sanded to a smooth finish, and connected to a bank of differential pressure sensors read by a 16-bit ADC.",
      ),
    ],
    test: [
      block(
        "Measured Cp matched the theory within 10 % away from the leading edge; the suction peak was lower than predicted, consistent with the tunnel's low Reynolds number.",
      ),
    ],
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
    gallery: [],
    links: [],
    analysis: [
      block(
        "The panel was modelled with the single-diode equation to find the maximum power point across irradiance levels, which set the converter's operating range.",
      ),
    ],
    build: [
      block("A 100 kHz synchronous buck converter with a microcontroller running perturb-and-observe tracking."),
    ],
    test: [block("Tracking efficiency of 98.4 % was measured on the bench with a programmable source emulating the panel.")],
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
