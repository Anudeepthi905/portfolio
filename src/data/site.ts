/**
 * ALL site content lives in this file. Components only render from here.
 * Source of truth: content/resume.md (and content/about-me.md once it exists).
 *
 * Search for "TODO" to find what still needs your input. Optional fields
 * that are left undefined simply don't render, so the live site never shows
 * a TODO.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type Link = {
  label: string;
  href: string;
};

/** Pastel tint names (defined as CSS variables in globals.css). */
export type Tint = "mint" | "peach" | "sky" | "butter" | "rose";

export type Profile = {
  name: string;
  /** Full role line (used in metadata and the OG image). */
  role: string;
  /** Short mono label above the name. */
  label: string;
  /** Optional "Currently: …" line in the intro. Hidden when undefined. */
  currently?: string;
  /** Two or three short first-person sentences. Each string is a paragraph. */
  about: string[];
  /** Optional: interests line under the intro. Hidden when undefined. */
  interests?: string;
  email: string;
  /** Path to the resume PDF inside /public. */
  resumePath: string;
};

export type Role = {
  title: string;
  company: string;
  /** Start month as YYYY-MM, e.g. "2025-05" (shown as "May 2025"). */
  start: string;
  /** End month as YYYY-MM. Omit for a current role ("Present"). */
  end?: string;
  bullets: string[];
};

export type ProjectImage = {
  /** Path inside /public, e.g. "/images/health-companion.png". */
  src: string;
  /** Describe what the screenshot shows. */
  alt: string;
  width: number;
  height: number;
};

export type Project = {
  title: string;
  /** Short label for the left margin, e.g. "IgniteLabs 2026". */
  label: string;
  /** One line of context under the title. */
  context: string;
  /** Optional award, shown after the context with a small star. */
  award?: string;
  /** The write-up, in this order. Keep the four together under 90 words. */
  problem: string;
  built: string;
  decision?: string;
  differently?: string;
  /** Rendered as plain comma-separated text. */
  tech: string[];
  /** Only links that actually exist. */
  links: Link[];
  /** Real screenshot only. Leave undefined for no image. */
  image?: ProjectImage;
};

export type ClientSite = {
  name: string;
  /** e.g. "Webflow", "Wix". */
  platform?: string;
  /** Public live URL. */
  url?: string;
  /**
   * Set to true only once you've confirmed you're allowed to show this site.
   * A site renders only when it has a url AND approved: true.
   */
  approved: boolean;
};

export type Publication = {
  title: string;
  role: string;
  venue: string;
  year: number;
  doi: string;
};

export type SkillGroup = {
  name: string;
  /** Pastel tint for this group's chips. */
  tint: Tint;
  items: string[];
  note?: string;
};

export type SiteLinks = {
  github: string;
  linkedin: string;
  email: string;
  /** Link to this website's own GitHub repo, shown in the footer. */
  sourceRepo?: string;
};

// ---------------------------------------------------------------------------
// Site URL (used for metadata, sitemap, robots, Open Graph)
// ---------------------------------------------------------------------------

/**
 * The ONE place the site's address is set. metadataBase, the canonical URL,
 * Open Graph/Twitter URLs, sitemap.xml and robots.txt all read from this.
 * No trailing slash.
 *
 * TODO: replace with your new domain once it's connected in Vercel,
 * e.g. "https://anudeepthi.dev".
 */
export const SITE_URL = "https://portfolio-anu-deepthi.vercel.app";

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

export const profile: Profile = {
  name: "Anu Deepthi Kambalapally",
  role: "Software Engineer · Hyderabad",
  label: "Software Engineer · Hyderabad",
  // From the resume: "currently building a Bazaarvoice integration".
  currently: "building a Bazaarvoice integration",
  // TODO: rewrite in your own words (drafted from the resume).
  about: [
    "I'm a software engineer. I've built 18 client and company websites since January 2025, on everything from Next.js to Wix, and I write the Playwright tests that check releases.",
    "I studied computer science (data science) at G. Narayanamma Institute of Technology and Science, 2020–2024.",
  ],
  interests: "Outside work: books, art and craft, dance, and games.",
  email: "anudeepthi905@gmail.com",
  resumePath: "/Anu_Deepthi_Resume.pdf",
};

