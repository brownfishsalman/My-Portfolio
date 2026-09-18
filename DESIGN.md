---
name: Salman Saadiq — Record of work
description: A pen strip-chart recorder: charcoal chart paper, warm-white ink, one vermilion pen, and a carriage that stamps the work as the roll advances.
colors:
  paper: "#111417"
  paper-deep: "#0b0d10"
  grid-minor: "#1c2126"
  grid-major: "#262c33"
  hole: "#07090b"
  hole-rim: "#232930"
  ink: "#e6e8eb"
  ink-muted: "#8b9096"
  ink-faint: "#4a5058"
  pen: "#ff5a3c"
  pen-deep: "#c8402a"
  print-paper: "#dfe3e8"
  figure-ink: "#1a1e24"
  figure-ink-muted: "#5b626b"
  figure-pen: "#e8452c"
  figure-grid: "#c9cfd6"
typography:
  display:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(56px, 8.4vw, 96px)"
    fontWeight: 700
    lineHeight: 0.88
    letterSpacing: "0.01em"
  headline:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(40px, 6vw, 84px)"
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: "0.01em"
  title:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(28px, 3.2vw, 40px)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.04em"
  subtitle:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "26px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.02em"
  lede:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "clamp(20px, 1.6vw, 23px)"
    fontWeight: 400
    lineHeight: 1.375
    letterSpacing: "normal"
  body:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  body-small:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "15.5px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  action:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "17px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.12em"
  nav:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.14em"
  label:
    fontFamily: "B612 Mono, Courier New, monospace"
    fontSize: "10.5px"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.08em"
  data:
    fontFamily: "B612 Mono, Courier New, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.1em"
  margin-note:
    fontFamily: "B612 Mono, Courier New, monospace"
    fontSize: "9px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.12em"
rounded:
  none: "0"
  stamp: "3px"
  action: "4px"
  name-stamp: "6px"
  hole: "50%"
spacing:
  cell: "12px"
  major: "60px"
  timing: "120px"
  margin: "56px"
  margin-mobile: "20px"
  band-gap: "40px"
  band-gap-mobile: "16px"
  bezel: "48px"
  bezel-mobile: "44px"
  section: "128px"
  section-mobile: "96px"
  block: "48px"
  print-gap: "80px"
components:
  action-pen:
    backgroundColor: "transparent"
    textColor: "{colors.pen}"
    typography: "{typography.action}"
    rounded: "{rounded.action}"
    padding: "12px 18px 11px"
  action-pen-hover:
    backgroundColor: "{colors.pen}"
    textColor: "{colors.paper-deep}"
  action-ink:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.action}"
    rounded: "{rounded.action}"
    padding: "12px 18px 11px"
  action-ink-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper-deep}"
  action-muted:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
    typography: "{typography.action}"
    rounded: "{rounded.action}"
    padding: "12px 18px 11px"
  stamp:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
    typography: "{typography.label}"
    rounded: "{rounded.stamp}"
    padding: "4px 8px"
  stamp-pen:
    backgroundColor: "transparent"
    textColor: "{colors.pen}"
    typography: "{typography.label}"
    rounded: "{rounded.stamp}"
    padding: "4px 8px"
  stamp-example:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
    typography: "{typography.label}"
    rounded: "{rounded.stamp}"
    padding: "4px 8px"
  name-stamp:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.display}"
    rounded: "{rounded.name-stamp}"
    padding: "0.12em 0.22em 0.08em"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
    typography: "{typography.nav}"
    rounded: "{rounded.none}"
    padding: "6px 10px"
  nav-link-hover:
    textColor: "{colors.ink}"
  nav-cv:
    backgroundColor: "transparent"
    textColor: "{colors.pen}"
    typography: "{typography.nav}"
    rounded: "{rounded.none}"
    padding: "6px 10px"
  nav-cv-hover:
    backgroundColor: "{colors.pen}"
    textColor: "{colors.paper-deep}"
  bezel:
    backgroundColor: "{colors.paper-deep}"
    textColor: "{colors.ink}"
    typography: "{typography.data}"
    height: "{spacing.bezel}"
  print-frame:
    backgroundColor: "{colors.print-paper}"
    rounded: "{rounded.none}"
    padding: "6px"
  meta-label:
    textColor: "{colors.ink-muted}"
    typography: "{typography.label}"
  empty-state:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
    typography: "{typography.body-small}"
    rounded: "{rounded.action}"
    padding: "22px 24px"
  video-play:
    backgroundColor: "{colors.paper-deep}"
    textColor: "{colors.pen}"
    typography: "{typography.action}"
    rounded: "{rounded.action}"
    padding: "12px 20px"
  video-play-hover:
    backgroundColor: "{colors.pen}"
    textColor: "{colors.paper-deep}"
