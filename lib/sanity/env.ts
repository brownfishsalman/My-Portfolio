export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = "2026-09-01";

/** True once the owner has created a Sanity project and set the env vars. */
export const isSanityConfigured = projectId.length > 0;
