import Image from "next/image";
import { projects, type Project } from "@/data/site";
import { ExternalLink } from "./ExternalLink";
import { ArrowUpRightIcon } from "./Icons";
import { Mono, Section } from "./Section";

const parts: { key: "problem" | "built" | "decision" | "differently"; label: string }[] = [
  { key: "problem", label: "Problem" },
  { key: "built", label: "What was built" },
  { key: "decision", label: "One decision" },
  { key: "differently", label: "Next time" },
];

function WriteUp({ project }: { project: Project }) {
  return (
    <dl className="space-y-4">
      {parts.map(({ key, label }) => {
        const text = project[key];
        if (!text) return null;
        return (
          <div key={key}>
            <dt>
              <Mono>{label}</Mono>
            </dt>
            <dd className="mt-0.5 text-[15.5px] leading-relaxed text-text">{text}</dd>
          </div>
        );
      })}
    </dl>
  );
}

function Meta({ project }: { project: Project }) {
  // "Try it" first when a live URL is set; links without a URL never render.
  const allLinks = [
    ...(project.liveUrl ? [{ label: "Try it", href: project.liveUrl }] : []),
    ...project.links,
  ].filter((link) => link.href);

  return (
    <>
      <p className="mt-5 font-mono text-[13px] leading-relaxed text-muted">
        <span className="sr-only">Tech: </span>
        {project.tech.join(" · ")}
      </p>
      {allLinks.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          {allLinks.map((link) => (
            <li key={link.href}>
              <ExternalLink
                href={link.href}
                aria-label={`${link.label}: ${project.title} (opens in a new tab)`}
                className="inline-flex min-h-11 items-center gap-1 text-[15px] font-medium text-accent-strong"
              >
                <span className="link">{link.label}</span>
                <span className="nudge inline-flex">
                  <ArrowUpRightIcon />
                </span>
              </ExternalLink>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function Header({ project }: { project: Project }) {
  return (
    <>
      <p className="flex flex-wrap items-center gap-2">
        <Mono>{project.label}</Mono>
        {project.award && (
          <span className="rounded-full bg-butter px-2.5 py-0.5 font-mono text-[12px] text-text">
            {project.award}
          </span>
        )}
      </p>
      <h3 className="mt-3 font-heading text-xl font-semibold tracking-tight text-text sm:text-2xl">
        {project.title}
      </h3>
      <p className="mt-1 text-[15px] text-muted">{project.context}</p>
    </>
  );
}

function Shot({ project }: { project: Project }) {
  if (!project.image) return null;
  return (
    <Image
      src={project.image.src}
      alt={project.image.alt}
      width={project.image.width}
      height={project.image.height}
      sizes="(min-width: 1040px) 1000px, 100vw"
      className="mt-6 h-auto w-full rounded-[10px] border border-border"
    />
  );
}

const card =
  "lift h-full rounded-[14px] border border-border bg-surface p-6 hover:border-accent/60 sm:p-7";

export function Work() {
  const [featured, ...rest] = projects;
  return (
    <Section id="work" num={1} title="Work">
      <ul className="grid gap-5 md:grid-cols-2">
        {featured && (
          <li className="md:col-span-2">
            <article className={card}>
              <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]">
                <div>
                  <Header project={featured} />
                  <Meta project={featured} />
                </div>
                <WriteUp project={featured} />
              </div>
              <Shot project={featured} />
            </article>
          </li>
        )}
        {rest.map((project) => (
          <li key={project.title}>
            <article className={`${card} flex flex-col`}>
              <Header project={project} />
              <div className="mt-5">
                <WriteUp project={project} />
              </div>
              <Shot project={project} />
              <div className="mt-auto">
                <Meta project={project} />
              </div>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}
