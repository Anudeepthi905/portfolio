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

export type Profile = {
  name: string;
  /** Line under the name. */
  role: string;
  /** Two or three short first-person sentences. Each string is a paragraph. */
  about: string[];
  /** Optional: "Currently learning …" line. Hidden when undefined. */
  currentlyLearning?: string;
  /** Optional: interests line. Hidden when undefined. */
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
 * 1. NEXT_PUBLIC_SITE_URL (set this in Vercel if you add a custom domain)
 * 2. VERCEL_PROJECT_PRODUCTION_URL (set automatically by Vercel)
 * 3. http://localhost:3000 for local development
 */
export const siteUrl: string =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

export const profile: Profile = {
  name: "Anu Deepthi Kambalapally",
  role: "Software Engineer at Enspirit, Hyderabad",
  // TODO: rewrite in your own words (drafted from the resume; there is no
  // content/about-me.md yet).
  about: [
    "I'm a software engineer at Enspirit. I've shipped 18 client and company websites there, on everything from Next.js to Wix, and I write the Playwright tests that check releases.",
    "I studied computer science (data science) at G. Narayanamma Institute of Technology and Science, 2020–2024.",
  ],
  // TODO: one line on what you're learning right now, e.g. "Currently learning …".
  currentlyLearning: undefined,
  // TODO: your interests, from about-me.md (e.g. art and craft, dancing).
  interests: undefined,
  email: "anudeepthi905@gmail.com",
  // TODO: add the PDF at public/Anu_Deepthi_Resume.pdf (link is broken until then).
  resumePath: "/Anu_Deepthi_Resume.pdf",
};

export const links: SiteLinks = {
  github: "https://github.com/Anudeepthi905",
  linkedin: "https://www.linkedin.com/in/anudeepthi",
  email: `mailto:${profile.email}`,
  // TODO: URL of this site's GitHub repo once you've pushed it.
  sourceRepo: undefined,
};

export const projects: Project[] = [
  {
    title: "AI Health Companion",
    label: "IgniteLabs 2026",
    // TODO: add your team name if you want it shown.
    context: "Five-person team, Enspirit IgniteLabs 2026. Won Best AI Workflow.",
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
      "Built and shipped 18 client and company websites across Webflow, Next.js, WordPress, Squarespace, Wix, and Hostinger, including JP+, Encore, AHM, GearLaunch, Safe Decisions, IGC, Family Tree, and the Enspirit website.",
      "Integrated SendGrid transactional email into the JP+ platform, keeping the API key server-side.",
      "Automated end-to-end tests with Playwright and Enspirit's AURA release-validation platform for the Empath and JP+ projects.",
      "Audited four production codebases with AI-assisted code analysis, documenting each one's stack, auth, database, CI/CD, and test setup, and verifying every finding against the source files.",
      "Guided two interns while delivering client work, and currently building the IGC site and a Bazaarvoice integration.",
    ],
  },
  {
    title: "Software Engineer Intern",
    company: "Enspirit",
    start: "2025-01",
    end: "2025-05",
    bullets: [
      "Built and tested CRUD operations in Node.js against PostgreSQL and MongoDB for the Blue Ribbon project.",
      "Ran functional API tests in Postman and load tests in JMeter to validate the Blue Ribbon backend.",
      "Built client sites on Wix and Squarespace, including Paramount Tea, Empath Travel, UGO University, and Cocoacumin.",
    ],
  },
];

/**
 * "Sites I've worked on". Names are from the resume. Nothing renders until a
 * site has a url AND approved: true; the whole list is hidden while none do.
 *
 * TODO: for each site Enspirit lets you show, add platform + live URL and set
 * approved: true. Delete the ones you can't show.
 */
export const clientSites: ClientSite[] = [
  { name: "JP+", approved: false }, // TODO: platform, url, permission
  { name: "Encore", approved: false }, // TODO: platform, url, permission
  { name: "AHM", approved: false }, // TODO: platform, url, permission
  { name: "GearLaunch", approved: false }, // TODO: platform, url, permission
  { name: "Safe Decisions", approved: false }, // TODO: platform, url, permission
  { name: "IGC", approved: false }, // TODO: platform, url, permission (still in progress per resume)
  { name: "Family Tree", approved: false }, // TODO: platform, url, permission
  { name: "Enspirit", approved: false }, // TODO: platform, url, permission
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
  "Consistency Award and Punctuality Pro Award at Enspirit; Growth Hackers team, Elevate Season One.",
  "2nd position, Major Project Expo, G. Narayanamma Institute of Technology and Science.",
  "Merit Certificate, MEGATHON 2022, E-Cell IIIT Hyderabad.",
  "30 Days of Google Cloud (2021): Cloud Engineering and Data Science & Machine Learning tracks.",
  "EPAM UpSkill India, EPAM Systems.",
];

export const skills: SkillGroup[] = [
  {
    name: "Technical Skills",
    items: [
      "Node.js", "Next.js", "React", "REST APIs", "PostgreSQL", "MongoDB", "MySQL",
      "Playwright", "Postman", "JMeter", "OpenCV", "Dlib", "MediaPipe", "CNNs",
      "Random Forest", "Gradient Boosting", "SVR", "LLM APIs", "Git", "GitHub",
      "Linux", "Google Cloud",
    ],
  },
  {
    name: "Programming Languages",
    items: ["TypeScript", "JavaScript", "Python", "SQL", "Java", "C", "R", "HTML", "CSS"],
  },
  {
    name: "Platforms and Tools",
    items: [
      "Webflow", "WordPress", "Squarespace", "Wix", "Hostinger", "SendGrid", "Jira",
      "Claude Code", "Cursor", "ChatGPT", "Gemini",
    ],
    note: "AI-assisted development with full code review and testing.",
  },
];

export const contact = {
  sentence: "Email is the best way to reach me.",
};

export const seo = {
  title: `${profile.name} — Software Engineer`,
  description:
    "Anu Deepthi Kambalapally is a software engineer at Enspirit in Hyderabad. Projects, experience, a published paper, and contact details.",
};
