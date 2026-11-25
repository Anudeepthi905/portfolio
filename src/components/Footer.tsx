import { links } from "@/data/site";
import { ExternalLink } from "./ExternalLink";

export function Footer() {
  // Evaluated at build time, so it shows the date of the last deploy.
  const now = new Date();
  const updated = now.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <footer className="border-t border-border py-8 font-mono text-[12.5px] text-muted">
      <p className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-2">
        <span>© {now.getFullYear()}</span>
        <span aria-hidden="true" className="hidden sm:inline">·</span>
        <span>Designed and built by Kambalapally Anu Deepthi</span>
        {links.sourceRepo && (
          <>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <ExternalLink href={links.sourceRepo} className="link inline-flex min-h-11 items-center self-start sm:min-h-0">
              Source on GitHub
            </ExternalLink>
          </>
        )}
        <span aria-hidden="true" className="hidden sm:inline">·</span>
        <span>
          Last updated <time dateTime={now.toISOString().slice(0, 10)}>{updated}</time>
        </span>
      </p>
    </footer>
  );
}
