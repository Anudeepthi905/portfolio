import { clientSites, experience } from "@/data/site";
import { formatMonth } from "@/lib/format";
import { ExternalLink } from "./ExternalLink";
import { Row, Section } from "./Layout";

export function Experience() {
  // A site shows only once it has a public URL and you've approved it.
  const sites = clientSites.filter(
    (site): site is typeof site & { url: string } => site.approved && Boolean(site.url),
  );

  return (
    <Section id="experience" title="Experience" className="pb-16 pt-2">
      <ol className="space-y-10">
        {experience.map((role) => (
          <li key={`${role.title}-${role.start}`}>
            <Row
              margin={
                <>
                  <time dateTime={role.start}>{formatMonth(role.start)}</time>
                  {" – "}
                  {role.end ? <time dateTime={role.end}>{formatMonth(role.end)}</time> : "Present"}
                </>
              }
            >
              <h3 className="font-medium">
                {role.title}, {role.company}
              </h3>
              <ul className="mt-3 space-y-2 text-[0.95rem]">
                {role.bullets.map((bullet) => (
                  <li key={bullet} className="relative pl-4">
                    <span aria-hidden="true" className="absolute left-0 top-[0.8em] h-px w-2 bg-accent" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </Row>
          </li>
        ))}
      </ol>

      {sites.length > 0 && (
        <Row className="mt-12" margin="Live sites">
          <h3 className="font-medium">Sites I&apos;ve worked on</h3>
          <ul className="mt-3 space-y-1.5">
            {sites.map((site) => (
              <li key={site.name}>
                <ExternalLink href={site.url} className="link">
                  {site.name}
                </ExternalLink>
                {site.platform && <span className="text-muted"> · {site.platform}</span>}
              </li>
            ))}
          </ul>
        </Row>
      )}
    </Section>
  );
}
