import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { urlFor } from "@/lib/sanity/client";
import { YouTube } from "./YouTube";

type SanityImageValue = {
  asset?: { _ref?: string; _id?: string; url?: string };
  alt?: string;
  caption?: string;
};

const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: SanityImageValue }) => {
      if (!value?.asset) return null;
      const src = urlFor(value).width(1600).url();
      return (
        <figure>
          <div className="print-frame">
            {/* Sanity CDN image: dimensions unknown here, so a plain img keeps layout honest */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={value.alt ?? ""} loading="lazy" />
          </div>
          {value.caption ? <figcaption>{value.caption}</figcaption> : null}
        </figure>
      );
    },
    youtube: ({ value }: { value: { url?: string } }) => (value?.url ? <YouTube url={value.url} /> : null),
  },
  marks: {
    link: ({ children, value }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
};

export function RichText({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="prose">
      <PortableText value={value} components={components} />
    </div>
  );
}