export const links: SiteLinks = {
  github: "https://github.com/Anudeepthi905",
  linkedin: "https://www.linkedin.com/in/anu-deepthi",
  email: `mailto:${profile.email}`,
  sourceRepo: "https://github.com/Anudeepthi905/portfolio",
};

export const projects: Project[] = [
  {
    title: "AI Health Companion",
    label: "IgniteLabs 2026",
    // TODO: add your team name if you want it shown.
    context: "Five-person team, IgniteLabs 2026 company AI hackathon.",
    award: "Won Best AI Workflow",
    problem:
      "We had two weeks to build a wellness app with 14 self-guided modules that work with only a camera and microphone.",
    // TODO: name the specific modules or pieces you owned.
    built:
      "I developed and debugged the assessment features. I later presented the app's AI design at a company-wide knowledge session.",
    // TODO: add one sentence on why the team chose this.
    decision:
      "Every model response is checked against a schema, and a guardrail keeps results non-diagnostic.",
    // TODO: what you'd do differently.
    differently: undefined,
    tech: ["Next.js", "NestJS", "PostgreSQL", "MediaPipe", "Claude API"],
    // TODO: add a demo or repo link if one is public.
    links: [],
    // TODO: add a real screenshot in public/images/ and fill this in.
    image: undefined,
  },
  {
    title: "Crop Yield Prediction",
    label: "SETSCI 2024",
    context: "Academic project, published in SETSCI Vol. 17 (2024).",
    problem:
      "Predict crop yield for three Telangana districts from soil nutrient and climate data.",
    // TODO: confirm this was your part rather than the whole team's.
    built:
      "I compared Random Forest, Gradient Boosting and Support Vector Regression, scoring each with MSE, RMSE and R².",
    // TODO: which model did best, and why you trusted that result.
    decision: undefined,
    // TODO: what you'd do differently.
    differently: undefined,
    // TODO: add the language and libraries (e.g. Python, scikit-learn) if you used them.
    tech: ["Random Forest", "Gradient Boosting", "SVR"],
    links: [{ label: "Paper (DOI)", href: "https://doi.org/10.36287/setsci.17.1.0040" }],
    image: undefined,
  },
  {
    title: "Multilingual Image Captioning",
    label: "Academic",
    context: "Academic project, “Multilingual Visual Description and Captioning for Accessibility”.",
    problem:
      "Give people with visual or hearing impairments image descriptions they can read or hear, in more than one language.",
    // TODO: your part, if this was a team project.
    built:
      "An InceptionV3 encoder paired with an attention-based decoder writes the caption. The system then translates it and reads it aloud.",
    // TODO: one decision and why (e.g. why InceptionV3, or why attention).
    decision: undefined,
    // TODO: what you'd do differently.
    differently: undefined,
    // TODO: add the frameworks you used.
    tech: ["InceptionV3", "attention decoder", "translation", "text-to-speech"],
    // TODO: add a repo or demo link if one is public.
    links: [],
    image: undefined,
  },
  {
    title: "Driver Drowsiness Detection",
    label: "Academic",
    context: "Academic project.",
    problem: "Notice in real time when a driver's eyes stay closed, and warn them.",
    built: "OpenCV reads the live video, Dlib tracks eye state, and an alarm sounds.",
    // TODO: add why (e.g. so normal blinks don't trigger it) and the threshold you used.
    decision:
      "The alarm fires only after the eyes stay closed for a set number of frames.",
    // TODO: what you'd do differently.
    differently: undefined,
    tech: ["OpenCV", "Dlib"],
    // TODO: add a repo or demo link if one is public.
    links: [],
    image: undefined,
  },
  // TODO (future): RAG project. Uncomment and fill in when it's ready.
  // {
  //   title: "",
  //   label: "",
  //   context: "",
  //   problem: "",
  //   built: "",
  //   decision: "",
  //   differently: "",
  //   tech: [],
  //   links: [],
  // },
];

