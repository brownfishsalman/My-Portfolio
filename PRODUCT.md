# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: Next.js (App Router) + Tailwind CSS, content managed in Sanity (Studio embedded at `/studio`), deployed on Vercel from a GitHub repo. The user has never built a website; the stack was recommended and accepted because Vercel hosts Next.js with zero configuration and Sanity gives a form-based admin panel for text, images, and YouTube links.

## Users

- **Primary:** professors, research supervisors, and postgraduate admissions reviewers evaluating Salman Saadiq for research positions, supervision, or postgraduate study. They read deeper than a recruiter: they want to see how a problem was framed, analysed, and carried through to a working result, and they will open reports and code.
- **Secondary (confirmed lower weight):** industry recruiters for internships and graduate roles.
- **Owner:** Salman Saadiq, undergraduate in Electrical & Electronics Engineering with a passion for aeronautical engineering. Edits all content himself through the admin panel; no coding after handover.

## Product Purpose

A personal e-portfolio that lets an academic reader judge Salman's ability to take an engineering problem from analysis to a built, working result. Success: a visitor reads one or more projects in depth, then downloads the CV.

## Positioning

"Analyse, then build." The site's claim is the pairing of electrical/electronics rigor with aeronautical ambition: theory, simulation, and control work that ends in hardware that runs or flies. Neither a pure code portfolio nor a pure maker gallery; each project is expected to show its analysis (models, calculations, simulations) and its physical outcome (photos, video).

## Operating Context

- Visitors arrive from a link on a CV, an email, LinkedIn, or an application form; often on a laptop at a desk, sometimes on a phone.
- Content is created by the owner in Sanity Studio: project write-ups (rich text), image galleries, YouTube video links, external links (GitHub, reports), skills grouped by category, experience/education entries, certificates, contact links, and a CV PDF.
- Content changes publish within about a minute without a redeploy.

## Capabilities and Constraints

Sections confirmed: Home; Projects as cards (YouTube video with a play button, or a cover photo, plus a short summary, tags and links; no individual project pages, decided by the owner on 2026-09-18); About + Skills; Experience + Education (including certificates/awards); Contact with links only (email, LinkedIn, GitHub) and a CV download. No contact form. No blog.

Every piece of visible text is editable from the admin panel, including the name, tagline, bio, and contact links. Default tagline (editable): "Electrical & Electronics Engineering student with a passion for aeronautics."

Constraints: free `*.vercel.app` address for now; custom domain later. Free tiers of Vercel and Sanity. Owner is a first-time site builder, so setup steps must be minimal and the admin panel must be self-explanatory.

Undecided / to collect from the owner: university name and degree title, year of study, real project names, profile URLs (GitHub, LinkedIn, email). Placeholder content is used until supplied and must be clearly replaceable.

## Brand Commitments

- Name: Salman Saadiq.
- Look pinned by the owner: dark, technical, engineering/aerospace character, with one accent colour.
- Motion pinned by the owner: content animates as the visitor scrolls (scroll-driven reveals and movement), in the manner of contemporary motion-led portfolio sites. Must respect reduced-motion preferences.

## Evidence on Hand

The owner has real material and will upload it through the admin panel after handover: a CV/resume PDF, photos and YouTube videos of projects, GitHub repositories and written reports, and certificates/awards. None of these files are in the repository yet. Do not fabricate testimonials, grades, publications, employer names, or awards; placeholder projects must be labelled as examples for the owner to replace.

## Product Principles

1. Depth over dazzle: an academic reader must be able to follow the analysis behind each project, not just see the result.
2. Analysis and build always appear together; a project is incomplete if it shows only one.
3. Projects lead, the CV closes: the visitor path ends at the CV download.
4. Everything the visitor reads is owner-editable; nothing meaningful is hard-coded.
5. Motion serves reading: scroll animation reveals structure and pace, never hides content or slows comprehension.

## Accessibility & Inclusion

Respect `prefers-reduced-motion` (all scroll animation degrades to static). Keyboard-navigable, sufficient contrast on the dark theme, alt text editable per image in the admin panel.
