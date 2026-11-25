import { awards, publications } from "@/data/site";
import { ExternalLink } from "./ExternalLink";
import { ArrowUpRightIcon } from "./Icons";
import { Mono, Section } from "./Section";

export function Writing() {
  return (
    <Section id="writing" num={4} title="Writing & awards">
      <h3 className="sr-only">Publications</h3>
      <ul className="space-y-4">
        {publications.map((pub) => (
          <li key={pub.doi}>
            <article className="rounded-[14px] border border-border bg-surface-alt p-6 sm:p-7">
              <Mono>
                {pub.year} · {pub.role}
              </Mono>
              <p className="mt-2 max-w-[680px] font-heading text-xl font-semibold tracking-tight text-text">
                {pub.title}
              </p>
              <p className="mt-2 max-w-[680px] text-[15px] text-muted">
                {pub.venue}, {pub.year}.
              </p>
              <ExternalLink
                href={`https://doi.org/${pub.doi}`}
                className="mt-3 inline-flex min-h-11 items-center gap-1 font-medium text-accent-strong"
              >
                <span className="link">DOI</span>
                <span className="nudge inline-flex">
                  <ArrowUpRightIcon />
                </span>
                <span className="ml-2 font-mono text-[13px] font-normal text-muted">{pub.doi}</span>
              </ExternalLink>
            </article>
          </li>
        ))}
      </ul>

      <h3 className="mt-12 font-heading text-lg font-semibold tracking-tight text-text">
        Awards & certifications
      </h3>
      <ul className="mt-3 max-w-[680px] divide-y divide-border border-y border-border">
        {awards.map((award) => (
          <li key={award} className="py-3 text-[15.5px] text-text">
            {award}
          </li>
        ))}
      </ul>
    </Section>
  );
}
