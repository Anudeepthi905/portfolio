import { links, profile } from "@/data/site";
import { ExternalLink } from "./ExternalLink";
import { ArrowUpRightIcon } from "./Icons";

const quiet =
  "inline-flex h-11 items-center gap-1.5 rounded-full border border-border px-4 text-[15px] text-text transition-colors hover:border-accent hover:text-accent-strong";

export function Intro() {
  return (
    <section aria-labelledby="intro-heading" className="reveal pb-16 pt-14 sm:pb-24 sm:pt-24">
      <p className="font-mono text-[13px] text-muted">{profile.label}</p>
      <h1
        id="intro-heading"
        className="mt-4 font-heading text-name font-semibold text-text"
      >
        {profile.name}
      </h1>

      <div className="mt-6 max-w-[680px] space-y-4 text-lg text-text">
        {profile.about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        {profile.interests && <p className="text-base text-muted">{profile.interests}</p>}
      </div>

      <ul className="mt-8 flex flex-wrap gap-3">
        <li>
          <ExternalLink
            href={profile.resumePath}
            className="inline-flex h-11 items-center gap-1.5 rounded-full bg-primary px-5 text-[15px] font-medium text-on-primary transition-opacity hover:opacity-90"
          >
            Resume (PDF)
            <ArrowUpRightIcon />
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href={links.github} className={quiet}>
            GitHub
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href={links.linkedin} className={quiet}>
            LinkedIn
          </ExternalLink>
        </li>
        <li>
          <a href={links.email} className={quiet}>
            Email
          </a>
        </li>
      </ul>

      {profile.currently && (
        <p className="mt-8 flex items-center gap-2.5 text-[15px] text-muted">
          <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-accent" />
          <span>
            <span className="font-medium text-text">Currently:</span> {profile.currently}
          </span>
        </p>
      )}
    </section>
  );
}