---

# Design System: Salman Saadiq — Record of work

## Overview

**Creative North Star: "The Strip Chart"**

The whole site is one instrument: a pen strip-chart recorder, and the page is the roll of chart paper advancing under the reader's scroll. Everything visible is either the paper (charcoal, a fine 12px grid with a heavier line every 60px, sprocket perforations and timing marks in both margins), the ink laid on it (warm-white stamps, titles, and body copy; muted ink for secondary; one vermilion pen for the live trace, event ticks, and primary actions), or a print pasted onto it (photos, figures, and video stills on light print paper with taped corners and a lifted shadow). A fixed carriage at 72% of the viewport height stamps each block to full ink as the paper passes under it; three pens in a channel band on the right draw the visit itself (scroll rate, current section, progress). The recorder's housing is a 48px bezel fixed at the top that carries the navigation.

The world is dark, technical, and dense in the way an instrument printout is dense: hairlines rather than panels, a mono data face for anything measured or labelled, condensed uppercase display for anything stamped. Colour is rationed to one pen and appears only at edges, nibs, ticks, and actions. Depth is physical, not atmospheric: only the pasted prints cast shadows; the paper, stamps, and rules are flat. Solid strokes only: no blur, no glow, no gradient text, no faked ink texture. Motion has one clock, scroll position; nothing animates on its own timer, and with reduced motion the roll is fully static and fully inked.

Confirmed rejections from the world's own contract: no centred greeting, no glass cards fading up, no glow or halo effects, no gradient text.

**Key Characteristics:**
- Chart paper as the ground: 12px minor / 60px major grid, perforated margins, timing marks every 120px.
- One pen. Vermilion is reserved for the CH1 trace, carriage, event ticks, link colour, and the primary action; everything else is white or muted ink.
- Three typefaces with strict jobs: Barlow Condensed stamps titles, Barlow reads as body, B612 Mono measures and labels.
- Prints are the only lifted surface: light print paper, 6px border, taped corners, a two-layer drop shadow.
- The carriage stamp reveal (0.38 ink to full, scale 1.03 to 1, 320ms) is the single motion device; ink never lifts.
- Section headings are event annotations: a pen tick across the margin, a vertical margin label, the title, then a hairline rule.

## Colors

A charcoal paper stack, a three-step warm-white ink ramp, and one vermilion pen; the only light surfaces are the prints.

### Primary
- **Vermilion Pen** (`pen`): the single accent. CH1 scroll-rate trace (1.6px stroke), the carriage band line and left/right ticks, the event tick before every section heading, the REC lamp, the primary action outline, prose links and list markers, blockquote rule, focus ring, selection background, and caret. On a screen it should read as a few strokes, never as a fill area.
- **Vermilion Deep** (`pen-deep`): the border of the CV link in the bezel at rest; the pen at rest before it is pressed.

