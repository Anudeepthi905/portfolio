import { links } from "@/data/site";
import { ExternalLink } from "./ExternalLink";
import { Row } from "./Layout";

export function Footer() {
  // Evaluated at build time, so it shows the date of the last deploy.
  const now = new Date();
  const updated = now.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <footer className="border-t border-rule py-8 text-sm text-muted">
      <Row>
        <p>
          © {now.getFullYear()} · Designed and built by Anu Deepthi
          {links.sourceRepo && (
            <>
              {" · "}
              <ExternalLink href={links.sourceRepo} className="link">
                Source on GitHub
              </ExternalLink>
            </>
          )}
        </p>
        <p className="mt-1">
          Last updated <time dateTime={now.toISOString().slice(0, 10)}>{updated}</time>
        </p>
      </Row>
    </footer>
  );
}
