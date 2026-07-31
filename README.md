# Shena Cabalhin — Personal Portfolio Website

A production-ready, fully responsive personal portfolio website for a Medical Billing Specialist / Healthcare Administrative Professional, built with **HTML5** and **Tailwind CSS (via CDN)** only — no build tools, no frameworks, no npm required.

Open `index.html` in any browser and it works immediately.

---

## 📁 Project Overview

This site presents professional experience, technical/tool proficiencies, certifications, and contact information in a modern, healthcare-portal-inspired design — built from and personalized to the resume of Shena Cabalhin. It's designed to feel like a premium personal brand site rather than a plain resume copy, and is ready to send to recruiters, hiring managers, or healthcare/insurance organizations.

## ✨ Features

- Fully responsive layout (mobile, tablet, laptop, desktop)
- Sticky navigation with active-section highlighting and shadow-on-scroll
- Mobile hamburger menu
- Dark mode with saved preference (`localStorage`) + OS preference detection
- Animated hero section with floating decorative elements
- Vertical timeline for work experience
- Categorized, badge-style skills/tools section
- Certification cards (with clearly marked placeholders for future credentials)
- Contact section with a template contact form + direct contact details
- Scroll-reveal animations, hover-lift effects, smooth scrolling
- Back-to-top button (floating + footer link)
- Accessible: semantic HTML5, ARIA labels, visible focus states, `prefers-reduced-motion` support
- SEO-ready: title, meta description/keywords, Open Graph tags, favicon placeholder

## 🗂 Folder Structure

```
portfolio/
│
├── index.html              # Main site (all sections, Tailwind CDN + config)
├── README.md                # This file
│
├── assets/
│   ├── images/               # Add your photo / OG image here
│   ├── icons/                 # Add favicon.png here
│   └── resume.pdf             # Replace with your actual downloadable resume
│
├── css/                      # Reserved for any additional custom stylesheets
│                              # (all current styling lives inside index.html)
│
└── js/
    └── script.js             # All interactivity (nav, dark mode, animations, etc.)
```

---

## 🛠 How to Customize

### 1. Replace placeholder content
Search `index.html` for square-bracket placeholders and swap in your real details:

| Placeholder | Where | Replace with |
|---|---|---|
| `[Professional Photo]` | Hero section | Your photo (see below) |
| `[Your LinkedIn URL]` | Contact + Footer | Your LinkedIn profile link |
| `[Your Portfolio or Reference Link]` | Contact section | A reference/portfolio link |
| `[Your City, Country]` | Contact section | Your public location |
| `[Location]` | Experience timeline cards | City/State for each employer |
| `[Certification Name]`, `[Issuing Organization]`, `[Month Year]`, `[Credential ID]` | Certifications section | Your real certification details |
| `[Completion Date]` | HIPAA certification card | Date completed |

### 2. Replace your profile photo
1. Add your photo to `assets/images/` (e.g. `assets/images/profile.jpg`).
2. In `index.html`, find the `<!-- Right: Photo -->` block inside the Hero section.
3. Replace the placeholder `<div>` containing the person-outline icon and `[Professional Photo]` text with:
   ```html
   <img src="assets/images/profile.jpg" alt="Shena Cabalhin, Medical Billing Specialist" loading="lazy" class="h-full w-full object-cover rounded-[2.5rem]" />
   ```

### 3. Update your downloadable resume
Replace `assets/resume.pdf` with your actual PDF. The "Download Resume" button already points to `assets/resume.pdf`, so no code changes are needed if the filename stays the same.

### 4. Update Work Experience
Each role lives inside the `<section id="experience">` block in `index.html` as a `<li>` timeline item. Copy an existing `<li>` block to add a new role, or edit the text directly inside the existing `<h3>`, company `<p>`, date `<span>`, bullet `<ul>`, and tag badges.

### 5. Edit Technical Skills
Skills are grouped into categories inside `<section id="tech-stack">`. Each category is a card containing `<span class="skill-badge">Skill Name</span>` elements — add, remove, or rename badges freely; the `.skill-badge` style (defined near the bottom of `index.html`) will apply automatically, including its hover animation.

### 6. Edit Certifications
Each certification is a card inside `<section id="certifications">`. Duplicate a card block to add more, or edit the name/organization/date/credential ID text directly. Point the "Verify Credential" link's `href="#"` to your certificate's real verification URL once available.

