import { links, profile } from "@/data/site";
import { ExternalLink } from "./ExternalLink";
import { Row } from "./Layout";

export function Intro() {
  return (
    <section aria-labelledby="intro-heading" className="pb-16 pt-12 md:pb-20 md:pt-16">
      <Row>
        <h1
          id="intro-heading"
          className="font-serif text-4xl font-medium tracking-tight sm:text-[2.75rem] sm:leading-tight"
        >
          {profile.name}
        </h1>
        <p className="mt-2 text-muted">{profile.role}</p>

        <div className="mt-8 max-w-[36rem] space-y-4 text-lg">
          {profile.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {(profile.currentlyLearning || profile.interests) && (
          <div className="mt-5 space-y-1 text-muted">
            {profile.currentlyLearning && <p>{profile.currentlyLearning}</p>}
            {profile.interests && <p>{profile.interests}</p>}
          </div>
        )}

        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
          <li>
            <ExternalLink href={profile.resumePath} className="link">
              Resume (PDF)
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href={links.github} className="link">
              GitHub
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href={links.linkedin} className="link">
              LinkedIn
            </ExternalLink>
          </li>
          <li>
            <a href={links.email} className="link">
              Email
            </a>
          </li>
        </ul>
      </Row>
    </section>
  );
}
