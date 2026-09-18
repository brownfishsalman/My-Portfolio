import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  description: "Your name, tagline, bio, contact links and CV. There is only one of these.",
  groups: [
    { name: "identity", title: "Identity", default: true },
    { name: "about", title: "About" },
    { name: "contact", title: "Contact & CV" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      group: "identity",
      description: "Shown in the big stamp on the home page and in the top bar.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      group: "identity",
      description: "One sentence under your name. Keep it under ~90 characters.",
    }),
    defineField({
      name: "degree",
      title: "Degree",
      type: "string",
      group: "identity",
      description: 'e.g. "BEng Electrical & Electronics Engineering". Leave empty to hide.',
    }),
    defineField({
      name: "university",
      title: "University",
      type: "string",
      group: "identity",
      description: "Leave empty to hide.",
    }),
    defineField({
      name: "yearLabel",
      title: "Year of study",
      type: "string",
      group: "identity",
      description: 'e.g. "Year 3" or "Final year". Leave empty to hide.',
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      group: "identity",
      description: "City and country. Leave empty to hide.",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "array",
      group: "about",
      description: "Two or three short paragraphs about you. Shown in the About section.",
      of: [
        {
          type: "block",
          styles: [{ title: "Paragraph", value: "normal" }],
          lists: [{ title: "Bullet", value: "bullet" }],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
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
        },
      ],
    }),
    defineField({
      name: "portrait",
      title: "Portrait",
      type: "image",
      group: "about",
      description: "A photo of you. Square, at least 800 × 800 px, looks best.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Description for screen readers",
          type: "string",
          description: 'e.g. "Salman in the lab holding a flight controller board".',
        }),
      ],
    }),
    defineField({
      name: "contactNote",
      title: "Contact note",
      type: "text",
      rows: 2,
      group: "contact",
      description: "One or two sentences above your contact links, e.g. who you would like to hear from.",
    }),
    defineField({
      name: "email",
      title: "Email address",
      type: "string",
      group: "contact",
      description: "Shown as a mail link. Leave empty to hide.",
    }),
    defineField({
      name: "github",
      title: "GitHub URL",
      type: "url",
      group: "contact",
      description: "Full address, e.g. https://github.com/yourname. Leave empty to hide.",
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn URL",
      type: "url",
      group: "contact",
      description: "Full address, e.g. https://www.linkedin.com/in/yourname. Leave empty to hide.",
    }),
    defineField({
      name: "cv",
      title: "CV / résumé (PDF)",
      type: "file",
      group: "contact",
      description: "Upload your CV as a PDF. The Download CV buttons point here.",
      options: { accept: ".pdf,application/pdf" },
    }),
    defineField({
      name: "footerNote",
      title: "Footer note",
      type: "string",
      group: "contact",
      description: 'Short line at the very bottom, e.g. "Record of work". Optional.',
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "tagline" },
  },
});
