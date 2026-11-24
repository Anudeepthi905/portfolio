import { awards, publications } from "@/data/site";
import { ExternalLink } from "./ExternalLink";
import { Row, Section } from "./Layout";

export function Writing() {
  return (
    <Section id="writing" title="Writing & awards" className="pb-16 pt-2">
      <h3 className="sr-only">Publications</h3>
      <div className="space-y-6">
        {publications.map((pub) => (
          <Row key={pub.doi} margin={pub.year}>
            <p className="font-serif text-lg italic">{pub.title}</p>
            <p className="mt-1 text-[0.95rem] text-muted">
              {pub.role}. {pub.venue}, {pub.year}.
            </p>
            <p className="mt-1 text-sm">
              <ExternalLink href={`https://doi.org/${pub.doi}`} className="link">
                doi:{pub.doi}
              </ExternalLink>
            </p>
          </Row>
        ))}
      </div>

      <Row className="mt-10" margin="Awards">
        <h3 className="sr-only">Awards</h3>
        <ul className="space-y-1.5 text-[0.95rem]">
          {awards.map((award) => (
            <li key={award}>{award}</li>
          ))}
        </ul>
      </Row>
    </Section>
  );
}
