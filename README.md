# Nazmul Islam Mazumdar — Portfolio

A personal portfolio for Nazmul Islam Mazumdar, a Computer Science & Engineering student and aspiring Full Stack Web Developer. The site is built as a fast, accessible, editorial-style experience with a black-and-white palette, oversized typography and restrained red accents.

## Tech stack

- **Next.js 16** (App Router, Turbopack, Server Components by default)
- **React 19** and **TypeScript** in strict mode
- **Tailwind CSS 4**
- **GSAP** and **Motion** for motion design
- **React Hook Form** and **Zod** for the contact form
- **Resend** for email delivery
- **Vercel Web Analytics** for privacy-friendly traffic insights
- **next-mdx-remote** and **gray-matter** for local articles
- **Lucide** and **Simple Icons** for iconography

## Getting started

Requirements: Node.js 20.9+ and npm (or pnpm).

```bash
npm install
cp .env.example .env.local
npm run dev
```

The site runs at [http://localhost:3000](http://localhost:3000).

### Scripts

| Command             | Purpose                                      |
| ------------------- | -------------------------------------------- |
| `npm run dev`       | Start the development server                 |
| `npm run build`     | Create a production build                    |
| `npm run start`     | Serve the production build                   |
| `npm run lint`      | Lint the project with ESLint                 |
| `npm run typecheck` | Run the TypeScript compiler without emitting |

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values you need. The site builds and runs without any of them, but the contact form will return an explicit “not configured” error until Resend is set up.

| Variable               | Required | Description                                                                 |
| ---------------------- | -------- | --------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | No       | Canonical production URL used for metadata, sitemap and share links. Defaults to `http://localhost:3000`. |
| `RESEND_API_KEY`       | For email | Resend API key. Never expose this in the browser.                          |
| `CONTACT_FROM_EMAIL`   | For email | Verified Resend sender, e.g. `Nazmul <contact@your-domain.com>`.           |
| `CONTACT_TO_EMAIL`     | No       | Destination address. Defaults to the email in `src/config/site.ts`.        |

For production, set `NEXT_PUBLIC_SITE_URL` to the final domain so Open Graph URLs, the sitemap and canonical links resolve correctly.

## Editing content

Most personal information lives in one place:

- **`src/config/site.ts`** — name, title, biography, email, phone, WhatsApp, social URLs, availability, navigation and profile image path.
- **`src/data/projects.ts`** — project entries, technology stacks, highlights and live/repository URLs. Set `null` for links that do not exist; the UI renders an honest placeholder instead of a dead link.
- **`src/data/skills.ts`**, **`src/data/experience.ts`**, **`src/data/services.ts`** — skills, journey chapters and service capabilities.
- **`src/content/blog/`** — Markdown/MDX articles.

### Adding a blog post

Create a `.mdx` file in `src/content/blog/` using a slug as the filename (for example `my-new-note.mdx`):

```mdx
---
title: "A title that explains the idea"
description: "One or two sentences used on cards and in search results."
date: "2026-11-19"
category: "JavaScript"
tags: ["JavaScript", "Fundamentals"]
sample: false
---

Your content starts here. Use `##` and `###` headings to build the table of contents.
```

Posts are discovered automatically. Set `sample: false` only when an article is genuinely written and dated; the five included articles are demonstration posts and are labelled **Sample article** in the interface. Do not add fake personal milestones or claims to them.

### Images

- Portrait: `public/images/profile/nazmul-portrait.webp` — a transparent cut-out of the supplied photograph, rendered with a CSS grayscale treatment. Replace this file to update the portrait everywhere; keep a similar portrait aspect ratio (roughly 4:5) for the best crop.
- Open Graph image: `public/images/og/og-image.jpg` — 1200 × 630. Replace it when the identity or branding changes.

`siteConfig.profileImage` controls the portrait path used by the app.

## Contact form

The form is validated on the client and again on the server with the same Zod schema (`src/lib/validations.ts`).

- A hidden honeypot field silently absorbs automated submissions.
- Requests are rate-limited in memory per IP (4 requests per 10 minutes). This is intentionally lightweight; for multi-instance production deployments, use a shared store such as Upstash Redis.
- When Resend is not configured, `POST /api/contact` responds with `503` and an `EMAIL_NOT_CONFIGURED` code. It never pretends that an email was sent.
- Successful messages are delivered through Resend to `CONTACT_TO_EMAIL` (or the site email).

To enable email delivery:

1. Create a Resend account and API key.
2. Verify your sending domain (or use Resend’s test sender during development).
3. Set `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` in `.env.local` / your host’s environment.
4. Send a test message from `/contact`.

## Routes

| Route                  | Description                              |
| ---------------------- | ---------------------------------------- |
| `/`                    | Home with all primary sections           |
| `/about`               | Longer biography and background          |
| `/projects`            | Filterable project archive               |
| `/projects/[slug]`     | Project case study                       |
| `/blog`                | Searchable, filterable journal           |
| `/blog/[slug]`         | Article with table of contents and share links |
| `/contact`             | Contact details and form                 |
| `/api/contact`         | Contact form endpoint (POST only)        |
| `/sitemap.xml`         | Generated sitemap                        |
| `/robots.txt`          | Generated robots policy                  |

## Design notes

- All sections use semantic landmarks, a skip link, visible focus styles and reduced-motion fallbacks.
- A sun/moon toggle in the navigation switches between the dark and light themes. The choice is saved in `localStorage` and restored before paint; the site defaults to dark on a first visit.
- Light and dark palettes are driven by CSS custom properties in `src/app/globals.css`. The portrait and project artwork intentionally remain dark, framed artifacts in both themes.
- Animations are progressive enhancements; content remains readable without JavaScript motion.
- Project visuals are original code-generated concept artwork, clearly labelled as **not screenshots**.
- Missing live or repository links render as non-clickable “Live soon” / “Repo soon” placeholders.
- Articles are clearly marked as sample content until they are replaced with real writing.

## Deployment

The project deploys to any host that supports Next.js (Vercel is the simplest fit).

1. Push the repository to your Git host.
2. Import the project into Vercel (or run `npm run build` on your host).
3. Add the environment variables from the table above.
4. Set `NEXT_PUBLIC_SITE_URL` to the production domain.
5. Deploy and verify `/`, `/projects`, `/blog`, `/contact`, `/sitemap.xml` and `/robots.txt`.

### Web Analytics

`<Analytics />` from `@vercel/analytics/next` is mounted in the root layout, so page views are collected automatically once the project is running on Vercel. Analytics does not report from local builds.

To finish enabling it:

1. Open the project in the Vercel dashboard.
2. Go to **Analytics → Web Analytics** and enable it.
3. Redeploy the latest commit if the project was already live.

After deploying, update the social URLs and Open Graph image if the domain or branding changes.