### 7. Connect the Contact Form
The form in `<section id="contact">` is currently a front-end-only template (it shows a success message but does not send data anywhere). To make it functional, either:
- Point it to a form backend such as [Formspree](https://formspree.io) or [Getform](https://getform.io) by setting the `<form>` tag's `action` and `method` attributes, or
- Wire up a `fetch()` call inside the `contact-form` submit handler in `js/script.js` (a `TODO` comment marks exactly where).

### 8. Update Colors / Theme
All colors are defined via Tailwind utility classes (`emerald-*`, `slate-*`, `sky-*`) directly in `index.html`, plus a small `tailwind.config` block in the `<head>` for fonts, animations, and custom color shades. To re-theme the site, adjust the `tailwind.config` colors object or do a find-and-replace on the utility class names.

---

## 🚀 Deployment

This is a fully static site — any static host works. No build step is required.

### Deploy to GitHub Pages
1. Create a new GitHub repository and push the contents of this `portfolio/` folder to it (with `index.html` at the repository root).
2. In the repository, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Select the `main` branch and the `/ (root)` folder, then click **Save**.
5. GitHub will publish your site at `https://<your-username>.github.io/<repository-name>/` within a few minutes.

### Deploy to Netlify
1. Log in to [Netlify](https://app.netlify.com) and click **Add new site → Deploy manually**.
2. Drag and drop the entire `portfolio` folder onto the upload area (or connect your GitHub repo via **Import an existing project** for continuous deployment).
3. Netlify will detect it as a static site automatically — no build command or publish directory changes are needed (publish directory: `/`).
4. Your site will be live instantly at a generated `*.netlify.app` URL, which you can rename or map to a custom domain under **Site settings → Domain management**.

### Deploy to Vercel
1. Log in to [Vercel](https://vercel.com) and click **Add New → Project**.
2. Import the GitHub repository containing this project (or use the Vercel CLI: `vercel` from inside the `portfolio` folder).
3. When prompted for a framework preset, choose **Other** (this is a static HTML site — no build command is required).
4. Set the output directory to `./` and deploy.
5. Vercel will provide a live `*.vercel.app` URL, with custom domain support available under **Project Settings → Domains**.

---

## ♿ Accessibility Notes (WCAG 2.1 AA)
- All interactive elements are keyboard-navigable with visible focus rings (`:focus-visible`).
- Semantic landmarks throughout: `<header>`, `<nav>` (primary + footer, each with `aria-label`), `<main>`, `<section>`, `<article>` (experience/skill/certification cards), `<address>` (contact details), `<footer>`.
- Every inline `<svg>` icon is `aria-hidden="true"` since it's always paired with visible text or is purely decorative; icon-only buttons (theme toggle, hamburger, back-to-top) carry explicit `aria-label`s instead.
- Body/meta text uses `slate-500`+ in light mode to meet the 4.5:1 contrast minimum for normal text (an earlier `slate-400` pass was too light against white).
- Icon-only tap targets (nav toggle, theme toggle, footer social icons) are 44×44px to meet mobile touch-target guidance.
- Heading hierarchy is a single `<h1>` → `<h2>` per section → `<h3>` per card, with no skipped levels.
- Animations respect `prefers-reduced-motion`.
- A "Skip to main content" link is the first focusable element on the page.
- Remember to add a descriptive, specific `alt` attribute once you replace the photo placeholder with a real `<img>` (a suggested example is included in the customization steps above).

## ⚡ Performance & SEO Notes
- Single scroll listener (`requestAnimationFrame`-throttled) drives both the sticky-header shadow and the back-to-top button, avoiding redundant listeners and layout thrashing.
- Scroll-reveal and scrollspy use `IntersectionObserver` rather than scroll-based polling.
- Fonts are loaded with `preconnect` + `display=swap`; the Tailwind CDN host is resolved early via `dns-prefetch`/`preconnect`.
- `robots.txt` and `sitemap.xml` are included at the project root — update the placeholder domain in both (and in `index.html`'s `canonical`/Open Graph tags) once you have a real deployed URL.
- A `Person` JSON-LD structured-data block in `<head>` helps search engines understand the page is a professional profile.
- No unused JavaScript, no external UI libraries, and Tailwind's CDN build only generates the utility classes actually used in the markup.

## 📌 Notes
- This template intentionally avoids fabricating employment history, certifications, or metrics not present in the source resume. Placeholder brackets (e.g. `[Certification Name]`) mark fields you should complete with real, verifiable information before publishing.
- No external JavaScript libraries, build tools, or npm packages are used — only the Tailwind CDN script and vanilla JavaScript.
