"use client";

import { useEffect, useRef, useState } from "react";
import { CloseIcon, MenuIcon } from "./Icons";
import { ThemeToggle } from "./ThemeToggle";

// num matches the section numbers on the page (Skills, 05, isn't in the nav).
const nav = [
  { id: "work", label: "Work", num: 1 },
  { id: "experience", label: "Experience", num: 2 },
  { id: "how-i-work", label: "How I work", num: 3 },
  { id: "writing", label: "Writing & Awards", num: 4 },
  { id: "off-the-clock", label: "Off the clock", num: 6 },
  { id: "contact", label: "Contact", num: 7 },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Translucent background only after scrolling. Above the first section,
  // no nav item is active.
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const first = document.getElementById(nav[0]!.id);
      if (first && first.getBoundingClientRect().top > window.innerHeight * 0.5) setActive(null);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the section currently in the middle of the screen.
  useEffect(() => {
    const sections = nav
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!("IntersectionObserver" in window) || sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Mobile menu: lock body scroll, trap focus, Escape closes.
  useEffect(() => {
    if (!open) return;
    const header = headerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusables = () =>
      Array.from(
        header?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? [],
      ).filter((el) => el.offsetParent !== null);

    focusables().find((el) => el.closest("#mobile-menu"))?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const linkClass = (id: string) =>
    `inline-flex h-11 items-center rounded-md px-2.5 text-sm transition-colors ${
      active === id ? "text-accent-strong font-medium" : "text-muted hover:text-text"
    }`;

  return (
    <header
      ref={headerRef}
      // While the menu is open the header is solid with no blur: backdrop-filter
      // would make the fixed menu panel position itself inside the header.
      className={`sticky top-0 z-40 border-b transition-colors ${
        open
          ? "border-border bg-bg"
          : scrolled
            ? "border-border bg-[var(--header-bg)] backdrop-blur-md"
            : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1040px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#top"
          aria-label="Kambalapally Anu Deepthi, back to top"
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-surface-alt font-heading text-sm font-bold tracking-tight text-accent-strong"
          onClick={() => setOpen(false)}
        >
          AD
        </a>

        <div className="flex items-center gap-1">
          <nav aria-label="Sections" className="hidden lg:block">
            <ul className="flex items-center">
              {nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={linkClass(item.id)}
                    aria-current={active === item.id ? "true" : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle />
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-text hover:bg-surface-alt lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Sections"
          className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto border-t border-border bg-bg lg:hidden"
        >
          <ul className="mx-auto max-w-[1040px] px-4 py-4 sm:px-6">
            {nav.map((item) => (
              <li key={item.id} className="border-b border-border">
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className={`flex min-h-14 items-center gap-4 text-lg ${
                    active === item.id ? "text-accent-strong" : "text-text"
                  }`}
                >
                  <span className="font-mono text-xs text-muted">
                    {String(item.num).padStart(2, "0")}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
