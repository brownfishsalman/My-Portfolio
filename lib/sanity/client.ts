import { createClient } from "next-sanity";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { apiVersion, dataset, projectId } from "./env";

export const client = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: false, // pages revalidate every 60 s; fresh reads keep edits visible quickly
  perspective: "published",
});

const builder = createImageUrlBuilder({ projectId: projectId || "placeholder", dataset });

export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto("format");
}
