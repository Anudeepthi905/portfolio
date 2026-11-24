# anudeepthi portfolio

My personal website. One page: a short intro, selected projects, my experience at Enspirit, a published paper and awards, skills, and how to reach me.

It's a Next.js (App Router) site written in TypeScript and styled with Tailwind CSS. There's no backend, database, analytics or contact form. Every part of the page is a Server Component, so the browser gets plain HTML and CSS.

## Run it locally

You need Node.js 20.9 or newer (https://nodejs.org).

```bash
npm install
npm run dev
```

Open http://localhost:3000.

- `npm run build` makes a production build
- `npm start` serves that build
- `npm run lint` runs ESLint

## Edit the content

Everything on the page comes from one file: `src/data/site.ts`. The components only read from it.

- `profile`: name, the line under it, the intro paragraphs, and the optional "currently learning" and interests lines
- `links`: GitHub, LinkedIn, email, and this site's own repo (shown in the footer)
- `projects`: each one has a problem, what I built, one decision, and what I'd do next time. Optional fields left `undefined` don't show up. There's a commented-out slot at the end for the next project.
- `experience`: dates are `YYYY-MM`. Leave out `end` for the current role.
- `howIWork`: the intro line and the four steps in the "How I work" section
- `offTheClock`: the "Off the clock" section, written from `content/about-me.md`. That includes the interest sentences, the bookshelf (3–5 books), the "Now learning" log and an optional "Made by hand" gallery (photos in `public/images/art/`). Empty parts are hidden.
- `clientSites`: a site only appears once it has a `url` and `approved: true`
- `SITE_URL`: the site's address, used for SEO and link previews
- `publications`, `awards`, `skills`

Search the file for `TODO` to see what's still missing.

The resume PDF lives at `public/Anu_Deepthi_Resume.pdf`.

## Add a screenshot to a project

1. Put the image in `public/images/`, e.g. `public/images/health-companion.png`.
2. In `src/data/site.ts`, set that project's `image`:
   ```ts
   image: {
     src: "/images/health-companion.png",
     alt: "Assessment screen showing the camera check",
     width: 1600,   // the image's real pixel size
     height: 1000,
   },
   ```
   Next.js resizes and serves it in modern formats automatically. Only use real screenshots, and don't include anything confidential.

## Deploy on Vercel

1. Make this folder its own git repo and push it to a new, empty GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Portfolio site"
   git branch -M main
   git remote add origin https://github.com/<username>/<repo>.git
   git push -u origin main
   ```
2. Go to https://vercel.com, sign in with GitHub, choose **Add New → Project**, and import the repository.
3. Keep the default settings and click **Deploy**. You get a URL like `https://<project>.vercel.app` after a minute or so.
4. Every push to `main` deploys again on its own.

Optional custom domain:

1. In the Vercel project, open **Settings → Domains** and add the domain.
2. Add the DNS records Vercel shows you at your domain registrar.
3. In `src/data/site.ts`, set `SITE_URL` to the full address (e.g. `https://example.com`, no trailing slash), then commit and push. The canonical URL, sitemap, robots.txt and link previews all read from that one constant.
