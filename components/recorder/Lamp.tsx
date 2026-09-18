"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";

const readTheme = (): Theme => (document.documentElement.dataset.theme === "light" ? "light" : "dark");
const serverTheme = (): Theme => "dark";

/** Re-render whenever the html[data-theme] attribute changes (from this switch or anywhere else). */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

/**
 * The recorder's lamp: switches between night paper (dark) and daylight paper
 * (light). The choice is remembered; before a choice is made the site follows
 * the visitor's system setting (applied before first paint in app/layout.tsx).
 */
export function Lamp() {
  const theme = useSyncExternalStore(subscribe, readTheme, serverTheme);
  const lampOn = theme === "light";

  const toggle = () => {
    const next: Theme = lampOn ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private mode: the choice just lasts for this visit */
    }
  };

  return (
    <button
      type="button"
      className="lamp"
      onClick={toggle}
      aria-pressed={lampOn}
      aria-label={lampOn ? "Lamp on: switch to dark paper" : "Lamp off: switch to light paper"}
      title={lampOn ? "Switch to dark paper" : "Switch to light paper"}
    >
      {lampOn ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
      <span>Lamp</span>
    </button>
  );
}