### Neutral
- **Chart Paper** (`paper`): the roll itself; background of every page.
- **Housing** (`paper-deep`): the recorder body behind the paper: `html`/`body` background, the bezel, the video well, scrollbar track, tear-line holes, and the text colour on any pen- or ink-filled hover.
- **Grid Minor** (`grid-minor`): the 12px chart grid.
- **Grid Major** (`grid-major`): the 60px chart grid and every structural hairline (legend rule, lane dividers, bezel bottom, log rows, skills table rows, contact rows, inline code border, nav hover border).
- **Perforation Hole / Hole Rim** (`hole`, `hole-rim`): the sprocket holes punched every 36px along both margins; used nowhere else.
- **Ink** (`ink`): primary text, stamped titles, the name stamp border, CH2 trace and nib, the ink action outline, legend values.
- **Ink Muted** (`ink-muted`): secondary text, all mono labels and stamps, CH3 trace and nib, print summaries, log organisations, nav links at rest, captions, empty-state copy.
- **Ink Faint** (`ink-faint`): tertiary: timing marks and their numerals, the tear line, the empty-state dashed border, the skills separator dot, scrollbar thumb.
- **Print Paper** (`print-paper`): the light stock every print sits on (frame padding and image background). Also the background of every authored example figure.
- **Figure Ink / Figure Ink Muted / Figure Pen / Figure Grid** (`figure-ink`, `figure-ink-muted`, `figure-pen`, `figure-grid`): the print-side palette for authored figures (the SVGs generated by `scripts/gen-figures.mjs`): dark ink on print paper, a darker vermilion for the plotted trace, and a light grid. New authored figures use these, not the screen palette.

### Named Rules
**The One Pen Rule.** There is one accent and it is a pen, not a fill. Vermilion appears as strokes (traces, ticks, outlines, underlines, the REC dot) and as a filled surface only on hover of a pen action. Never tint a background, a card, or a heading with it.

**The Ink Ramp Rule.** Text hierarchy is carried by three inks (ink, ink-muted, ink-faint) on one paper. There are no tinted panels; a surface is either paper, housing, or print paper.

**The Print-Side Palette Rule.** Anything drawn on print paper (figures, stills) uses the figure palette (dark ink, darker vermilion, light grid). Screen ink colours never appear on a print.

### Daylight paper (light mode)

The same recorder under the lamp. Every token above has a daylight value set on `:root[data-theme="light"]` in `app/globals.css`; no component knows which paper it is on. The lamp switch in the bezel (`components/recorder/Lamp.tsx`) toggles `data-theme` and remembers the choice in `localStorage`; before a choice exists the system preference decides, applied before first paint by the `beforeInteractive` script in `app/layout.tsx`.

| Token | Night (default) | Daylight |
|---|---|---|
| `paper` | `#111417` | `#f4f1ea` warm ivory |
| `paper-deep` | `#0b0d10` | `#e9e5db` |
| `grid-minor` / `grid-major` | `#1c2126` / `#262c33` | `#e6e2d8` / `#d7d2c5` |
| `hole` / `hole-rim` | `#07090b` / `#232930` | `#d4cec0` / `#c2bbab` |
| `ink` / `ink-muted` / `ink-faint` | `#e6e8eb` / `#8b9096` / `#4a5058` | `#1e1c18` / `#6b665d` / `#b1ab9e` |
| `pen` / `pen-deep` | `#ff5a3c` / `#c8402a` | `#c93a1b` / `#9e2d14` (deeper, for 4.5:1 on ivory) |
| `print-paper` | `#dfe3e8` | `#fcfbf8` |
| `print-shadow` / `print-shadow-lift` | black at .25/.55 | warm umber at .14/.22 |

**The Same Pen Rule.** Daylight changes the paper and the ink, never the grammar: the pen is still the only accent, prints are still the only lifted surface, and the figure palette on prints is unchanged. A new token needs a value for both papers before it ships.

## Typography

**Display Font:** Barlow Condensed (with Arial Narrow, sans-serif), weights 500/600/700 loaded; 600 and 700 used.
**Body Font:** Barlow (with system-ui, sans-serif), weights 400/500/600 plus italic.
**Label/Mono Font:** B612 Mono (with Courier New, monospace), weights 400/700 loaded; 400 used.

