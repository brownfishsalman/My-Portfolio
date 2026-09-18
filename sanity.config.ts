"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";
import { apiVersion, dataset, projectId } from "./lib/sanity/env";

export default defineConfig({
  name: "portfolio",
  title: "Salman Saadiq — Portfolio",
  basePath: "/studio",
  projectId: projectId || "placeholder",
  dataset,
  schema: { types: schemaTypes },
  plugins: [structureTool({ structure })],
  document: {
    // Site settings is a singleton: no "create new" and no delete from the menu.
    actions: (prev, ctx) =>
      ctx.schemaType === "siteSettings" ? prev.filter((a) => !["unpublish", "delete", "duplicate"].includes(a.action ?? "")) : prev,
    newDocumentOptions: (prev) => prev.filter((t) => t.templateId !== "siteSettings"),
  },
  api: { apiVersion },
});
