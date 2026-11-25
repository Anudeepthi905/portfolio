import { clientSites, experience } from "@/data/site";
import { formatMonth } from "@/lib/format";
import { ExternalLink } from "./ExternalLink";
import { ArrowUpRightIcon } from "./Icons";
import { Section } from "./Section";

export function Experience() {
  // A site shows only once it has a public URL and you've approved it.
  const sites = clientSites.filter(
    (site): site is typeof site & { url: string } => site.approved && Boolean(site.url),
  );

  return (
    <Section id="experience" num={2} title="Experience">
      <ol>
        {experience.map((role, i) => (
          <li
            key={`${role.title}-${role.start}`}
            className="relative grid md:grid-cols-[9.5rem_minmax(0,1fr)] md:gap-x-10"
          >
            {/* Timeline line + dot: at the left edge on mobile, between columns on desktop. */}
            <span
              aria-hidden="true"
              className={`absolute bottom-0 left-[4px] top-2 w-px bg-border md:left-[calc(9.5rem+2.5rem+4px)] ${
                i === experience.length - 1 ? "hidden" : ""
              }`}
            />
            <span
              aria-hidden="true"
              className="absolute left-0 top-[0.45rem] h-[9px] w-[9px] rounded-full bg-accent ring-4 ring-bg md:left-[calc(9.5rem+2.5rem)]"
            />

            <p className="pl-7 font-mono text-[13px] text-muted md:pl-0 md:pt-0.5 md:text-right">
              <time dateTime={role.start}>{formatMonth(role.start)}</time>
              {" – "}
              {role.end ? <time dateTime={role.end}>{formatMonth(role.end)}</time> : "Present"}
            </p>

            <div className="pb-12 pl-7 md:pl-8">
              <h3 className="mt-1 font-heading text-lg font-semibold tracking-tight text-text md:mt-0">
                {role.title}
                <span className="font-normal text-muted"> · {role.company}</span>
              </h3>
              <ul className="mt-4 max-w-[680px] space-y-2.5 text-[15.5px] text-text">
                {role.bullets.map((bullet) => (
                  <li key={bullet} className="relative pl-4">
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-[0.7em] h-1 w-1 rounded-full bg-muted"
                    />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>

      {sites.length > 0 && (
        <div className="mt-6 md:pl-[calc(9.5rem+2.5rem+2rem)]">
          <h3 className="font-heading text-lg font-semibold">Client sites</h3>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            {sites.map((site) => (
              <li key={site.name}>
                <ExternalLink
                  href={site.url}
                  className="inline-flex min-h-11 items-center gap-1 text-accent-strong"
                >
                  <span className="link">{site.name}</span>
                  <span className="nudge inline-flex">
                    <ArrowUpRightIcon />
                  </span>
                </ExternalLink>
                {site.platform && (
                  <span className="font-mono text-[13px] text-muted"> · {site.platform}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
}
