// Single place the pages read content from.
// Before Sanity is connected, every function returns the example content;
// after, it reads Sanity and returns exactly what the owner has published.
import { client } from "./sanity/client";
import { isSanityConfigured } from "./sanity/env";
import {
  experienceQuery,
  featuredProjectsQuery,
  projectsQuery,
  publicationsQuery,
  settingsQuery,
  skillsQuery,
} from "./sanity/queries";
import {
  placeholderExperience,
  placeholderProjects,
  placeholderPublications,
  placeholderSettings,
  placeholderSkills,
} from "./placeholders";
import type { Experience, Picture, Project, Publication, SiteSettings, SkillGroup } from "./types";

export const usingPlaceholders = !isSanityConfigured;

type RawSettings = {
  name: string | null;
  tagline: string | null;
  degree: string | null;
  university: string | null;
  yearLabel: string | null;
  location: string | null;
  bio: unknown;
  email: string | null;
  github: string | null;
  linkedin: string | null;
  footerNote: string | null;
  contactNote: string | null;
  portrait: RawPicture;
  cvUrl: string | null;
} | null;

type RawPublication = {
  title: string | null;
  authors: string | null;
  venue: string | null;
  kind: string | null;
  status: string | null;
  date: string | null;
  summary: string | null;
  url: string | null;
  pdfUrl: string | null;
  isExample: boolean;
};

type RawSkillGroup = { title: string | null; skills: string[] };

type RawExperience = {
  title: string | null;
  organization: string | null;
  kind: string | null;
  start: string | null;
  end: string | null;
  current: boolean;
  location: string | null;
  description: string | null;
  url: string | null;
  isExample: boolean;
};

type RawPicture = { url: string | null; width: number; height: number; alt: string; caption?: string | null } | null;

function pic(p: RawPicture): Picture | undefined {
  if (!p || !p.url) return undefined;
  return { url: p.url, width: p.width, height: p.height, alt: p.alt, caption: p.caption ?? undefined };
}

export async function getSettings(): Promise<SiteSettings> {
  if (usingPlaceholders) return placeholderSettings;
  const s = await client.fetch<RawSettings>(settingsQuery);
  if (!s) {
    return { name: "Salman Saadiq", tagline: "" };
  }
  return {
    name: s.name ?? "Salman Saadiq",
    tagline: s.tagline ?? "",
    degree: s.degree ?? undefined,
    university: s.university ?? undefined,
    yearLabel: s.yearLabel ?? undefined,
    location: s.location ?? undefined,
    bio: (s.bio as SiteSettings["bio"]) ?? undefined,
    portrait: pic(s.portrait),
    email: s.email ?? undefined,
    github: s.github ?? undefined,
    linkedin: s.linkedin ?? undefined,
    cvUrl: s.cvUrl ?? undefined,
    footerNote: s.footerNote ?? undefined,
    contactNote: s.contactNote ?? undefined,
  };
}

type RawProject = {
  slug: string | null;
  title: string | null;
  summary: string | null;
  date: string | null;
  featured: boolean;
  tags: string[];
  isExample: boolean;
  cover: RawPicture;
  youtubeUrl: string | null;
  links: ({ label: string | null; url: string | null } | null)[] | null;
};

function project(p: RawProject): Project {
  return {
    slug: p.slug ?? "",
    title: p.title ?? "Untitled project",
    summary: p.summary ?? "",
    date: p.date ?? undefined,
    featured: p.featured,
    tags: p.tags,
    isExample: p.isExample,
    cover: pic(p.cover),
    youtubeUrl: p.youtubeUrl ?? undefined,
    links: (p.links ?? [])
      .filter((l): l is { label: string; url: string } => Boolean(l?.label && l?.url))
      .map((l) => ({ label: l.label, url: l.url })),
  };
}

export async function getProjects(): Promise<Project[]> {
  if (usingPlaceholders) return placeholderProjects;
  const rows = await client.fetch<RawProject[]>(projectsQuery);
  return rows.map(project);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  if (usingPlaceholders) return placeholderProjects.filter((p) => p.featured).slice(0, 3);
  const rows = await client.fetch<RawProject[]>(featuredProjectsQuery);
  return rows.map(project);
}

export async function getPublications(): Promise<Publication[]> {
  if (usingPlaceholders) return placeholderPublications;
  const rows = await client.fetch<RawPublication[]>(publicationsQuery);
  return rows.map((r) => ({
    title: r.title ?? "",
    authors: r.authors ?? undefined,
    venue: r.venue ?? undefined,
    kind: (r.kind as Publication["kind"]) ?? "conference",
    status: (r.status as Publication["status"]) ?? "published",
    date: r.date ?? undefined,
    summary: r.summary ?? undefined,
    url: r.url ?? undefined,
    pdfUrl: r.pdfUrl ?? undefined,
    isExample: r.isExample,
  }));
}

export async function getSkills(): Promise<SkillGroup[]> {
  if (usingPlaceholders) return placeholderSkills;
  const rows = await client.fetch<RawSkillGroup[]>(skillsQuery);
  return rows.map((r) => ({ title: r.title ?? "", skills: r.skills }));
}

export async function getExperience(): Promise<Experience[]> {
  if (usingPlaceholders) return placeholderExperience;
  const rows = await client.fetch<RawExperience[]>(experienceQuery);
  return rows.map((r) => ({
    title: r.title ?? "",
    organization: r.organization ?? undefined,
    kind: (r.kind as Experience["kind"]) ?? "role",
    start: r.start ?? undefined,
    end: r.end ?? undefined,
    current: r.current,
    location: r.location ?? undefined,
    description: r.description ?? undefined,
    url: r.url ?? undefined,
    isExample: r.isExample,
  }));
}
