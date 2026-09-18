// Single place the pages read content from.
// Before Sanity is connected, every function returns the example content;
// after, it reads Sanity and returns exactly what the owner has published.
import { client } from "./sanity/client";
import { isSanityConfigured } from "./sanity/env";
import {
  experienceQuery,
  featuredProjectsQuery,
  projectBySlugQuery,
  projectSlugsQuery,
  projectsQuery,
  settingsQuery,
  skillsQuery,
} from "./sanity/queries";
import {
  placeholderExperience,
  placeholderProjects,
  placeholderSettings,
  placeholderSkills,
} from "./placeholders";
import type { Experience, Picture, Project, ProjectSummary, SiteSettings, SkillGroup } from "./types";

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

type RawProject = RawSummary & {
  role: string | null;
  youtubeUrl: string | null;
  analysis: unknown;
  build: unknown;
  test: unknown;
  gallery: RawPicture[] | null;
  links: ({ label: string | null; url: string | null } | null)[] | null;
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

type RawSummary = {
  slug: string | null;
  title: string | null;
  summary: string | null;
  date: string | null;
  featured: boolean;
  tags: string[];
  isExample: boolean;
  cover: RawPicture;
};

function summary(p: RawSummary): ProjectSummary {
  return {
    slug: p.slug ?? "",
    title: p.title ?? "Untitled project",
    summary: p.summary ?? "",
    date: p.date ?? undefined,
    featured: p.featured,
    tags: p.tags,
    isExample: p.isExample,
    cover: pic(p.cover),
  };
}

export async function getProjects(): Promise<ProjectSummary[]> {
  if (usingPlaceholders) return placeholderProjects;
  const rows = await client.fetch<RawSummary[]>(projectsQuery);
  return rows.map(summary);
}

export async function getFeaturedProjects(): Promise<ProjectSummary[]> {
  if (usingPlaceholders) return placeholderProjects.filter((p) => p.featured).slice(0, 3);
  const rows = await client.fetch<RawSummary[]>(featuredProjectsQuery);
  return rows.map(summary);
}

export async function getProjectSlugs(): Promise<string[]> {
  if (usingPlaceholders) return placeholderProjects.map((p) => p.slug);
  const slugs = await client.fetch<unknown[]>(projectSlugsQuery);
  return slugs.filter((s): s is string => typeof s === "string");
}

export async function getProject(slug: string): Promise<Project | null> {
  if (usingPlaceholders) return placeholderProjects.find((p) => p.slug === slug) ?? null;
  const p = await client.fetch<RawProject | null>(projectBySlugQuery, { slug });
  if (!p) return null;
  return {
    ...summary(p),
    role: p.role ?? undefined,
    youtubeUrl: p.youtubeUrl ?? undefined,
    gallery: (p.gallery ?? []).map(pic).filter((x): x is Picture => Boolean(x)),
    links: (p.links ?? [])
      .filter((l): l is { label: string; url: string } => Boolean(l?.label && l?.url))
      .map((l) => ({ label: l.label, url: l.url })),
    analysis: (p.analysis as Project["analysis"]) ?? undefined,
    build: (p.build as Project["build"]) ?? undefined,
    test: (p.test as Project["test"]) ?? undefined,
  };
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