**Character:** A stamped, silkscreened instrument voice. Condensed uppercase caps stamp titles hard onto the paper with tight leading; a humanist grotesk reads comfortably at 17px; a cockpit mono with tabular numerals handles every measured or labelled thing. The mono face is never used for body copy.

### Hierarchy
- **Display** (700, `clamp(56px, 8.4vw, 96px)`, 0.88, uppercase, 0.01em): the name stamp only. Two lines, tilted -1.6deg inside a 3px ink border with a 6px radius. The 96px cap is the craft-floor display ceiling.
- **Headline** (700, `clamp(40px, 6vw, 84px)`, 0.92, uppercase, `text-wrap: balance`): project titles and the not-found title; the `.display` utility.
- **Title** (600, `clamp(28px, 3.2vw, 40px)`, 1, uppercase, 0.04em): every section heading, always drawn as a rule heading (see Components). The CV tear-off title uses the same voice at 34/40px.
- **Subtitle** (600, 26px, 1, uppercase, 0.02em): print captions and prose `h3`. The lead print scales to `clamp(30px, 3.4vw, 44px)`; log-row titles use 24px; prose `h4` and the Skills heading use 20–22px.
- **Lede** (400, 20px mobile / 23px desktop, 1.375): the tagline and contact note, max 44ch. Project summaries use 19/22px in muted ink at 58ch.
- **Body** (400, 17px, 1.55): all reading copy at a 68ch measure (`.measure`, `.prose`). Paragraph rhythm is 1em.
- **Body Small** (400, 15.5px): print summaries (60ch), log descriptions (62ch), meta values (15px), empty states, the skills table (16px).
- **Action** (600, 17px, 1, uppercase, 0.12em): action button labels and the video PLAY stamp.
- **Nav** (600, 14px, uppercase, 0.14em; 12.5px / 0.05em on mobile): bezel navigation links.
- **Label** (400, 10.5px, 1.2, uppercase, 0.08em, tabular numerals): stamps, meta table keys, print meta rows, skills table row headers, contact link keys, legend cells (0.06em), the footer.
- **Data** (400, 11px, uppercase, 0.1em): bezel name and REC, rule-heading counts (0.08em), log dates (0.06em), figure captions (0.06em).
- **Margin Note** (400, 9px, uppercase, 0.12em): timing-mark numerals (0.02em), the vertical event label beside each rule heading, and the CH2 step labels written inside the channel band (0.08em).

### Named Rules
**The Three Voices Rule.** Barlow Condensed stamps, Barlow reads, B612 Mono measures. If it is a title it is condensed uppercase; if it is a sentence it is Barlow at 17px; if it is a label, a value, a date, or a count it is mono uppercase and small. No fourth face, no display face for sentences, no mono for paragraphs.

**The Stamped Caps Rule.** Every display or title setting is uppercase with line-height between 0.88 and 1 and letter-spacing between 0.01em and 0.04em. Caps are never loosely tracked at display sizes; tracking widens only as the size falls (0.08em at 10.5px, 0.12em at 9px and on actions).

## Layout

The page is one `.paper` container (`container-type: inline-size`) that fills the viewport width and runs the full document height. Its background is the chart grid: minor lines every 12px (`--cell`), major lines every 60px (5 cells), anchored at 0 0. The paper is padded on both sides by the margin (56px desktop, 20px under 768px). Each margin carries sprocket perforations (holes on a 36px pitch) and, on the left, timing marks: a hairline every 120px with a numeral in 9px mono and a short 8px tick at 60px; numerals are hidden on mobile.

