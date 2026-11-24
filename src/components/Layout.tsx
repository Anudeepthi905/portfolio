/**
 * Editorial two-column row: a narrow margin column for dates/labels and a
 * single reading column (max ~680px). Stacks on small screens.
 */
export function Row({
  margin,
  children,
  className = "",
}: {
  margin?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`grid gap-x-10 gap-y-1 md:grid-cols-[8.5rem_minmax(0,680px)] ${className}`}>
      <div className="text-sm text-muted md:pt-[0.2rem] md:text-right">{margin}</div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

export function Section({
  id,
  title,
  children,
  className = "",
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className={`border-t border-rule ${className}`}>
      <Row className="mb-8">
        <h2 id={headingId} className="font-serif text-2xl font-medium tracking-tight">
          {title}
        </h2>
      </Row>
      {children}
    </section>
  );
}
