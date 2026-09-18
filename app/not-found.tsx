import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Bezel } from "@/components/recorder/Bezel";
import { Legend } from "@/components/recorder/Legend";
import { Paper } from "@/components/recorder/Paper";
import { getSettings } from "@/lib/content";

export default async function NotFound() {
  const settings = await getSettings();
  return (
    <>
      <Bezel name={settings.name} cvUrl={settings.cvUrl} />
      <Paper sections={[]}>
        <Legend />
        <section className="flex min-h-[70vh] flex-col justify-center py-16">
          <h1 className="display" style={{ fontSize: "clamp(40px, 6vw, 84px)" }}>
            Nothing on this stretch of paper
          </h1>
          <p className="mt-6 max-w-[48ch] text-[19px] text-ink-muted">
            The address you followed does not match anything on the record. It may have been renamed or removed.
          </p>
          <p className="mt-10">
            <Link className="action pen" href="/">
              <ArrowLeft aria-hidden="true" /> Back to the record
            </Link>
          </p>
        </section>
      </Paper>
    </>
  );
}