Between the margins is the field: a content column plus a channel band on the right. The band is 34% of the paper's container width (`--band: 34cqw`; 40px on mobile) separated from content by a 40px gutter (16px on mobile). The band is divided into three hairline lanes (CH1 / CH2 / CH3); on mobile only CH1 remains and the two extra lanes and nibs are hidden. Content sits in the column (`padding-right: band + gap`); a `.bleed-band` block cancels that padding so a lead print or a project cover can paste across the band. The lead print on the home page is `100% - 42%` of the band wide on desktop; the project cover is the only full-bleed print on a project page.

The bezel is fixed at the top (48px desktop, 44px mobile) and the paper starts below it (`padding-top: var(--bezel)`); anchored sections get `scroll-margin-top: bezel + 24px`. A legend row (mono uppercase cells with right-hand hairlines, and lane labels over the band) prints at the top of every roll; on mobile only the first two cells and the CH1 label survive.

The carriage is fixed at 72% of the viewport height (`--carriage: 72`, mirrored as `CARRIAGE = 0.72` in the client components): a dashed pen-tinted line across the content column (`pen` at 28%), a solid pen line across the band (80%), 14px solid ticks at both paper edges, and three nibs over the lanes.

Vertical rhythm is section-led: sections start 128px below the previous (96px on mobile; the first projects section uses 120px), headings are followed by 40–48px of space before content, prints are spaced 80px apart in the featured stack and 48px in two-column grids, and each project page phase starts 112px (80px mobile) below the last. Two-column desktop layouts are `minmax(0,1fr) 240px` (bio + portrait), `1fr 1fr` (contact + CV), and `140px minmax(0,1fr) max-content` (log rows); all collapse to a single column under 768px. The one breakpoint is 768px.

## Elevation & Depth

Depth is physical and limited to the prints. The paper, the bezel, stamps, actions, tables, and rules are all flat: structure is drawn with 1px hairlines in `grid-major`, and hierarchy is carried by the ink ramp. A print is a sheet of light paper pasted onto the dark roll, so it alone casts a shadow, and two semi-transparent tape strips (ink at 18% with a 12% edge, 72x22px, rotated -38deg) hold its top-left and bottom-right corners. The bezel is above the paper only by being fixed and by its bottom hairline; it has no shadow. There are no glows, no blur, and no backdrop filters anywhere.

### Shadow Vocabulary
- **Print at rest** (`box-shadow: 0 2px 2px rgba(0,0,0,0.25), 2px 10px 28px rgba(0,0,0,0.55)`): every `.print-frame`, including video prints and the portrait.
- **Print lifted** (`box-shadow: 0 3px 3px rgba(0,0,0,0.25), 4px 16px 36px rgba(0,0,0,0.6)` with `translateY(-3px) rotate(-0.4deg)`): hover on a linked print only; 260ms `--ease-out`.

### Named Rules
**The Paper Casts No Shadow Rule.** Only a pasted print may have a box-shadow. Buttons, stamps, the bezel, tables, empty states, and headings are flat ink on paper. If a new element needs to feel lifted, make it a print.

**The Carriage Rule.** The only reveal is the stamp: content below the carriage waits at 0.38 opacity and 1.03 scale, and snaps to full ink and 1.0 scale over 320ms `cubic-bezier(0.16, 1, 0.3, 1)` when its top crosses the carriage. Ink never lifts. Content is visible by default without JavaScript, and with `prefers-reduced-motion` nothing is faint and nothing transitions.

## Shapes

The form language is stamped rectangles and hairlines. Corners are essentially square: 0 on prints, the bezel, rules, and tables; 3px on small stamps and inline code; 4px on actions, the empty state, and the PLAY stamp; 6px on the large name stamp, whose thicker 3px border reads as a rubber stamp. The only circles are the sprocket holes, the REC lamp (8px), and the two 14px punch-outs at the ends of the tear line.

Borders do the work of containers. Stamps and actions are `currentColor` outlines (1px for stamps, 1.5px for actions) so they take the ink they are printed in; a dashed outline (`border-style: dashed`) marks anything provisional: EXAMPLE stamps, the disabled action, the empty state, the CV tear-off box. The tear line at the end of the record is a 2px dashed `ink-faint` rule that runs the full paper width. Hover on an outlined element fills it with its own ink and flips the text to `paper-deep`.

