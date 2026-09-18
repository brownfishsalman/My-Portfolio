---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: ["app/projects/[slug]/page.tsx","app/projects/page.tsx"]
---

# Surface brief: home roll (`app/page.tsx`) and project rolls (`app/projects/[slug]/page.tsx`)

## Scope and mode

Experience. The whole public site is one visual world: a pen strip-chart recorder. The home route is one continuous roll of chart paper carrying every section (featured projects, about + skills, experience + education, contact + CV). Each project page is its own roll. `/projects` is the index of prints. Sanity Studio at `/studio` keeps its own UI.

## Audience, job, action, proof, constraints

- Reader: a professor or admissions reviewer, at a desk, reading deeper than a recruiter; will open reports and code.
- Job: judge whether Salman takes a problem from analysis to a working build.
- Action: read projects, then download the CV. The CV sits at the end of the roll as the tear-off.
- Proof: project write-ups structured as ANALYSIS → BUILD → TEST, each with figures, photos, and video. Until the owner uploads real material, every example item carries a visible EXAMPLE stamp and is deleted or edited from the admin panel.
- Constraints: owner-pinned dark, technical, one accent colour; scroll-driven motion; reduced-motion must degrade to a fully static, fully inked page; everything visible is editable in Sanity; free tiers; first-time site owner.

## Direction contract

THESIS: The page is a roll of chart paper advancing under scroll, and the recorder logs the visit itself: three pens at a fixed carriage trace the reader's scroll rate, current section, and progress, while the work sits on the paper as stamped annotations and pasted prints. It refuses the category arrangement: no centred greeting, no glass cards fading up, no glow.

OWN-WORLD: Charcoal chart paper (#111417) printed with a fine grid (minor #1c2126 every 12px, major #262c33 every 60px), sprocket perforations and timing marks in both margins, warm-white ink (#e6e8eb) for stamps and text, muted ink (#8b9096) for secondary, and one pen: vermilion (#ff5a3c) for CH1, the carriage, event ticks, and primary actions; CH2 and CH3 draw in white and muted ink. Type: Barlow Condensed (uppercase display, stamped titles), Barlow (body, 65–75ch), B612 Mono (timing marks, channel labels, stamps with values; never body copy). Prints are photos or figures with a paper border, a stamped caption, and a soft lifted shadow (2px 8px 20px). Solid strokes only: no blur, no halo, no gradient text, no faked ink texture. Video is a print like any figure: the video's own thumbnail under a vermilion PLAY stamp, player loads on click; the cover is the only full-bleed print on a project page. Focus rings, selection, caret, and scrollbar are inked from the palette.

STORY: The reader arrives on a live instrument that is already recording them, understands within one viewport that this is Salman's record of work in EEE and aeronautics, scrolls the roll reading each project as analysis then build then test, reaches the end of the record, and tears off the CV.

FIRST VIEWPORT (1440×900): A fixed 48px recorder bezel: name and REC lamp left, PROJECTS · ABOUT · EXPERIENCE · CONTACT · CV right, silkscreen caps. Below it the paper starts: a full-width printed chart legend row (record title, roll date, paper speed = scroll, channel legend). Left content column (≈58% of the field): SALMAN / SAADIQ as a tilted rubber stamp in warm-white ink (3px stamp border, Barlow Condensed 700 at clamp(56px, 8.4vw, 96px), the craft-floor display cap) over two lines, the editable tagline at 22px beneath, then a stamped meta block (degree, university, year; placeholders marked), then two actions: READ THE RECORD (vermilion stamped outline, scrolls to projects) and DOWNLOAD CV (white outline). Right channel band (≈36%): three labelled lanes CH1 SCROLL RATE, CH2 SECTION, CH3 PROGRESS, hairline-separated; a fixed carriage line at 72% of the viewport height with three pen nibs; the traces already begun above it. Margins 56px each side: perforation holes and timing marks every 120px with mm labels. Every section heading is an event annotation: a vermilion tick across the left margin with the event name written vertically along the margin (RUN · FEATURED PROJECTS, RUN · ABOUT, …); the first one sits at the bottom edge of the 1440×900 viewport. CH2 writes each section name beside its step once the pen reaches it. Mobile 390: margins 28px, channel band folds to a 44px lane on the right edge with CH1 only, name at ~64px, actions stacked.

FORM: Strip Chart, the pick card (my top-ranked grounded candidate, #1 of 7; the roll assigned #6 Instrument Panel and the user chose the pick). Seed key 1678a709. Signature interaction: the carriage. Content below the carriage is visible but faint (0.38 ink); when its top crosses the carriage it is stamped (scale 1.03→1, ink to full, 320ms exponential ease-out) and stays inked. The traces are drawn only up to the carriage's document position and persist as ink; scrolling back reveals what was drawn. Motion grammar: one clock, scroll position; nothing runs on its own timer. Kept from the declined hand: one dominant field per viewport on phones; colour only at edges, needles, and actions; one full-bleed print per project as the decisive beat; gutters pace the roll.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Memorable moment

Scrolling fast and watching CH1 spike under your own hand; then the CV tear-off at the end of the record.

## Unresolved

University, degree title, year, real project names, and profile links: owner supplies later through Sanity; placeholders are stamped EXAMPLE.
