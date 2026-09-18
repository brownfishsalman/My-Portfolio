import Link from "next/link";
import { ArrowDown, ArrowUpRight, Briefcase, Code, Download, FileText, Mail } from "lucide-react";
import { Bezel } from "@/components/recorder/Bezel";
import { Legend } from "@/components/recorder/Legend";
import { Paper } from "@/components/recorder/Paper";
import { Recorded } from "@/components/recorder/Recorded";
import { Picture } from "@/components/Picture";
import { Print } from "@/components/Print";
import { RichText } from "@/components/RichText";
import { RuleHeading } from "@/components/RuleHeading";
import { getExperience, getFeaturedProjects, getProjects, getPublications, getSettings, getSkills, usingPlaceholders } from "@/lib/content";
import { formatMonth, formatRange } from "@/lib/format";
import { KIND_LABEL, PUBLICATION_KIND_LABEL, PUBLICATION_STATUS_LABEL } from "@/lib/types";

export const revalidate = 60;

const SECTIONS = [
  { id: "projects", label: "Projects" },
  { id: "research", label: "Research" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

function splitName(name: string): [string, string] {
  const parts = name.trim().split(/\s+/);
  if (parts.length < 2) return [name, ""];
  return [parts.slice(0, -1).join(" "), parts[parts.length - 1]];
}

function hostOf(url: string): string {
  try {
    const u = new URL(url);
    return `${u.hostname.replace(/^www\./, "")}${u.pathname.replace(/\/$/, "")}`;
  } catch {
    return url;
  }
}

export default async function Home() {
  const [settings, featured, all, publications, skills, experience] = await Promise.all([
    getSettings(),
    getFeaturedProjects(),
    getProjects(),
    getPublications(),
    getSkills(),
    getExperience(),
  ]);
  // On the live site an empty section is simply not printed; the empty-state hints only show before Sanity is connected.
  const show = {
    projects: featured.length > 0 || usingPlaceholders,
    research: publications.length > 0 || usingPlaceholders,
    experience: experience.length > 0 || usingPlaceholders,
  };
  const sections = SECTIONS.filter((s) => (s.id in show ? show[s.id as keyof typeof show] : true));
  const [first, last] = splitName(settings.name);
  const [lead, ...rest] = featured;
  const showMeta = settings.degree || settings.university || settings.yearLabel || settings.location;
  const allSkills = skills.flatMap((g) => g.skills);

  return (
    <>
      <Bezel name={settings.name} cvUrl={settings.cvUrl} nav={show} />
      <Paper sections={sections}>
        <Legend />

        {/* ---- Chart header: name stamp, tagline, actions ---- */}
        <section className="flex min-h-[calc(100svh-var(--bezel)-150px)] flex-col justify-center py-14 md:py-16">
          <Recorded inked>
            <h1 className="stamp-name" style={{ fontSize: "clamp(56px, 8.4vw, 96px)" }}>
              {first}
              {last ? (
                <>
                  <br />
                  {last}
                </>
              ) : null}
            </h1>
            {settings.tagline ? (
              <p className="mt-9 max-w-[44ch] text-[20px] leading-snug text-ink md:text-[23px]">{settings.tagline}</p>
            ) : null}
            {showMeta ? (
              <dl className="meta mt-9">
                {settings.degree ? (
                  <>
                    <dt>Degree</dt>
                    <dd className={usingPlaceholders ? "placeholder" : ""}>{settings.degree}</dd>
                  </>
                ) : null}
                {settings.university ? (
                  <>
                    <dt>University</dt>
                    <dd className={usingPlaceholders ? "placeholder" : ""}>{settings.university}</dd>
                  </>
                ) : null}
                {settings.yearLabel ? (
                  <>
                    <dt>Year</dt>
                    <dd className={usingPlaceholders ? "placeholder" : ""}>{settings.yearLabel}</dd>
                  </>
                ) : null}
                {settings.location ? (
                  <>
                    <dt>Based in</dt>
                    <dd className={usingPlaceholders ? "placeholder" : ""}>{settings.location}</dd>
                  </>
                ) : null}
              </dl>
            ) : null}
            {showMeta && usingPlaceholders ? (
              <p className="mt-4">
                <span className="stamp example">Example · edit in Site settings</span>
              </p>
            ) : null}
            <div className="mt-11 flex flex-wrap gap-4">
              <a className="action pen" href="#projects">
                Read the record <ArrowDown aria-hidden="true" />
              </a>
              {settings.cvUrl ? (
                <a className="action" href={settings.cvUrl} download>
                  Download CV <Download aria-hidden="true" />
                </a>
              ) : (
                <span className="action muted" title="Upload a CV in the admin panel: Site settings → CV">
                  CV not uploaded yet
                </span>
              )}
            </div>
          </Recorded>
        </section>

        {/* ---- Featured projects ---- */}
        {show.projects ? (
        <section id="projects" className="pt-16 md:pt-[120px]">
          <RuleHeading event="run · featured projects" count={featured.length ? `${featured.length} prints` : undefined}>Featured projects</RuleHeading>
          {featured.length === 0 ? (
            <p className="empty mt-10">
              No featured projects yet. In the admin panel, open a project and tick <b>Show on home page</b>.
            </p>
          ) : (
            <div className="mt-12 grid gap-16 md:mt-16 md:gap-20">
              {lead ? (
                <Print project={lead} lead priority />
              ) : null}
              {rest.length ? (
                <div className="grid gap-14 md:grid-cols-2 md:gap-12">
                  {rest.map((p) => (
                    <Print key={p.slug} project={p} />
                  ))}
                </div>
              ) : null}
            </div>
          )}
          {all.length > featured.length ? (
            <p className="mt-14">
              <Link className="action" href="/projects">
                All {all.length} projects <ArrowUpRight aria-hidden="true" />
              </Link>
            </p>
          ) : null}
        </section>
        ) : null}

        {/* ---- Research publications ---- */}
        {show.research ? (
        <section id="research" className="pt-24 md:pt-32">
          <RuleHeading
            event="run · research"
            count={publications.length ? `${publications.length} ${publications.length === 1 ? "paper" : "papers"}` : undefined}
          >
            Research publications
          </RuleHeading>
          {publications.length === 0 ? (
            <p className="empty mt-10">
              No publications yet. Add a paper, preprint or thesis in the admin panel under <b>Research publications</b>.
            </p>
          ) : (
            <div className="mt-10 md:mt-12">
              {publications.map((pub, i) => (
                <Recorded key={`${pub.title}-${i}`}>
                  <div className="log-row">
                    <div className="log-dates">
                      {pub.date ? <div>{formatMonth(pub.date)}</div> : null}
                      {pub.pdfUrl ? (
                        <a className="pub-file" href={pub.pdfUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open PDF: ${pub.title}`}>
                          <FileText aria-hidden="true" />
                          <span>PDF</span>
                        </a>
                      ) : pub.url ? (
                        <a className="pub-file" href={pub.url} target="_blank" rel="noopener noreferrer" aria-label={`Open: ${pub.title}`}>
                          <ArrowUpRight aria-hidden="true" />
                          <span>{pub.url.includes("doi.org") ? "DOI" : "Read"}</span>
                        </a>
                      ) : null}
                    </div>
                    <div>
                      <h3 className="log-title">{pub.title}</h3>
                      {pub.authors || pub.venue ? (
                        <p className="log-org">
                          {pub.authors ? <span>{pub.authors}</span> : null}
                          {pub.authors && pub.venue ? " · " : ""}
                          {pub.venue ? <em>{pub.venue}</em> : null}
                        </p>
                      ) : null}
                      {pub.summary ? <p className="log-desc">{pub.summary}</p> : null}
                      {pub.url && pub.pdfUrl ? (
                        <div className="print-links mt-3">
                          <a href={pub.url} target="_blank" rel="noopener noreferrer">
                            {pub.url.includes("doi.org") ? "DOI" : "Read online"} <ArrowUpRight aria-hidden="true" width={14} height={14} />
                          </a>
                        </div>
                      ) : null}
                    </div>
                    <div className="flex gap-2 md:flex-col md:items-end">
                      <span className="stamp">{PUBLICATION_KIND_LABEL[pub.kind]}</span>
                      {PUBLICATION_STATUS_LABEL[pub.status] ? <span className="stamp">{PUBLICATION_STATUS_LABEL[pub.status]}</span> : null}
                      {pub.isExample ? <span className="stamp example">Example</span> : null}
                    </div>
                  </div>
                </Recorded>
              ))}
            </div>
          )}
        </section>
        ) : null}

        {/* ---- About + skills ---- */}
        <section id="about" className="pt-24 md:pt-32">
          <RuleHeading event="run · about">About</RuleHeading>
          <div className="mt-12 grid items-start gap-12 md:grid-cols-[minmax(0,1fr)_240px] md:gap-16">
            <div>
              <Recorded>
                {settings.bio?.length ? (
                  <RichText value={settings.bio} />
                ) : (
                  <p className="empty">
                    No bio yet. Write two or three short paragraphs in the admin panel: <b>Site settings → Bio</b>.
                  </p>
                )}
              </Recorded>
              <Recorded className="mt-10">
                <h3 className="display text-[22px] font-semibold tracking-wide">Skills</h3>
                {allSkills.length === 0 ? (
                  <p className="empty mt-5">
                    No skills yet. Add them in the admin panel under <b>Skills</b>.
                  </p>
                ) : (
                  <p className="skills mt-4">
                    {allSkills.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </p>
                )}
              </Recorded>
            </div>
            {settings.portrait ? (
              <Recorded>
                <div className="print-frame max-w-[240px]">
                  <span className="tape tl" aria-hidden="true" />
                  <Picture picture={settings.portrait} sizes="240px" />
                </div>
              </Recorded>
            ) : null}
          </div>

        </section>

        {/* ---- Experience log ---- */}
        {show.experience ? (
        <section id="experience" className="pt-24 md:pt-32">
          <RuleHeading event="run · experience and education" count={experience.length ? `${experience.length} entries` : undefined}>Experience &amp; education</RuleHeading>
          {experience.length === 0 ? (
            <p className="empty mt-10">
              Nothing logged yet. Add your degree, internships and roles in the admin panel under <b>Experience &amp; education</b>.
            </p>
          ) : (
            <div className="mt-10 md:mt-12">
              {experience.map((e, i) => (
                <Recorded key={`${e.title}-${i}`}>
                  <div className="log-row">
                    <div className="log-dates">{formatRange(e.start, e.end, e.current)}</div>
                    <div>
                      <h3 className="log-title">{e.title}</h3>
                      {e.organization || e.location ? (
                        <p className="log-org">{[e.organization, e.location].filter(Boolean).join(" · ")}</p>
                      ) : null}
                      {e.description ? <p className="log-desc">{e.description}</p> : null}
                      {e.url ? (
                        <p className="mt-2 text-[14px]">
                          <a href={e.url} className="text-pen" target="_blank" rel="noopener noreferrer">
                            View
                          </a>
                        </p>
                      ) : null}
                    </div>
                    <div className="flex gap-2 md:flex-col md:items-end">
                      <span className="stamp">{KIND_LABEL[e.kind]}</span>
                      {e.isExample ? <span className="stamp example">Example</span> : null}
                    </div>
                  </div>
                </Recorded>
              ))}
            </div>
          )}
        </section>
        ) : null}

        {/* ---- End of record: contact + CV tear-off ---- */}
        <section id="contact" className="pt-24 md:pt-32">
          <RuleHeading event="end of record">End of record</RuleHeading>
          <div className="mt-12 grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-16">
            <Recorded>
              {settings.contactNote ? <p className="max-w-[38ch] text-[20px] leading-snug">{settings.contactNote}</p> : null}
              <div className="mt-8">
                {settings.email ? (
                  <a className="contact-link" href={`mailto:${settings.email}`}>
                    <Mail aria-hidden="true" />
                    <span className="label">Email</span>
                    <span>{settings.email}</span>
                  </a>
                ) : null}
                {settings.github ? (
                  <a className="contact-link" href={settings.github} target="_blank" rel="noopener noreferrer">
                    <Code aria-hidden="true" />
                    <span className="label">GitHub</span>
                    <span>{hostOf(settings.github)}</span>
                  </a>
                ) : null}
                {settings.linkedin ? (
                  <a className="contact-link" href={settings.linkedin} target="_blank" rel="noopener noreferrer">
                    <Briefcase aria-hidden="true" />
                    <span className="label">LinkedIn</span>
                    <span>{hostOf(settings.linkedin)}</span>
                  </a>
                ) : null}
                {!settings.email && !settings.github && !settings.linkedin ? (
                  <p className="empty">
                    No contact links yet. Add them in the admin panel: <b>Site settings → Contact &amp; CV</b>.
                  </p>
                ) : null}
              </div>
            </Recorded>
            <Recorded>
              <div className="border border-dashed border-ink-faint p-7 md:p-9">
                <p className="display text-[34px] font-semibold md:text-[40px]">Curriculum vitae</p>
                <p className="data mt-3 text-[10.5px] uppercase tracking-wider text-ink-muted">Tear-off · PDF</p>
                <p className="mt-7">
                  {settings.cvUrl ? (
                    <a className="action pen" href={settings.cvUrl} download>
                      Download CV <Download aria-hidden="true" />
                    </a>
                  ) : (
                    <span className="action muted">CV not uploaded yet</span>
                  )}
                </p>
              </div>
            </Recorded>
          </div>

          <div className="tear mt-24 md:mt-28" aria-hidden="true" />
          <footer className="data flex flex-wrap justify-between gap-3 pb-10 pt-6 text-[10.5px] uppercase tracking-wider text-ink-muted">
            <span>
              {settings.name}
              {settings.footerNote ? ` · ${settings.footerNote}` : ""}
            </span>
          </footer>
        </section>
      </Paper>
    </>
  );
}