Rotation is a stamp device, used sparingly and only on physical things: the name stamp (-1.6deg), tape strips (-38deg), and a hovered print (-0.4deg). The pen nibs are 12x14px filled triangles. Icons are 16px (actions) or 18px (contact links) stroked line icons from lucide, never glyph fonts.

## Components

### Buttons (Actions)
Stamped outline buttons; the fill only appears when pressed.
- **Shape:** near-square (4px radius), 1.5px `currentColor` border, no background at rest.
- **Pen action** (`action pen`): vermilion text and outline, padding 12px 18px 11px, Barlow Condensed 600 17px uppercase 0.12em, 10px gap to a 16px line icon. The primary action on any roll (Read the record, Download CV at the tear-off, Back to the record, Play).
- **Ink action** (`action`): same shape in `ink`; the secondary action (Download CV in the header, All N projects).
- **Hover / Focus:** background fills with the element's own ink and text flips to `paper-deep`, 160ms `--ease-out`; `:active` scales to 0.98; focus is the global 2px pen outline offset 3px.
- **Muted** (`action muted`): `ink-muted` with a dashed border and `cursor: not-allowed`; a placeholder for an action that is not yet available (CV not uploaded). Hover does nothing.

### Stamps (Chips)
Small mono labels printed inside a hairline.
- **Style:** inline-flex, 4px 8px padding, 1px `currentColor` border, 3px radius, B612 Mono 10.5px uppercase 0.08em, `ink-muted`, nowrap.
- **Variants:** `stamp pen` prints in vermilion; `stamp example` keeps muted ink with a dashed border and marks placeholder content (Example, Example video, Example · edit in Site settings). Also used as a back-link (All projects) with a 12px icon.

### Prints (Cards)
A photo, figure, or video still pasted on the roll.
- **Corner Style:** square.
- **Background:** `print-paper` with 6px padding around the image; the image itself is also backed with `print-paper`.
- **Shadow Strategy:** the print shadow pair from Elevation; lift on hover only when the print is a link.
- **Border:** none; the paper edge is the border. Tape strips at top-left and bottom-right.
- **Caption:** 14px below, a 6px-gapped stack: condensed uppercase title (26px; lead clamp to 44px), muted summary at 15.5px/60ch, then a mono meta row (date, up to four tags, an EXAMPLE stamp if placeholder). Hovering a linked print turns its title vermilion.
- **Video print:** the same frame around a 16:9 `paper-deep` well; the facade shows the video's own thumbnail (or an authored still for examples) at `grayscale(0.35) contrast(1.05)`, cleared on hover, under a centred PLAY stamp (pen outline on `paper-deep`, fills on hover). The player loads only on click.

### Meta table
Label / value rows for facts: a two-column grid (`max-content 1fr`, 8px x 20px gap), mono uppercase 10.5px `ink-muted` keys padded 5px down to sit on the 15px Barlow values' baseline. Placeholder values are muted italic.

### Navigation (Bezel)
- **Style:** fixed 48px housing in `paper-deep` with a `grid-major` bottom hairline, padded to the margin. Left: a vermilion REC lamp (8px dot) and the owner's name in 11px mono uppercase 0.1em; the surname is hidden on mobile. Right: Barlow Condensed 600 14px uppercase 0.14em links in `ink-muted`, 6px 10px padding, transparent 1px border.
- **Hover:** text to `ink`, border to `grid-major`, 160ms.
- **CV link** (`is-cv`): vermilion text with a `pen-deep` border, offset 6px; hover fills vermilion with `paper-deep` text.
- **Mobile:** 12.5px, 0.05em, tighter padding; no gaps.

