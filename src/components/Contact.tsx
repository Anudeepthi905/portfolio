import { contact, links, profile } from "@/data/site";
import { PaperPlane } from "./Doodles";
import { ExternalLink } from "./ExternalLink";
import { Row, Section } from "./Layout";

export function Contact() {
  return (
    <Section
      id="contact"
      title="Contact"
      doodle={<PaperPlane className="h-6 w-9" />}
      className="pb-20 pt-2"
    >
      <Row>
        <p className="text-lg">{contact.sentence}</p>
        <p className="mt-3 text-lg">
          <a href={links.email} className="link">
            {profile.email}
          </a>
        </p>
        <p className="mt-3 text-muted">
          Also on{" "}
          <ExternalLink href={links.linkedin} className="link">
            LinkedIn
          </ExternalLink>{" "}
          and{" "}
          <ExternalLink href={links.github} className="link">
            GitHub
          </ExternalLink>
          .
        </p>
      </Row>
    </Section>
  );
}
