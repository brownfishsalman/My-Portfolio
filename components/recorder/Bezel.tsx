import Link from "next/link";
import { Lamp } from "./Lamp";

type Props = { name: string; cvUrl?: string };

/** The recorder housing: fixed at the top, carries the controls (navigation). */
export function Bezel({ name, cvUrl }: Props) {
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
        <Link href="/projects">Projects</Link>
        <Link href="/#about">About</Link>
        <Link href="/#experience">Experience</Link>
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
