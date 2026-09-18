const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-04-01" → "Apr 2026" */
export function formatMonth(iso: string): string {
  const [y, m] = iso.split("-").map(Number);
  if (!y || !m) return iso;
  return `${MONTHS[m - 1]} ${y}`;
}

/** "2026-04-01" → "2026" */
export function formatYear(iso: string): string {
  return iso.slice(0, 4);
}

/** Date range for the experience log: "Sep 2023 — present" */
export function formatRange(start?: string, end?: string, current?: boolean): string {
  const a = start ? formatMonth(start) : "";
  const b = current ? "present" : end ? formatMonth(end) : "";
  if (a && b) return a === b ? a : `${a} — ${b}`;
  return a || b;
}

/** Today's date as printed on the chart header */
export function today(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Extract a YouTube video id from any of the usual link forms. */
export function youtubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname === "youtu.be") return u.pathname.slice(1) || null;
    if (u.hostname.endsWith("youtube.com") || u.hostname.endsWith("youtube-nocookie.com")) {
      if (u.pathname === "/watch") return u.searchParams.get("v");
      const m = u.pathname.match(/^\/(embed|shorts|live)\/([\w-]+)/);
      if (m) return m[2];
    }
  } catch {
    return null;
  }
  return null;
}
