import Link from "next/link";
import { Lamp } from "./Lamp";

type Props = {
  name: string;
  cvUrl?: string;
  /** Which optional home sections exist; their links are only printed when they do. */
  nav?: { projects?: boolean; research?: boolean; experience?: boolean };
};

/** The recorder housing: fixed at the top, carries the controls (navigation). */
export function Bezel({ name, cvUrl, nav = {} }: Props) {
  const [first, ...rest] = name.split(" ");
  return (
    <header className="bezel">
      <Link href="/" className="bezel-name" aria-label={`${name}, home`}>
        <span className="rec" aria-hidden="true">
          Rec
        </span>
        <span>
          {first} <span className="full">{rest.join(" ")}</span>
        </span>
      </Link>
      <nav className="bezel-nav" aria-label="Sections">
        {nav.projects !== false ? <Link href="/projects">Projects</Link> : null}
        {nav.research ? <Link href="/#research">Research</Link> : null}
        <Link href="/#about">About</Link>
        {nav.experience !== false ? <Link href="/#experience">Experience</Link> : null}
        <Link href="/#contact">Contact</Link>
        {cvUrl ? (
          <a className="is-cv" href={cvUrl} download>
            CV
          </a>
        ) : null}
        <Lamp />
      </nav>
    </header>
  );
}
