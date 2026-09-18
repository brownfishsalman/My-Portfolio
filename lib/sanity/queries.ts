import { defineQuery } from "next-sanity";

const picture = /* groq */ `{
  "url": asset->url,
  "width": coalesce(asset->metadata.dimensions.width, 1600),
  "height": coalesce(asset->metadata.dimensions.height, 1000),
  "alt": coalesce(alt, ""),
  caption
}`;

export const settingsQuery = defineQuery(`*[_type == "siteSettings"][0]{
  name, tagline, degree, university, yearLabel, location, bio, email, github, linkedin, footerNote, contactNote,
  "portrait": portrait${picture},
  "cvUrl": cv.asset->url
}`);

const projectSummary = /* groq */ `
  "slug": slug.current, title, summary, date, "featured": coalesce(featured, false),
  "tags": coalesce(tags, []), "isExample": coalesce(isExample, false),
  "cover": cover${picture}
`;

export const projectsQuery = defineQuery(`*[_type == "project" && defined(slug.current)]
  | order(coalesce(order, 999) asc, date desc){ ${projectSummary} }`);

export const featuredProjectsQuery = defineQuery(`*[_type == "project" && defined(slug.current) && featured == true]
  | order(coalesce(order, 999) asc, date desc)[0...3]{ ${projectSummary} }`);

export const projectBySlugQuery = defineQuery(`*[_type == "project" && slug.current == $slug][0]{
  ${projectSummary},
  role, youtubeUrl, analysis, build, test,
  "gallery": coalesce(gallery[]${picture}, []),
  "links": coalesce(links[]{label, url}, [])
}`);

export const projectSlugsQuery = defineQuery(`*[_type == "project" && defined(slug.current)].slug.current`);

export const skillsQuery = defineQuery(`*[_type == "skillGroup"] | order(coalesce(order, 999) asc, _createdAt asc){
  title, "skills": coalesce(skills, [])
}`);

export const experienceQuery = defineQuery(`*[_type == "experience"] | order(coalesce(order, 999) asc, coalesce(start, "0000") desc){
  title, organization, kind, start, end, "current": coalesce(current, false), location, description, url,
  "isExample": coalesce(isExample, false)
}`);
