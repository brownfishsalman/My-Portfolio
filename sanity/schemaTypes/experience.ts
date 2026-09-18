import { defineField, defineType } from "sanity";

export const experience = defineType({
  name: "experience",
  title: "Experience & education",
  type: "document",
  description: "One entry per degree, job, internship, society role, certificate or award.",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: 'e.g. "BEng Electrical & Electronics Engineering", "Engineering Intern", "Avionics Lead".',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "organization",
      title: "Organisation",
      type: "string",
      description: "University, company, society or course provider.",
    }),
    defineField({
      name: "kind",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Education", value: "education" },
          { title: "Work / internship", value: "work" },
          { title: "Role (society, team, volunteering)", value: "role" },
          { title: "Certificate", value: "certificate" },
          { title: "Award", value: "award" },
        ],
        layout: "radio",
      },
      initialValue: "work",
      validation: (r) => r.required(),
    }),
    defineField({ name: "start", title: "Start date", type: "date" }),
    defineField({
      name: "end",
      title: "End date",
      type: "date",
      description: 'Leave empty and tick "Ongoing" if it is still current.',
      hidden: ({ document }) => Boolean(document?.current),
    }),
    defineField({ name: "current", title: "Ongoing", type: "boolean", initialValue: false }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "One to three sentences: what you did and what came of it.",
    }),
    defineField({
      name: "url",
      title: "Link",
      type: "url",
      description: "Optional: certificate, organisation page, or award announcement.",
    }),
    defineField({
      name: "order",
      title: "Manual order",
      type: "number",
      description: "Optional. Lower numbers appear first. Leave empty to sort by start date.",
    }),
    defineField({
      name: "isExample",
      title: "Example content",
      type: "boolean",
      description: "Ticked on the sample entries that came with the site. Untick once replaced, or delete the entry.",
      initialValue: false,
    }),
  ],
  orderings: [{ title: "Start date, newest first", name: "startDesc", by: [{ field: "start", direction: "desc" }] }],
  preview: {
    select: { title: "title", organization: "organization", kind: "kind", isExample: "isExample" },
    prepare: ({ title, organization, kind, isExample }) => ({
      title: `${title}${isExample ? " (example)" : ""}`,
      subtitle: [kind, organization].filter(Boolean).join(" · "),
    }),
  },
});
