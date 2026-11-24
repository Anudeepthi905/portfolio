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

/**
 * Dry-brush stroke: irregular edges, tapered ends, and a few thin bristle gaps
 * (the gaps are holes cut with fill-rule="evenodd"). Used under the name and
 * in the OG image (see BRUSH_STROKE_PATH).
 */
export const BRUSH_STROKE_PATH =
  "M2 10.5C14 7.2 30 5.6 52 5.4S92 4.2 118 4.9 160 3.8 186 4.6 228 4.4 246 6.1L258 8.2C252 9.6 244 10.8 232 11.4S196 12.4 172 12.6 128 13.8 98 13.1 52 14.6 30 13.4 9 12.4 2 10.5Z" +
  "M34 9.1C56 8.3 80 8.2 104 8.6 82 9.4 58 9.6 34 9.1Z" +
  "M120 7.4C146 6.8 172 6.7 198 7.1 174 7.8 148 8 120 7.4Z" +
  "M70 11.3C92 10.9 114 10.9 140 11.2 116 11.8 92 11.9 70 11.3Z" +
  "M206 9.2C218 8.9 230 9 240 9.4 230 9.8 218 9.8 206 9.2Z";

export function BrushStroke({ className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 260 18"
      aria-hidden="true"
      focusable="false"
      className={`doodle ${className}`}
    >
      <path d={BRUSH_STROKE_PATH} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}

/** Dancing: a twirl with a couple of motion lines. */
export function Twirl({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 40 32" strokeWidth={1.8} className={`doodle ${className}`} {...common}>
      <path d="M7 25c3-9 14-12 17-5s-6 9-8 3 5-13 15-11" />
      <path d="M29 22c2.5.3 4.5 1.4 6 3" />
      <path d="M31 16.5c1.8-.2 3.4.2 4.8 1.2" />
      <path d="M4 29.5c3 .6 6 .5 9-.4" />
    </svg>
  );
}

/** Art & craft: a paintbrush over a pinked paper edge. */
export function BrushAndPaper({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 40 32" strokeWidth={1.8} className={`doodle ${className}`} {...common}>
      <path d="M5 23.5L19.5 9.2" />
      <path d="M18 7.8l3.7 3.6" />
      <path d="M21 8.5c2.8-3.3 6.6-5.4 10.4-6.2-.9 3.8-3.2 7.4-6.6 10" />
      <path d="M14 29l2.6-2.8 2.7 2.8 2.6-2.8 2.7 2.8 2.6-2.8 2.7 2.8 2.6-2.8 2.7 2.8" />
    </svg>
  );
}

/** Books: an open book. */
export function OpenBook({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 40 32" strokeWidth={1.8} className={`doodle ${className}`} {...common}>
      <path d="M20 9.5C15.5 5.8 9.8 5.4 4.5 7.2v17.6c5.2-1.6 10.6-1.2 15.5 2.4" />
      <path d="M20 9.5c4.6-3.8 10.2-4.3 15.6-2.5v17.7c-5.3-1.7-10.7-1.3-15.6 2.5V9.5" />
      <path d="M8 11.5c2.8-.6 5.4-.3 8 .9M8 16c2.8-.6 5.4-.3 8 .9" />
    </svg>
  );
}

/** Learning: a small sprout. */
export function Sprout({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 40 32" strokeWidth={1.8} className={`doodle ${className}`} {...common}>
      <path d="M19.5 28c-.4-5.2-.2-9.6 1-14" />
      <path d="M20.3 17.2c-6.5.4-10.4-3.1-11-8.2 5.6-.4 10 2.9 11 8.2Z" />
      <path d="M20.6 13.6c.6-5.6 4.8-9 10.6-9.2-.2 5.6-4.4 8.9-10.6 9.2Z" />
      <path d="M11 28.2c5.6-1.2 12.4-1.2 18 .2" />
    </svg>
  );
}

/** Wobbly outline that stretches to fill a book spine. */
export function SpineOutline({ className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 40 160"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M4 3.5C14 2.4 27 2.8 36.5 3.2 37.4 40 36.6 90 37.2 156.4 26 157.6 14 157.2 3.6 156.6 2.8 110 3.6 50 4 3.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M5 20c10-.8 20-.6 31 .2M5 140c10 .6 20 .6 31-.2"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.2}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** Hand-drawn shelf line under the book spines. */
export function ShelfLine({ className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 300 8"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={`text-accent ${className}`}
    >
      <path
        d="M2 4.5C60 3.2 120 5.2 180 4 230 3.2 270 4.6 298 3.8"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
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
