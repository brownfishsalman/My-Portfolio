import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Bezel } from "@/components/recorder/Bezel";
import { Legend } from "@/components/recorder/Legend";
import { Paper } from "@/components/recorder/Paper";
import { Recorded } from "@/components/recorder/Recorded";
import { Picture } from "@/components/Picture";
import { RichText } from "@/components/RichText";
import { RuleHeading } from "@/components/RuleHeading";
import { YouTube } from "@/components/YouTube";
import { getProject, getProjectSlugs, getSettings } from "@/lib/content";
import { formatMonth } from "@/lib/format";
import type { PortableTextBlock } from "@portabletext/types";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.summary,
    openGraph: project.cover ? { images: [{ url: project.cover.url }] } : undefined,
  };
}

const PHASES: { id: "analysis" | "build" | "test"; title: string; blurb: string }[] = [
  { id: "analysis", title: "Analysis", blurb: "how the problem was framed and modelled" },
  { id: "build", title: "Build", blurb: "what was made" },
  { id: "test", title: "Test", blurb: "how it performed against the model" },
];

function Phase({
  id,
  title,
  blurb,
  body,
  children,
}: {
  id: string;
  title: string;
  blurb: string;
  body?: PortableTextBlock[];
  children?: React.ReactNode;
}) {
  const hasBody = Boolean(body && body.length);
  return (
    <section id={id} className="pt-20 md:pt-28">
      <RuleHeading event={`phase · ${title}`} count={blurb}>{title}</RuleHeading>
      <div className="mt-10 grid gap-12">
        {hasBody ? (
          <Recorded>
            <RichText value={body!} />
          </Recorded>
        ) : (
          <Recorded>
            <p className="empty">
              Nothing recorded for <b>{title.toLowerCase()}</b> yet. Add it in the admin panel under this project&apos;s <b>Write-up</b> tab.
            </p>
          </Recorded>
        )}
        {children}
      </div>
    </section>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const [settings, project] = await Promise.all([getSettings(), getProject(slug)]);
  if (!project) notFound();

  const gallery = project.gallery.filter((g) => g.url !== project.cover?.url);

  return (
    <>
      <Bezel name={settings.name} cvUrl={settings.cvUrl} />
      <Paper sections={PHASES.map((p) => ({ id: p.id, label: p.title }))}>
        <Legend />

        <div className="pt-10 md:pt-14">
          <Link href="/projects" className="stamp" style={{ color: "var(--ink-muted)" }}>
            <ArrowLeft aria-hidden="true" width={12} height={12} /> All projects
          </Link>
        </div>

        <header className="pt-10 md:pt-14">
          <Recorded inked>
            <h1 className="display" style={{ fontSize: "clamp(40px, 6vw, 84px)" }}>
              {project.title}
            </h1>
            <p className="mt-6 max-w-[58ch] text-[19px] leading-snug text-ink-muted md:text-[22px]">{project.summary}</p>
            <dl className="meta mt-9">
              {project.date ? (
                <>
                  <dt>Date</dt>
                  <dd>{formatMonth(project.date)}</dd>
                </>
              ) : null}
              {project.role ? (
                <>
                  <dt>Role</dt>
                  <dd>{project.role}</dd>
                </>
              ) : null}
              {project.tags.length ? (
                <>
                  <dt>Tags</dt>
                  <dd>{project.tags.join(" · ")}</dd>
                </>
              ) : null}
              {project.links.length ? (
                <>
                  <dt>Links</dt>
                  <dd className="flex flex-wrap gap-x-5 gap-y-1">
                    {project.links.map((l) => (
                      <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-pen">
                        {l.label} <ArrowUpRight aria-hidden="true" width={14} height={14} />
                      </a>
                    ))}
                  </dd>
                </>
              ) : null}
            </dl>
            {project.isExample ? (
              <p className="empty mt-9">
                <b>Example project.</b> The text and figures are illustrative. Replace them or delete this project in the admin panel.
              </p>
            ) : null}
          </Recorded>
        </header>

        {project.cover ? (
          <div className="mt-14 md:mt-20">
            <Recorded>
              <figure>
                <div className="print-frame print-cover">
                  <span className="tape tl" aria-hidden="true" />
                  <Picture picture={project.cover} sizes="(max-width: 767px) 92vw, 58vw" priority />
                  <span className="tape br" aria-hidden="true" />
                </div>
                {project.cover.caption ? (
                  <figcaption className="data mt-4 text-[11px] uppercase tracking-wider text-ink-muted">{project.cover.caption}</figcaption>
                ) : null}
              </figure>
            </Recorded>
          </div>
        ) : null}

        <Phase {...PHASES[0]} body={project.analysis} />

        <Phase {...PHASES[1]} body={project.build}>
          {gallery.length ? (
            <div className="grid gap-10 md:grid-cols-2">
              {gallery.map((g, i) => (
                <Recorded key={`${g.url}-${i}`}>
                  <figure>
                    <div className="print-frame">
                      <Picture picture={g} sizes="(max-width: 767px) 90vw, 30vw" />
                    </div>
                    {g.caption ? (
                      <figcaption className="data mt-3 text-[11px] uppercase tracking-wider text-ink-muted">{g.caption}</figcaption>
                    ) : null}
                  </figure>
                </Recorded>
              ))}
            </div>
          ) : null}
        </Phase>

        <Phase {...PHASES[2]} body={project.test}>
          {project.youtubeUrl ? (
            <Recorded className="max-w-[840px]">
              <YouTube
                url={project.youtubeUrl}
                title={`${project.title} — video`}
                caption={project.isExample ? "Example video · replace with your own link in the admin panel" : "Video"}
                example={project.isExample}
              />
            </Recorded>
          ) : null}
        </Phase>

        <footer className="pb-24 pt-20 md:pt-28">
          <div className="tear" aria-hidden="true" />
          <div className="flex flex-wrap items-center justify-between gap-6 pt-8">
            <Link className="action" href="/projects">
              <ArrowLeft aria-hidden="true" /> All projects
            </Link>
            {settings.cvUrl ? (
              <a className="action pen" href={settings.cvUrl} download>
                Download CV
              </a>
            ) : null}
          </div>
        </footer>
      </Paper>
    </>
  );
}
