import type { StructureResolver } from "sanity/structure";

// Studio sidebar: settings as a single document, then the lists.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      S.documentTypeListItem("project").title("Projects"),
      S.documentTypeListItem("publication").title("Research publications"),
      S.documentTypeListItem("skillGroup").title("Skills"),
      S.documentTypeListItem("experience").title("Experience & education"),
    ]);
