import type { Metadata } from "next";
import { Bezel } from "@/components/recorder/Bezel";
import { Legend } from "@/components/recorder/Legend";
import { Paper } from "@/components/recorder/Paper";
import { Print } from "@/components/Print";
import { RuleHeading } from "@/components/RuleHeading";
import { getProjects, getSettings } from "@/lib/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Projects",
  description: "Every project on the record, from analysis to build to test.",
};

export default async function ProjectsPage() {
  const [settings, projects] = await Promise.all([getSettings(), getProjects()]);
  return (
    <>
      <Bezel name={settings.name} cvUrl={settings.cvUrl} />
      <Paper sections={[{ id: "all", label: "Projects" }]}>
        <Legend />
        <section id="all" className="pb-24 pt-14 md:pt-20">
          <RuleHeading as="h1" event="all projects" count={projects.length ? `${projects.length} prints` : undefined}>
            Projects
          </RuleHeading>
          {projects.length === 0 ? (
            <p className="empty mt-10">
              No projects yet. In the admin panel choose <b>Projects → Create</b>, give it a title, a summary, a cover image, and write the analysis, build and test sections.
            </p>
          ) : (
            <div className="mt-12 grid gap-14 md:mt-16 md:grid-cols-2 md:gap-x-12 md:gap-y-20">
              {projects.map((p, i) => (
                <Print key={p.slug} project={p} priority={i < 2} />
              ))}
            </div>
          )}
        </section>
      </Paper>
    </>
  );
}
