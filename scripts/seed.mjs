// Loads the example content into your Sanity project so you can edit or delete it
// from the admin panel. Safe to run more than once: it only creates documents that
// do not exist yet.
//
//   npm run seed
//
// Needs, in .env.local:  NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET,
// and SANITY_API_WRITE_TOKEN (Sanity manage → API → Tokens → Editor).
import { createClient } from "@sanity/client";
import { createReadStream } from "node:fs";
import { basename, join } from "node:path";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in .env.local");
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: "2026-09-01", useCdn: false });

// The example content lives in lib/placeholders.ts; Node 24 runs TypeScript files directly.
const { placeholderSettings, placeholderProjects, placeholderSkills, placeholderExperience } = await import(
  "../lib/placeholders.ts"
);

const uploaded = new Map();
async function uploadFigure(url) {
  if (uploaded.has(url)) return uploaded.get(url);
  const file = join(process.cwd(), "public", url);
  const asset = await client.assets.upload("image", createReadStream(file), {
    filename: basename(file),
    contentType: "image/svg+xml",
  });
  uploaded.set(url, asset._id);
  console.log("  uploaded", basename(file));
  return asset._id;
}

const imageRef = async (pic) =>
  pic
    ? {
        _type: "image",
        asset: { _type: "reference", _ref: await uploadFigure(pic.url) },
        alt: pic.alt,
        caption: pic.caption,
      }
    : undefined;

let key = 0;
const withKeys = (arr) => arr?.map((x) => ({ _key: `s${(key++).toString(36)}`, ...x }));

console.log("Seeding example content into", projectId, "/", dataset);

// 1. Site settings (singleton with a fixed id)
{
  const s = placeholderSettings;
  const cv = await client.assets.upload("file", createReadStream(join(process.cwd(), "public", "cv-example.pdf")), {
    filename: "cv-example.pdf",
    contentType: "application/pdf",
  });
  await client.createIfNotExists({
    _id: "siteSettings",
    _type: "siteSettings",
    name: s.name,
    tagline: s.tagline,
    degree: s.degree,
    university: s.university,
    yearLabel: s.yearLabel,
    location: s.location,
    bio: s.bio,
    portrait: await imageRef(s.portrait),
    contactNote: s.contactNote,
    email: s.email,
    github: s.github,
    linkedin: s.linkedin,
    cv: { _type: "file", asset: { _type: "reference", _ref: cv._id } },
    footerNote: s.footerNote,
  });
  console.log("  site settings");
}

// 2. Projects
for (const [i, p] of placeholderProjects.entries()) {
  await client.createIfNotExists({
    _id: `project-example-${p.slug}`,
    _type: "project",
    title: p.title,
    slug: { _type: "slug", current: p.slug },
    summary: p.summary,
    date: p.date,
    featured: p.featured,
    order: i + 1,
    tags: p.tags,
    isExample: true,
    cover: await imageRef(p.cover),
    youtubeUrl: p.youtubeUrl,
    links: withKeys(p.links.map((l) => ({ _type: "link", ...l }))),
  });
  console.log("  project:", p.title);
}

// 3. Skill groups
for (const [i, g] of placeholderSkills.entries()) {
  await client.createIfNotExists({
    _id: `skillGroup-example-${i + 1}`,
    _type: "skillGroup",
    title: g.title,
    skills: g.skills,
    order: i + 1,
  });
  console.log("  skills:", g.title);
}

// 4. Experience
for (const [i, e] of placeholderExperience.entries()) {
  await client.createIfNotExists({
    _id: `experience-example-${i + 1}`,
    _type: "experience",
    title: e.title,
    organization: e.organization,
    kind: e.kind,
    start: e.start,
    end: e.end,
    current: e.current,
    location: e.location,
    description: e.description,
    order: i + 1,
    isExample: true,
  });
  console.log("  experience:", e.title);
}

console.log("Done. Open /studio to edit; the site shows the content within a minute.");
