type Props = {
  id?: string;
  children: React.ReactNode;
  /** A short measured value printed after the title, e.g. "3 prints" */
  count?: string;
  /** The event label the recorder writes in the margin, e.g. "run · projects". Defaults to the title. */
  event?: string;
  as?: "h1" | "h2";
};

/**
 * A section title drawn as the event annotation on the chart: a pen tick from
 * the margin, the event name written along the margin, the title, then a rule.
 */
export function RuleHeading({ id, children, count, event, as: Tag = "h2" }: Props) {
  const label = event ?? (typeof children === "string" ? `event · ${children}` : "event");
  return (
    <Tag id={id} className="rule-heading">
      <span className="event" aria-hidden="true">
        {label}
      </span>
      <span>{children}</span>
      {count ? <span className="count">{count}</span> : null}
    </Tag>
  );
}
