import { contact, links, profile } from "@/data/site";
import { ExternalLink } from "./ExternalLink";
import { ArrowUpRightIcon } from "./Icons";
import { Section } from "./Section";

const profileLink = "inline-flex min-h-11 items-center gap-1 text-[15px] font-medium text-accent-strong";

export function Contact() {
  return (
    <Section id="contact" num={7} title={contact.heading} center>
      <p className="mx-auto max-w-[680px] text-lg text-text">{contact.sentence}</p>
      <p className="mt-4">
        <a
          href={links.email}
          className="link font-heading text-[clamp(1.25rem,1rem+1.6vw,2rem)] font-semibold tracking-tight"
        >
          {profile.email}
        </a>
      </p>
      <ul className="mt-6 flex justify-center gap-6">
        <li>
          <ExternalLink href={links.github} className={profileLink}>
            <span className="link">GitHub</span>
            <span className="nudge inline-flex">
              <ArrowUpRightIcon />
            </span>
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href={links.linkedin} className={profileLink}>
            <span className="link">LinkedIn</span>
            <span className="nudge inline-flex">
              <ArrowUpRightIcon />
            </span>
          </ExternalLink>
        </li>
      </ul>
    </Section>
  );
}
