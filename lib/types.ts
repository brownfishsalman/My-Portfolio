import type { PortableTextBlock } from "@portabletext/types";

/** An image either stored in Sanity (asset reference) or shipped locally (url). */
export type Picture = {
  url: string; // resolved URL (Sanity CDN or /placeholders/...)
  alt: string;
  caption?: string;
  width: number;
  height: number;
  /** true when the url is a local static asset that next/image should not optimise */
  local?: boolean;
};

export type Link = { label: string; url: string };

export type SiteSettings = {
  name: string;
  tagline: string;
  degree?: string;
  university?: string;
  yearLabel?: string;
  location?: string;
  bio?: PortableTextBlock[];
  bioPlain?: string;
  portrait?: Picture;
  email?: string;
  github?: string;
  linkedin?: string;
  cvUrl?: string;
  footerNote?: string;
  contactNote?: string;
};

export type ProjectSummary = {
  slug: string;
  title: string;
  summary: string;
  date?: string;
  featured: boolean;
  tags: string[];
  cover?: Picture;
  isExample: boolean;
};

export type Project = ProjectSummary & {
  role?: string;
  youtubeUrl?: string;
  gallery: Picture[];
  links: Link[];
  analysis?: PortableTextBlock[];
  build?: PortableTextBlock[];
  test?: PortableTextBlock[];
};

export type SkillGroup = { title: string; skills: string[] };

export type ExperienceKind = "education" | "work" | "role" | "certificate" | "award";

export type Experience = {
  title: string;
  organization?: string;
  kind: ExperienceKind;
  start?: string;
  end?: string;
  current: boolean;
  location?: string;
  description?: string;
  url?: string;
  isExample: boolean;
};

export const KIND_LABEL: Record<ExperienceKind, string> = {
  education: "Education",
  work: "Work",
  role: "Role",
  certificate: "Certificate",
  award: "Award",
};