export const experience: Role[] = [
  {
    title: "Software Engineer",
    company: "Enspirit",
    start: "2025-05",
    bullets: [
      "Built 18 client and company websites since Jan 2025 on Webflow, Next.js, WordPress, Squarespace, Wix, and Hostinger, including JP+, Encore, AHM, Rally Nation, the company site, and IGC (ongoing).",
      "Integrated SendGrid transactional email into the JP+ platform, keeping the API key server-side.",
      "Automated end-to-end tests with Playwright and an in-house AI release-validation platform (AURA) for the Empath and JP+ projects.",
      "Audited four production codebases with AI-assisted analysis, documenting stack, auth, database, CI/CD, and testing, and verifying every finding against the source files.",
      "Mentored two interns; currently building a Bazaarvoice integration.",
    ],
  },
  {
    title: "Software Engineer Intern",
    company: "Enspirit",
    start: "2025-01",
    end: "2025-05",
    bullets: [
      "Built and tested CRUD operations in Node.js against PostgreSQL and MongoDB for Blue Ribbon.",
      "Ran functional API tests in Postman and load tests in JMeter to validate the Blue Ribbon backend.",
      "Built Wix and Squarespace sites for Paramount Tea, Empath Travel, UGO University, and Cocoacumin.",
    ],
  },
];

/**
 * "Sites I've worked on". Names are from the resume. Nothing renders until a
 * site has a url AND approved: true; the whole list is hidden while none do.
 *
 * TODO: for each site your employer lets you show, add platform + live URL and set
 * approved: true. Delete the ones you can't show.
 */
export const clientSites: ClientSite[] = [
  { name: "JP+", approved: false }, // TODO: platform, url, permission
  { name: "Encore", approved: false }, // TODO: platform, url, permission
  { name: "AHM", approved: false }, // TODO: platform, url, permission
  { name: "Rally Nation", approved: false }, // TODO: platform, url, permission
  { name: "Company website", approved: false }, // TODO: platform, url, permission
  { name: "IGC", approved: false }, // TODO: platform, url, permission (in progress per resume)
  { name: "Paramount Tea", approved: false }, // TODO: Wix or Squarespace? url, permission
  { name: "Empath Travel", approved: false }, // TODO: Wix or Squarespace? url, permission
  { name: "UGO University", approved: false }, // TODO: Wix or Squarespace? url, permission
  { name: "Cocoacumin", approved: false }, // TODO: Wix or Squarespace? url, permission
];

export const publications: Publication[] = [
  {
    title: "Crop Yield Prediction Using Machine Learning Algorithms",
    role: "Co-author",
    venue:
      "Proceedings of the Cognitive Models and Artificial Intelligence Conference (SETSCI), Vol. 17",
    year: 2024,
    doi: "10.36287/setsci.17.1.0040",
  },
];

export const awards: string[] = [
  "Consistency Award and Punctuality Pro Award at work; Growth Hackers team, Elevate Season One.",
  "2nd position, Major Project Expo, G. Narayanamma Institute of Technology and Science.",
  "Merit Certificate, MEGATHON 2022, E-Cell IIIT Hyderabad.",
  "30 Days of Google Cloud (2021): Cloud Engineering and Data Science & Machine Learning tracks.",
  "EPAM UpSkill India, EPAM Systems.",
];

