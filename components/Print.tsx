import { ArrowUpRight } from "lucide-react";
import { Picture } from "./Picture";
import { YouTube } from "./YouTube";
import { Recorded } from "./recorder/Recorded";
import type { Project } from "@/lib/types";
import { formatMonth } from "@/lib/format";

type Props = {
  project: Project;
  /** The featured lead: full column width, larger title. */
  lead?: boolean;
  priority?: boolean;
};

/** A project on the roll: its video (or cover photo) with taped corners, then a stamped caption. */
export function Print({ project, lead = false, priority }: Props) {
  return (
    <Recorded>
      <article className={lead ? "print print-lead" : "print"}>
        {project.youtubeUrl ? (
          <YouTube url={project.youtubeUrl} title={`${project.title} — video`} example={project.isExample} />
        ) : project.cover ? (
          <div className="print-frame print-cover">
            <span className="tape tl" aria-hidden="true" />
            <Picture picture={project.cover} sizes={lead ? "(max-width: 767px) 90vw, 55vw" : "(max-width: 767px) 90vw, 28vw"} priority={priority} />
            <span className="tape br" aria-hidden="true" />
          </div>
        ) : null}
        <div className="print-caption">
          <h3 className="print-title" style={lead ? { fontSize: "clamp(30px, 3.4vw, 44px)" } : undefined}>
            {project.title}
          </h3>
          <p className="print-summary">{project.summary}</p>
          <div className="print-meta">
            {project.date ? <span>{formatMonth(project.date)}</span> : null}
            {project.tags.slice(0, 4).map((t) => (
              <span key={t}>{t}</span>
            ))}
            {project.isExample ? <span className="stamp example">Example</span> : null}
          </div>
          {project.links.length ? (
            <div className="print-links">
              {project.links.map((l) => (
                <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer">
                  {l.label} <ArrowUpRight aria-hidden="true" width={14} height={14} />
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </article>
    </Recorded>
  );
}
