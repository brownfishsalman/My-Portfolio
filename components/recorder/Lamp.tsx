"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";

/**
 * The recorder's lamp: switches between night paper (dark) and daylight paper
 * (light). The choice is remembered; before a choice is made the site follows
 * the visitor's system setting (applied before first paint in app/layout.tsx).
 */
export function Lamp() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const current = document.documentElement.dataset.theme === "light" ? "light" : "dark";
    setTheme(current);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private mode: the choice just lasts for this visit */
    }
    setTheme(next);
  };

  const lampOn = theme === "light";
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
