"use client";

import { useSyncExternalStore } from "react";
import { MonitorIcon, MoonIcon, SunIcon } from "./Icons";

/**
 * Three-way theme toggle: System → Light → Dark.
 * The <html data-theme> attribute is the source of truth. It's set before
 * paint by the inline script in app/layout.tsx; "System" means no attribute,
 * so the CSS follows prefers-color-scheme live.
 */

type Mode = "system" | "light" | "dark";

const ORDER: Mode[] = ["system", "light", "dark"];
const LABEL: Record<Mode, string> = { system: "System", light: "Light", dark: "Dark" };
const STORAGE_KEY = "theme";

const listeners = new Set<() => void>();

function readMode(): Mode {
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "light" || attr === "dark" ? attr : "system";
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function applyMode(mode: Mode) {
  const root = document.documentElement;
  if (mode === "system") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", mode);
  try {
    if (mode === "system") localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, mode);
  } catch {
    // Storage blocked (private mode etc.): the choice lasts for this page only.
  }
  listeners.forEach((l) => l());
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const mode = useSyncExternalStore(subscribe, readMode, () => "system" as Mode);
  const next = ORDER[(ORDER.indexOf(mode) + 1) % ORDER.length]!;
  const Icon = mode === "light" ? SunIcon : mode === "dark" ? MoonIcon : MonitorIcon;

  return (
    <button
      type="button"
      onClick={() => applyMode(next)}
      aria-label={`Theme: ${LABEL[mode]}. Switch to ${LABEL[next]}.`}
      title={`Theme: ${LABEL[mode]}`}
      className={`inline-flex h-11 w-11 items-center justify-center rounded-full text-text hover:bg-surface-alt ${className}`}
    >
      <Icon />
    </button>
  );
}