### Rule heading (signature)
Every section title is an event annotation on the chart: a 1px vermilion tick extending back across the left margin, the title in Title type, an optional mono count (11px, 0.08em, muted), then a `grid-major` hairline filling the rest of the row. The event name (run · about, phase · build, end of record) is written vertically up the margin in 9px vermilion mono, ending at the tick; it is hidden on mobile, where the count wraps under the title. On the home roll, CH2 also writes the section name in the band when the pen reaches it.

### Name stamp (signature)
The owner's name over two lines as a tilted rubber stamp: Barlow Condensed 700 at the Display size, uppercase, 0.88 leading, inside a 3px `ink` border with 6px radius and 0.12em 0.22em 0.08em padding, rotated -1.6deg from its bottom-left corner. White ink, never vermilion. One per site.

### Log rows and calibration table
Experience entries are hairline-separated rows: 140px mono uppercase date column, title in 24px condensed caps with muted organisation and a 15.5px description at 62ch, and a kind stamp (plus EXAMPLE) on the right. Skills are a borderless table (`.cal`) with mono uppercase row headers at 220px and values joined by a faint middle dot. Both collapse to stacked blocks under 768px.

### Contact links
Full-width rows separated by `grid-major` hairlines, 16px vertical padding: an 18px muted line icon, a 90px mono key, then the value in 17px `ink`; the whole row and icon turn vermilion on hover.

### Empty states
A dashed `ink-faint` box (4px radius, 22px 24px padding) with 15.5px muted copy at 60ch; bolded admin-panel paths in `ink` at weight 500. Used wherever Sanity has no content yet.

### Channel band (signature)
An absolutely positioned SVG over the band lanes, redrawn on scroll. CH1 (vermilion, 1.6px) plots smoothed scroll rate as a decaying curve across its lane; CH2 (`ink`, 1.25px) steps across its lane once per section and writes the section label (9px mono, muted) at the step; CH3 (`ink-muted`, 1.25px) is a straight progress ramp. Paper is sampled every 6px; traces are drawn only up to the carriage's document position and persist. On mobile only CH1 draws.

## Do's and Don'ts

### Do:
- **Do** put every new page on a `Paper` with a `Bezel`, a `Legend`, and rule headings for its sections so the carriage, band, and margins keep working.
- **Do** reserve vermilion for strokes: the CH1 trace, event ticks, focus rings, links, and the one primary action per roll. Cite the One Pen Rule.
- **Do** frame every image, figure, and video as a print: `print-paper` frame, 6px padding, tape strips, the print shadow pair.
- **Do** set labels, dates, counts, and captions in B612 Mono at 9–11px uppercase with 0.06–0.12em tracking; set sentences in Barlow at 17px on a 68ch measure.
- **Do** mark placeholder content with a dashed `stamp example` and keep it deletable from the admin panel.
- **Do** wrap below-the-fold blocks in `Recorded` so they stamp under the carriage, and keep them visible by default (no JS) and static under reduced motion.
- **Do** draw structure with 1px `grid-major` hairlines and 1px or 1.5px `currentColor` outlines; keep corners at 0–6px.
- **Do** draw authored figures with the print-side palette on `print-paper`.

### Don't:
- **Don't** tint any surface with vermilion, add a second accent, or use gradient text, glows, halos, blur, or backdrop filters; solid strokes only.
- **Don't** put a box-shadow on anything that is not a print (buttons, stamps, the bezel, tables, empty states, headings).
- **Don't** use Barlow Condensed for sentences or B612 Mono for paragraphs, and don't loosely track display caps (tracking above 0.04em at title size or above).
- **Don't** animate on a timer, on hover-in reveals, or on page load; scroll position is the only clock, and ink never lifts once stamped.
- **Don't** centre a greeting or stack glass cards; content sits left in the column with the band on the right, and prints paste over the band only as the lead or the cover.
- **Don't** apply an ink or grayscale filter to real photographs or figures; the only filtered image is the video facade thumbnail before hover.
- **Don't** exceed the 96px display cap or add a heading above the bezel; the name stamp is the only Display-size element.
