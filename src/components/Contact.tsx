import { contact, links, profile } from "@/data/site";
import { ExternalLink } from "./ExternalLink";
import { Row, Section } from "./Layout";

export function Contact() {
  return (
    <Section id="contact" title="Contact" className="pb-20 pt-14">
      <Row>
        <p className="text-lg">
          {contact.sentence}{" "}
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
