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

const projectFields = /* groq */ `
  "slug": coalesce(slug.current, _id), title, summary, date, "featured": coalesce(featured, false),
  "tags": coalesce(tags, []), "isExample": coalesce(isExample, false),
  "cover": cover${picture},
  youtubeUrl,
  "links": coalesce(links[]{label, url}, [])
`;

export const projectsQuery = defineQuery(`*[_type == "project"]
  | order(coalesce(order, 999) asc, date desc){ ${projectFields} }`);

export const featuredProjectsQuery = defineQuery(`*[_type == "project" && featured == true]
  | order(coalesce(order, 999) asc, date desc)[0...3]{ ${projectFields} }`);

export const publicationsQuery = defineQuery(`*[_type == "publication"] | order(coalesce(order, 999) asc, coalesce(date, "0000") desc){
  title, authors, venue, kind, status, date, summary, url,
  "pdfUrl": pdf.asset->url,
  "isExample": coalesce(isExample, false)
}`);

export const skillsQuery = defineQuery(`*[_type == "skillGroup"] | order(coalesce(order, 999) asc, _createdAt asc){
  title, "skills": coalesce(skills, [])
}`);

export const experienceQuery = defineQuery(`*[_type == "experience"] | order(coalesce(order, 999) asc, coalesce(start, "0000") desc){
  title, organization, kind, start, end, "current": coalesce(current, false), location, description, url,
  "isExample": coalesce(isExample, false)
}`);
