import Image from "next/image";
import { offTheClock, type InterestKey, type Tint } from "@/data/site";
import { formatMonth } from "@/lib/format";
import { BookIcon, BrushIcon, DanceIcon, GamesIcon } from "./Icons";
import { Mono, Section, tintBg } from "./Section";

const icons: Record<InterestKey, React.ComponentType<{ className?: string }>> = {
  books: BookIcon,
  art: BrushIcon,
  dance: DanceIcon,
  games: GamesIcon,
};

// Spine sizes (px) vary a little so the shelf doesn't look generated.
const spines: { h: number; w: number; tint: Tint }[] = [
  { h: 184, w: 46, tint: "sky" },
  { h: 168, w: 42, tint: "rose" },
  { h: 196, w: 46, tint: "butter" },
  { h: 176, w: 42, tint: "mint" },
  { h: 188, w: 46, tint: "peach" },
];

export function OffTheClock() {
  const { intro, interests, books, nowLearning, gallery } = offTheClock;

  return (
    <Section id="off-the-clock" num={6} title="Off the clock">
      {intro && <p className="max-w-[680px] text-lg text-text">{intro}</p>}

      <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {interests.map((item) => {
          const Icon = icons[item.key];
          return (
            <li key={item.key} className={`rounded-[14px] p-4 sm:p-5 ${tintBg[item.tint]}`}>
              <Icon className="h-6 w-6 text-text" />
              <h3 className="mt-3 font-heading font-semibold tracking-tight text-text">
                {item.label}
              </h3>
              {item.text && <p className="mt-1 text-[14.5px] leading-relaxed text-text">{item.text}</p>}
            </li>
          );
        })}
      </ul>

      {(books.length > 0 || nowLearning.length > 0) && (
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          {books.length > 0 && (
            <div>
              <h3>
                <Mono>Bookshelf</Mono>
              </h3>
              <ul className="mt-4 flex flex-wrap items-end gap-1.5 border-b border-border pb-px">
                {books.slice(0, 5).map((book, i) => {
                  const s = spines[i % spines.length]!;
                  return (
                    <li
                      key={book.title}
                      title={`${book.title} by ${book.author}`}
                      className={`lift relative shrink-0 rounded-t-md border border-border ${tintBg[s.tint]}`}
                      style={{ height: s.h, width: s.w }}
                    >
                      {/* Horizontal text sized to the spine, turned 90°. */}
                      <span
                        className="absolute left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2 rotate-90 text-center"
                        style={{ width: s.h - 32 }}
                      >
                        <span className="block truncate font-heading text-[13px] font-semibold leading-tight text-text">
                          {book.title}
                        </span>
                        <span className="sr-only"> by </span>
                        <span className="block truncate font-mono text-[11px] leading-tight text-text">
                          {book.author}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {nowLearning.length > 0 && (
            <div>
              <h3>
                <Mono>Now learning</Mono>
              </h3>
              <ol className="mt-4 divide-y divide-border border-y border-border">
                {nowLearning.map((entry) => (
                  <li key={`${entry.date}-${entry.text}`} className="flex gap-4 py-3 text-[15px] text-text">
                    <time dateTime={entry.date} className="w-20 shrink-0 font-mono text-[13px] text-muted">
                      {formatMonth(entry.date)}
                    </time>
                    {entry.text}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )}

      {gallery.length > 0 && (
        <div className="mt-10">
          <h3>
            <Mono>Made by hand</Mono>
          </h3>
          <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {gallery.slice(0, 3).map((img) => (
              <li key={img.src}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  sizes="(min-width: 1040px) 330px, 50vw"
                  className="aspect-square h-auto w-full rounded-[14px] border border-border object-cover"
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
}
