import Image from "next/image";
import { projects, type Project } from "@/data/site";
import { Star } from "./Doodles";
import { ExternalLink } from "./ExternalLink";
import { Row, Section } from "./Layout";

const parts: { key: "problem" | "built" | "decision" | "differently"; label: string }[] = [
  { key: "problem", label: "The problem." },
  { key: "built", label: "What I built." },
  { key: "decision", label: "One decision." },
  { key: "differently", label: "Next time." },
];

function ProjectEntry({ project }: { project: Project }) {
  return (
    <article>
      <Row margin={project.label}>
        <h3 className="font-serif text-xl font-medium tracking-tight">{project.title}</h3>
        <p className="mt-0.5 text-sm text-muted">
          {project.context}
          {project.award && (
            <span className="wiggle-parent ml-1 inline-flex items-center gap-1 whitespace-nowrap font-medium text-fg">
              <Star className="h-4 w-4" />
              {project.award}.
            </span>
          )}
        </p>

        {project.image && (
          <Image
            src={project.image.src}
            alt={project.image.alt}
            width={project.image.width}
            height={project.image.height}
            sizes="(min-width: 768px) 680px, 100vw"
            className="mt-5 h-auto w-full rounded-xl border border-rule"
          />
        )}

        <div className="mt-4 space-y-3">
          {parts.map(({ key, label }) => {
            const text = project[key];
            if (!text) return null;
            return (
              <p key={key}>
                <span className="font-medium">{label}</span> {text}
              </p>
            );
          })}
        </div>

        <p className="mt-4 text-sm text-muted">
          <span className="sr-only">Tech: </span>
          {project.tech.join(", ")}
        </p>

        {project.links.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-x-5 text-sm">
            {project.links.map((link) => (
              <li key={link.href}>
                <ExternalLink href={link.href} className="link">
                  {link.label}
                </ExternalLink>
              </li>
            ))}
          </ul>
        )}
      </Row>
    </article>
  );
}

export function Work() {
  return (
    <Section id="work" title="Selected work" className="pb-20 pt-2">
      <div className="space-y-14">
        {projects.map((project) => (
          <ProjectEntry key={project.title} project={project} />
        ))}
      </div>
    </Section>
  );
}
