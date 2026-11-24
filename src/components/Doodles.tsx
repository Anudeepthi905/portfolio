/**
 * Small hand-drawn-style doodles. All decorative: aria-hidden, drawn in the
 * accent colour via currentColor, and they wiggle on hover (motion-safe only).
 */

type Props = { className?: string };

const common = {
  "aria-hidden": true,
  focusable: false,
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** Loose squiggle, used under the name. */
export function Squiggle({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 240 16" strokeWidth={2.5} className={`doodle ${className}`} {...common}>
      <path d="M3 10c12-7 20-7 30 0s19 6 30-1 20-6 30 1 19 6 30-1 21-6 31 1 19 6 30-1 20-6 30 0 14 4 19 1" />
    </svg>
  );
}

/** Slightly lopsided five-point star, used next to awards. */
export function Star({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.8} className={`doodle ${className}`} {...common}>
      <path d="M12.2 2.8l2.4 5.6 6 .5-4.6 4 1.5 6-5.4-3.3-5.3 3.4 1.3-6.1-4.6-3.9 6.1-.6z" />
    </svg>
  );
}

/** Wobbly downward arrow, used between "How I work" steps. */
export function ArrowDown({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 20 40" strokeWidth={1.8} className={`doodle ${className}`} {...common}>
      <path d="M10 3c-3 6 3 11 0 17s2 10 0 15" />
      <path d="M5 29.5l5 6.2 4.6-6.6" />
    </svg>
  );
}

/** Little paper plane, used by Contact. */
export function PaperPlane({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 40 28" strokeWidth={1.8} className={`doodle ${className}`} {...common}>
      <path d="M3 13.5L36 3 25 25l-7-8.5z" />
      <path d="M36 3L18 16.5l-1 7.5 4-4.5" />
      <path d="M2 22c3-1 5 1 8 0" strokeDasharray="1.5 3" />
    </svg>
  );
}

/** Number inside a hand-drawn (not quite closed) circle. */
export function NumberCircle({ n }: { n: number }) {
  return (
    <span className="relative inline-flex h-9 w-9 items-center justify-center font-serif text-lg text-accent">
      <svg viewBox="0 0 40 40" strokeWidth={1.8} className="doodle absolute inset-0 h-full w-full" {...common}>
        <path d="M22 4.5c9 .5 14.5 7.5 13.5 16S27 35.5 19 35.5 4.5 29 4.5 20.5 11 4 21.5 5.5" />
      </svg>
      <span aria-hidden="true">{n}</span>
    </span>
  );
}

/** Soft wavy section divider (drawn with a CSS mask in globals.css). */
export function WavyRule({ className = "" }: Props) {
  return <div aria-hidden="true" className={`wavy-rule ${className}`} />;
}
