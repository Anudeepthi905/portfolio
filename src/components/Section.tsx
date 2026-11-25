import type { Tint } from "@/data/site";

/** Static class names per tint so Tailwind can see them. */
export const tintBg: Record<Tint, string> = {
  mint: "bg-mint",
  peach: "bg-peach",
  sky: "bg-sky",
  butter: "bg-butter",
  rose: "bg-rose",
};

export function Section({
  id,
  num,
  title,
  center = false,
  children,
}: {
  id: string;
  num: number;
  title: string;
  center?: boolean;
  children: React.ReactNode;
}) {
  const headingId = `${id}-heading`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`reveal border-t border-border py-16 sm:py-24 ${center ? "text-center" : ""}`}
    >
      <h2
        id={headingId}
        className={`mb-10 flex items-baseline gap-3 font-heading text-section font-semibold ${
          center ? "justify-center" : ""
        }`}
      >
        <span className="font-mono text-[13px] font-normal tracking-normal text-muted">
          {String(num).padStart(2, "0")} —
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}

/** Small mono label used for dates, tech lists and field names. */
export function Mono({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`font-mono text-[13px] text-muted ${className}`}>{children}</span>;
}