export const skills: SkillGroup[] = [
  {
    name: "Technical",
    tint: "sky",
    items: [
      "Node.js", "Next.js", "React", "REST APIs", "PostgreSQL", "MongoDB", "MySQL",
      "Playwright", "Postman", "JMeter", "OpenCV", "MediaPipe", "LLM APIs (Claude)",
      "Git", "GitHub", "Google Cloud",
    ],
  },
  {
    name: "Languages",
    tint: "mint",
    items: ["TypeScript", "JavaScript", "Python", "SQL", "HTML", "CSS"],
  },
  {
    name: "Platforms & tools",
    tint: "peach",
    items: [
      "Webflow", "WordPress", "Squarespace", "Wix", "Hostinger", "SendGrid", "Jira",
      "Claude Code", "Cursor", "ChatGPT", "Gemini",
    ],
    // Same wording as the resume.
    note: "AI-assisted development, with code review and testing",
  },
];

export type WorkStep = {
  title: string;
  text: string;
};

/**
 * "How I work" section.
 * TODO: rewrite the intro and steps in your own voice (keep it under ~90 words).
 */
export const howIWork: { intro: string; steps: WorkStep[] } = {
  intro: "I use AI tools to move faster. I'm still responsible for everything that ships.",
  steps: [
    {
      title: "Plan",
      text: "I work out the approach myself before any code gets written.",
    },
    {
      title: "Build with AI",
      text: "Claude Code, Cursor, ChatGPT and Gemini help me write and refactor faster.",
    },
    {
      title: "Review",
      text: "I read every change before it ships, so I understand the code I'm responsible for.",
    },
    {
      title: "Test",
      text: "Playwright for end-to-end flows, Postman for APIs, JMeter for load. When something breaks, I debug it until I know why.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Off the clock
// Source: content/about-me.md. Use only what's written there. Anything left
// undefined or empty is hidden on the site.
// ---------------------------------------------------------------------------

export type InterestKey = "books" | "art" | "dance" | "games";

export type Interest = {
  /** Picks the icon. */
  key: InterestKey;
  label: string;
  /** Pastel tint for this tile. */
  tint: Tint;
  /** One sentence from about-me.md. Hidden when undefined. */
  text?: string;
};

export type Book = {
  title: string;
  author: string;
};

export type LearningEntry = {
  /** YYYY-MM, shown as "Nov 2026". */
  date: string;
  text: string;
};

export type ArtImage = {
  /** Path inside /public, e.g. "/images/art/art-1.jpg". */
  src: string;
  /** Description from about-me.md. */
  alt: string;
  width: number;
  height: number;
};

export const offTheClock: {
  intro?: string;
  interests: Interest[];
  books: Book[];
  nowLearning: LearningEntry[];
  gallery: ArtImage[];
} = {
  // Keep in sync with content/about-me.md.
  intro:
    "Books, VR or the real world: I like stepping into different worlds, and each one makes me curious to know more.",
  interests: [
    {
      key: "books",
      label: "Books",
      tint: "butter",
      text: "I read regularly because I enjoy different points of view and the worlds a good book builds.",
    },
    {
      key: "art",
      label: "Art & craft",
      tint: "peach",
      text: "I paint and make things by hand when I get the time.",
    },
    {
      key: "dance",
      label: "Dance",
      tint: "rose",
      text: "I performed on stage through school and college, choreographed our pieces and led the dance team.",
    },
    {
      key: "games",
      label: "Games & VR",
      tint: "sky",
      text: "I play on PlayStation and in VR. I love being inside VR worlds and I'm curious about how they're built.",
    },
  ],
  // TODO: 3–5 books from about-me.md, e.g. { title: "…", author: "…" }.
  // The bookshelf is hidden while this is empty.
  books: [],
  // TODO: newest first, e.g. { date: "2026-11", text: "…" }.
  // Hidden while empty.
  nowLearning: [],
  // TODO (optional): 2–3 photos in public/images/art/ with alt text from
  // about-me.md. Hidden while empty. Never use placeholders.
  gallery: [],
};

export const contact = {
  heading: "Say hello",
  sentence: "Email is the quickest way to reach me.",
};

export const seo = {
  title: `${profile.name} — Software Engineer`,
  description:
    "Anu Deepthi Kambalapally is a software engineer in Hyderabad. Projects, experience, a published paper, and contact details.",
};
