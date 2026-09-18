import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";
import { isSanityConfigured } from "@/lib/sanity/env";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

/** The admin panel. Lives inside the site at /studio. */
export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main className="studio-host flex items-center justify-center p-8">
        <div style={{ maxWidth: 560, fontFamily: "system-ui, sans-serif", lineHeight: 1.5 }}>
          <h1 style={{ fontSize: 24, fontWeight: 600 }}>The admin panel is not connected yet</h1>
          <p style={{ marginTop: 12 }}>
            This site needs a Sanity project ID before the admin panel can open. Follow the steps in <code>README.md</code> under
            &quot;Step 2: connect the admin panel&quot;, then restart the site.
          </p>
        </div>
      </main>
    );
  }
  return <NextStudio config={config} />;
}
