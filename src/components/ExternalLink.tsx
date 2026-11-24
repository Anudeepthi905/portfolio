import type { ComponentPropsWithoutRef } from "react";

type Props = Omit<ComponentPropsWithoutRef<"a">, "target" | "rel"> & {
  href: string;
};

/** Opens in a new tab and tells screen-reader users that it does. */
export function ExternalLink({ children, ...props }: Props) {
  return (
    <a {...props} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
