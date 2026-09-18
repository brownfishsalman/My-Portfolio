import { defineArrayMember, defineField, defineType } from "sanity";

/** Rich text used for the three phases of a project write-up. */
const richText = (name: string, title: string, description: string) =>
  defineField({
    name,
    title,
    type: "array",
    group: "writeup",
    description,
    of: [
      defineArrayMember({
        type: "block",
        styles: [
          { title: "Paragraph", value: "normal" },
          { title: "Heading", value: "h3" },
          { title: "Small heading", value: "h4" },
          { title: "Quote", value: "blockquote" },
        ],
        lists: [
          { title: "Bullets", value: "bullet" },
          { title: "Numbered", value: "number" },
        ],
        marks: {
          decorators: [
            { title: "Bold", value: "strong" },
            { title: "Italic", value: "em" },
            { title: "Code", value: "code" },
          ],
          annotations: [
            {
              name: "link",
              type: "object",
              title: "Link",
              fields: [{ name: "href", type: "url", title: "URL" }],
            },
          ],
        },
      }),
      defineArrayMember({
        type: "image",
        title: "Figure or photo",
        options: { hotspot: true },
        fields: [
          defineField({ name: "alt", title: "Description for screen readers", type: "string" }),
          defineField({ name: "caption", title: "Caption", type: "string" }),
        ],
      }),
      defineArrayMember({
        type: "object",
        name: "youtube",
        title: "YouTube video",
        fields: [
          defineField({
            name: "url",
            title: "YouTube link",
            type: "url",
            description: "Paste the normal watch link, e.g. https://www.youtube.com/watch?v=...",
            validation: (r) => r.required(),
          }),
        ],
        preview: { select: { title: "url" }, prepare: ({ title }) => ({ title: `YouTube: ${title}` }) },
      }),
    ],
  });

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  groups: [
    { name: "basics", title: "Basics", default: true },
    { name: "media", title: "Photos & video" },
    { name: "writeup", title: "Write-up" },
    { name: "links", title: "Links" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "basics",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Web address",
      type: "slug",
      group: "basics",
      description: 'Click "Generate" after typing the title. Becomes /projects/your-title.',
      options: { source: "title", maxLength: 80 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      group: "basics",
      description: "One or two sentences shown on the project card. What it is and what you did.",
      validation: (r) => r.required().max(260),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      group: "basics",
      description: "When the project was finished (or its main milestone). Used for ordering.",
    }),
    defineField({
      name: "featured",
      title: "Show on home page",
      type: "boolean",
      group: "basics",
      description: "Up to three featured projects appear on the home page.",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Manual order",
      type: "number",
      group: "basics",
      description: "Optional. Lower numbers appear first. Leave empty to sort by date.",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      group: "basics",
      description: 'Short keywords, e.g. "STM32", "Control systems". Press Enter after each.',
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "role",
      title: "Your role",
      type: "string",
      group: "basics",
      description: 'e.g. "Sole designer" or "Electronics lead in a team of four".',
    }),
    defineField({
      name: "isExample",
      title: "Example content",
      type: "boolean",
      group: "basics",
      description: "Ticked on the sample projects that came with the site. Untick once you have replaced the content, or delete the project.",
      initialValue: false,
    }),
    defineField({
      name: "cover",
      title: "Cover photo or figure",
      type: "image",
      group: "media",
      description: "The main image on the card and at the top of the project page. Landscape, at least 1600 px wide.",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Description for screen readers", type: "string" }),
        defineField({ name: "caption", title: "Caption", type: "string" }),
      ],
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      group: "media",
      description: "More photos or figures. Shown as prints on the project page.",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Description for screen readers", type: "string" }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube video",
      type: "url",
      group: "media",
      description: "Paste the normal watch link. Shown in the Test section of the project page.",
    }),
    richText("analysis", "Analysis", "How you framed and modelled the problem: equations, simulations, design choices."),
    richText("build", "Build", "What you made: hardware, PCB, firmware, mechanical work."),
    richText("test", "Test", "How it performed: measurements, flights, what matched the model and what didn't."),
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      group: "links",
      description: "GitHub repository, report PDF, competition page, etc.",
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
