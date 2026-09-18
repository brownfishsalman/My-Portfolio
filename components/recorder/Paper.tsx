import type { ReactNode } from "react";
import { ChannelBand, type RollSection } from "./ChannelBand";

const MARKS = 160; // 160 × 120px = enough roll for any page; the margin clips the rest

type Props = {
  children: ReactNode;
  /** the sections on this roll, in order (drives the CH2 pen and its labels) */
  sections: RollSection[];
};

/** One roll of chart paper: margins with perforations and timing marks, the field, and the pens. */
export function Paper({ children, sections }: Props) {
  return (
    <div className="paper" style={{ paddingTop: "var(--bezel)" }}>
      <div className="perforation perforation-left" aria-hidden="true" />
      <div className="timing" aria-hidden="true">
        {Array.from({ length: MARKS }, (_, i) => (
          <div key={i} className="timing-mark" style={{ top: `${i * 120}px` }}>
            <span>{i * 120}</span>
          </div>
        ))}
      </div>
      <div className="perforation perforation-right" aria-hidden="true" />

      <div className="field">
        <div className="field-band" aria-hidden="true">
          <div className="lane" style={{ left: "0" }} />
          <div className="lane hidden md:block" style={{ left: "33.333%" }} />
          <div className="lane hidden md:block" style={{ left: "66.666%" }} />
          <ChannelBand sections={sections} />
        </div>
        {children}
      </div>

      <Carriage />
    </div>
  );
}

/** The fixed pen head. Three nibs over the lanes; a faint dashed line across the content. */
function Carriage() {
  return (
    <div className="carriage" aria-hidden="true">
      <div className="carriage-tick left" />
      <div className="carriage-line" />
      <div className="carriage-band">
        <Nib left="calc(0% + 6px)" color="var(--pen)" />
        <Nib left="calc(33.333% + 6px)" color="var(--ink)" hideOnMobile />
        <Nib left="calc(66.666% + 6px)" color="var(--ink-muted)" hideOnMobile />
      </div>
      <div className="carriage-tick right" />
    </div>
  );
}

function Nib({ left, color, hideOnMobile }: { left: string; color: string; hideOnMobile?: boolean }) {
  return (
    <svg
      className={hideOnMobile ? "hidden md:block" : ""}
      style={{ position: "absolute", left, top: -1, transform: "translate(-50%, -100%)" }}
      width="12"
      height="14"
      viewBox="0 0 12 14"
    >
      <path d="M1 0h10L6 13Z" fill={color} />
    </svg>
  );
}

