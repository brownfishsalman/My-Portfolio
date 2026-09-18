import { defineField, defineType } from "sanity";

export const skillGroup = defineType({
  name: "skillGroup",
  title: "Skill group",
  type: "document",
  description: "A category of skills, e.g. Electronics & embedded, shown as one row in the About section.",
  fields: [
    defineField({
      name: "title",
      title: "Category",
      type: "string",
      description: 'e.g. "Electronics & embedded", "Analysis & simulation", "Aeronautics".',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "skills",
      title: "Skills",
      type: "array",
      description: "Press Enter after each skill.",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers appear first.",
    }),
  ],
  preview: {
    select: { title: "title", skills: "skills" },
    prepare: ({ title, skills }) => ({ title, subtitle: (skills ?? []).join(" · ") }),
  },
});
