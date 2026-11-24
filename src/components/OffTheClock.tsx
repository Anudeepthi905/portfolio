import Image from "next/image";
import { offTheClock, type InterestKey } from "@/data/site";
import { formatMonth } from "@/lib/format";
import { BrushAndPaper, OpenBook, ShelfLine, SpineOutline, Sprout, Twirl } from "./Doodles";
import { Row, Section } from "./Layout";

const icons: Record<InterestKey, React.ComponentType<{ className?: string }>> = {
  dancing: Twirl,
  art: BrushAndPaper,
  books: OpenBook,
  learning: Sprout,
};

// Slightly different sizes and lean per spine so the shelf looks hand-made.
// Titles too long for a spine end in "…"; the full title is in the tooltip
// and is read in full by screen readers.
// Sizes in px; lean in degrees.
const spineShapes = [
  { h: 192, w: 50, lean: -1 },
  { h: 176, w: 46, lean: 0.5 },
  { h: 208, w: 50, lean: 0 },
  { h: 184, w: 46, lean: 1 },
  { h: 192, w: 50, lean: -0.5 },
];

export function OffTheClock() {
  const { intro, interests, books, nowLearning, gallery } = offTheClock;

  return (
    <Section id="off-the-clock" title="Off the clock" className="pb-16 pt-2">
      {intro && (
        <Row>
          <p className="text-lg">{intro}</p>
        </Row>
      )}

      <Row className="mt-6">
        <ul className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
          {interests.map((item) => {
            const Icon = icons[item.key];
            return (
              <li key={item.key} className="wiggle-parent flex items-start gap-3">
                <Icon className="mt-0.5 h-7 w-9 shrink-0" />
                <div className="min-w-0">
                  <h3 className="font-serif text-lg font-medium leading-snug">{item.label}</h3>
                  {item.text && <p className="mt-0.5 text-[0.95rem]">{item.text}</p>}
                </div>
              </li>
            );
          })}
        </ul>
      </Row>

      {books.length > 0 && (
        <Row className="mt-10" margin={<h3>Bookshelf</h3>}>
          <ul className="flex flex-wrap items-end gap-x-1.5 gap-y-4" aria-label="Books I like">
            {books.slice(0, 5).map((book, i) => {
              const s = spineShapes[i % spineShapes.length]!;
              return (
                <li
                  key={book.title}
                  title={`${book.title} by ${book.author}`}
                  className="spine relative shrink-0"
                  style={{ height: s.h, width: s.w, rotate: `${s.lean}deg` }}
                >
                  <SpineOutline className="absolute inset-0 h-full w-full text-accent" />
                  {/* Horizontal text sized to the spine's length, then turned 90°. */}
                  <span
                    className="absolute left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2 rotate-90 text-center"
                    style={{ width: s.h - 44 }}
                  >
                    <span className="block truncate font-serif text-sm leading-tight">{book.title}</span>
                    <span className="sr-only"> by </span>
                    <span className="block truncate text-[0.7rem] leading-tight text-muted">{book.author}</span>
                  </span>
                </li>
              );
            })}
          </ul>
          <ShelfLine className="mt-1 h-2 w-full max-w-xs" />
        </Row>
      )}

      {nowLearning.length > 0 && (
        <div className="mt-10">
          <Row margin={<h3>Now learning</h3>}>
            <ol className="space-y-1.5 text-[0.95rem]">
              {nowLearning.map((entry) => (
                <li key={`${entry.date}-${entry.text}`}>
                  <time dateTime={entry.date} className="mr-2 text-sm text-muted">
                    {formatMonth(entry.date)}
                  </time>
                  {entry.text}
                </li>
              ))}
            </ol>
          </Row>
        </div>
      )}

      {gallery.length > 0 && (
        <Row className="mt-10" margin={<h3>Made by hand</h3>}>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {gallery.slice(0, 3).map((img) => (
              <li key={img.src}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  sizes="(min-width: 768px) 220px, 50vw"
                  className="aspect-square h-auto w-full rounded-xl border border-rule object-cover"
                />
              </li>
            ))}
          </ul>
        </Row>
      )}
    </Section>
  );
}
