/**
 * Simple 1.5px-stroke line icons. All decorative (aria-hidden); every control
 * that uses one also has a text label or aria-label.
 */

type IconProps = { className?: string };

function Svg({ className = "h-5 w-5", children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {children}
    </svg>
  );
}

export const MonitorIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <path d="M8 20h8M12 16v4" />
  </Svg>
);

export const SunIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </Svg>
);

export const MoonIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />
  </Svg>
);

export const MenuIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Svg>
);

export const CloseIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Svg>
);

export const ArrowUpRightIcon = ({ className = "h-4 w-4" }: IconProps) => (
  <Svg className={className}>
    <path d="M7 17L17 7M8 7h9v9" />
  </Svg>
);

/* Off the clock */

export const DanceIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="4.5" r="1.8" />
    <path d="M12 7.5l-1.5 6 3.5 3-1 5M10.5 13.5L7 20.5M11.5 9l4.5-2M11.5 9.5L7 8" />
    {/* motion lines */}
    <path d="M18.5 11.5h3M18 14.5h2.5M2.5 12.5h2.5" />
  </Svg>
);

export const BrushIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M19.5 3.5l-9 9" />
    <path d="M10.5 12.5c-2.2-.4-4.3 1-4.6 3.4-.2 1.6-.8 2.9-2.4 3.6 3.3 1 7.6.4 8.3-3.2.3-1.5-.2-3-1.3-3.8Z" />
  </Svg>
);

export const BookIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 6.5C10 5 7.2 4.5 4 5v13c3.2-.5 6 0 8 1.5 2-1.5 4.8-2 8-1.5V5c-3.2-.5-6 0-8 1.5Z" />
    <path d="M12 6.5v13" />
  </Svg>
);

export const GamesIcon = (p: IconProps) => (
  <Svg {...p}>
    {/* small VR headset */}
    <path d="M8.5 3.5h7a1.5 1.5 0 0 1 1.5 1.5v1.5a1.5 1.5 0 0 1-1.5 1.5h-2l-1.5-1.2L10.5 8h-2A1.5 1.5 0 0 1 7 6.5V5a1.5 1.5 0 0 1 1.5-1.5Z" />
    {/* controller */}
    <path d="M7.5 11h9a4 4 0 0 1 3.9 3.1l.8 3.6a2 2 0 0 1-3.5 1.7L16 17.5H8l-1.7 1.9a2 2 0 0 1-3.5-1.7l.8-3.6A4 4 0 0 1 7.5 11Z" />
    <path d="M8 13v3M6.5 14.5h3M15.5 14h.01M17.5 15.5h.01" />
  </Svg>
);
