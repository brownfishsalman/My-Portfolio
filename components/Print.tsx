import Link from "next/link";
import { Picture } from "./Picture";
import { Recorded } from "./recorder/Recorded";
import type { ProjectSummary } from "@/lib/types";
import { formatMonth } from "@/lib/format";

type Props = {
  project: ProjectSummary;
  /** Larger print with the caption beside it (the featured lead). */
  lead?: boolean;
  priority?: boolean;
};

/** A project pasted on the roll: photo/figure with taped corners and a stamped caption. */
export function Print({ project, lead = false, priority }: Props) {
  const href = `/projects/${project.slug}`;
  return (
    <Recorded>
      <Link href={href} className="print">
        <article className={lead ? "print-lead" : undefined}>
          <div className="print-frame">
            <span className="tape tl" aria-hidden="true" />
            {project.cover ? (
              <Picture picture={project.cover} sizes={lead ? "(max-width: 767px) 90vw, 55vw" : "(max-width: 767px) 90vw, 28vw"} priority={priority} />
            ) : (
              <div className="video" aria-hidden="true" />
            )}
            <span className="tape br" aria-hidden="true" />
          </div>
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
          </div>
        </article>
      </Link>
    </Recorded>
  );
}
