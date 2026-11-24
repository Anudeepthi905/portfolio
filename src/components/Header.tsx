import { Row } from "./Layout";

const nav = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#how-i-work", label: "How I work" },
  { href: "#writing", label: "Writing & Awards" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="pb-4 pt-8">
      <Row>
        <nav aria-label="Sections">
          <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="underline-offset-4 hover:text-accent hover:underline"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Row>
    </header>
  );
}
