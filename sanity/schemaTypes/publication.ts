import { defineField, defineType } from "sanity";

export const publication = defineType({
  name: "publication",
  title: "Research publication",
  type: "document",
  description: "A paper, preprint, thesis, poster or talk. Shown on the home page under Research publications.",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "The paper's title, exactly as published.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "authors",
      title: "Authors",
      type: "string",
      description: 'As they appear on the paper, e.g. "S. Saadiq, A. Rahman, M. Hossain". Put yourself in the right position.',
    }),
    defineField({
      name: "venue",
      title: "Venue",
      type: "string",
      description: 'Journal, conference or repository, e.g. "IEEE Access", "ICRA 2026", "arXiv".',
    }),
    defineField({
      name: "kind",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Journal article", value: "journal" },
          { title: "Conference paper", value: "conference" },
          { title: "Preprint", value: "preprint" },
          { title: "Thesis / dissertation", value: "thesis" },
          { title: "Poster / abstract", value: "poster" },
          { title: "Talk", value: "talk" },
        ],
        layout: "radio",
      },
      initialValue: "conference",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Published", value: "published" },
          { title: "Accepted", value: "accepted" },
          { title: "Under review", value: "review" },
          { title: "In preparation", value: "preparation" },
        ],
        layout: "radio",
      },
      initialValue: "published",
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      description: "Publication (or submission) date. Newest first.",
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      description: "One or two plain-language sentences: the question, the method, the finding.",
      validation: (r) => r.max(400),
    }),
    defineField({
      name: "url",
      title: "Link (DOI or page)",
      type: "url",
      description: "e.g. https://doi.org/10.1109/... or the arXiv page.",
    }),
    defineField({
      name: "pdf",
      title: "PDF",
      type: "file",
      description: "Optional: upload the paper if you are allowed to share it.",
      options: { accept: ".pdf,application/pdf" },
    }),
    defineField({
      name: "order",
      title: "Manual order",
      type: "number",
      description: "Optional. Lower numbers appear first. Leave empty to sort by date.",
    }),
    defineField({
      name: "isExample",
      title: "Example content",
      type: "boolean",
      description: "Ticked on sample entries. Untick once replaced, or delete the entry.",
      initialValue: false,
    }),
  ],
  orderings: [{ title: "Date, newest first", name: "dateDesc", by: [{ field: "date", direction: "desc" }] }],
  preview: {
    select: { title: "title", venue: "venue", date: "date", isExample: "isExample" },
    prepare: ({ title, venue, date, isExample }) => ({
      title: `${title}${isExample ? " (example)" : ""}`,
      subtitle: [venue, date?.slice(0, 4)].filter(Boolean).join(" · "),
    }),
  },
});
