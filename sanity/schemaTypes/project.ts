import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * A project card: a YouTube video (or a cover photo), a title, a short summary,
 * tags and links. Cards appear on the home page (featured) and on /projects.
 */
export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      description: "Two or three sentences under the video: what it is, what you did, what came of it.",
      validation: (r) => r.required().max(400),
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube video",
      type: "url",
      description: "Paste the normal watch link (https://www.youtube.com/watch?v=... or https://youtu.be/...). Shown with a play button; visitors watch it right on the page.",
    }),
    defineField({
      name: "cover",
      title: "Cover photo",
      type: "image",
      description: "Shown only when there is no video. Landscape photos work best.",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Description for screen readers", type: "string" }),
        defineField({ name: "caption", title: "Caption", type: "string" }),
      ],
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      description: "When the project was finished (or its main milestone). Newest first.",
    }),
    defineField({
      name: "featured",
      title: "Show on home page",
      type: "boolean",
      description: "Up to three featured projects appear on the home page; the rest are on the Projects page.",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Manual order",
      type: "number",
      description: "Optional. Lower numbers appear first. Leave empty to sort by date.",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      description: 'Short keywords, e.g. "STM32", "Control systems". Press Enter after each.',
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      description: "Optional: GitHub repository, report PDF, competition page.",
      of: [
        defineArrayMember({
          type: "object",
          name: "link",
          fields: [
            defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
            defineField({ name: "url", title: "URL", type: "url", validation: (r) => r.required() }),
          ],
        }),
      ],
    }),
    defineField({
      name: "isExample",
      title: "Example content",
      type: "boolean",
      description: "Ticked on the sample projects that came with the site. Untick once you have replaced the content, or delete the project.",
      initialValue: false,
    }),
  ],
  orderings: [
    { title: "Date, newest first", name: "dateDesc", by: [{ field: "date", direction: "desc" }] },
    { title: "Manual order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "summary", media: "cover", featured: "featured", isExample: "isExample" },
    prepare: ({ title, subtitle, media, featured, isExample }) => ({
      title: `${featured ? "★ " : ""}${title}${isExample ? " (example)" : ""}`,
      subtitle,
      media,
    }),
  },
});
