# Thao Thi Phuong Dao — Portfolio Website

**Live website:** https://drthaodao3101.github.io

Academic and professional portfolio website for **Thao Thi Phuong Dao, MD, MSc** — ENT doctor, computer scientist, and medical AI researcher (Đào Thị Phương Thảo).

Built with **Next.js 14 · React · TypeScript · Tailwind CSS**, statically exported and deployed to **GitHub Pages** via GitHub Actions. All content lives in editable JSON data files — update the data, push to `main`, and the site redeploys automatically.

---

## Features

- Bilingual interface (English / Vietnamese) with a one-click toggle
- Hero, About, Research & Publications (searchable + filterable), Featured Projects
- Clinical Expertise, Skills, News & Activities, Certificates & Courses
- Hobbies gallery with carousel, masonry grid, and a coordinate-pinned travel map
- Contact page with anti-spam form (opens your email app) and downloadable vCard
- Dynamic CV page with four variants (Academic / Short / Clinical / AI-CS) → **Print → Save as PDF**, plus an optional Puppeteer script for a committed PDF
- Quarterly academic-profile check (ORCID) that opens a pull request with suggestions
- SEO metadata, Open Graph image, responsive design, reduced-motion support

---

## Tech stack

| Layer | Choice |
|------|--------|
| Framework | Next.js 14 (App Router, `output: "export"`) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Fonts | Newsreader · Inter · IBM Plex Mono (via `next/font`) |
| Hosting | GitHub Pages |
| CI/CD | GitHub Actions |
| CV PDF | Puppeteer (build-time) or browser Print → PDF |
| Profile sync | ORCID public API (manual import for Scholar / ResearchGate) |

---

## Local development

```bash
git clone https://github.com/drthaodao3101/drthaodao3101.github.io.git
cd drthaodao3101.github.io
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to ./out
```

---

## How to update content

All editable content is in `src/data/*.json`. After any edit, commit and push to `main` — GitHub Actions rebuilds and redeploys.

### Update personal information
Edit `src/data/personal-info.json` (name, title, tagline, intro, bio, email, institutions, photo path).

### Add a publication
Append an object to `src/data/publications.json`:
```json
{
  "id": "pub-unique-id",
  "title": "Your paper title",
  "authors": "Author A, Author B",
  "venue": "Journal or Conference, Year",
  "year": 2026,
  "role": "First author",
  "link": "https://doi.org/...",
  "doi": "10.xxxx/xxxxx",
  "categories": ["otolaryngology", "journal"],
  "tags": ["Laryngoscopy"]
}
```
Valid `categories` (used by the filters): `otolaryngology`, `computer-science`, `medical-image-analysis`, `journal`, `conference`, `preprint`, `poster`.

### Add a project
Append to `src/data/projects.json` (`title`, `description`, `role` are `{ "en": "", "vi": "" }` objects; `status` is `active`, `ongoing`, or `completed`).

### Add gallery images
1. Drop the image file into `public/images/gallery/`.
2. Add an entry to `src/data/gallery.json` → `images` with `image: "/images/gallery/your-file.jpg"`, plus `title`, `location`, `year`, `caption`, `category`.
3. To add a travel-map pin, add `{ "name", "lat", "lng", "category" }` to `places`.

> Entries with an empty `image` field render an elegant labelled placeholder, so the gallery looks complete before photos are added.

### Update profile links
Edit `src/data/social-links.json` (ResearchGate, ORCID, LinkedIn are empty by default — fill them in to activate the buttons).

---

## Regenerate the CV PDF

The `/cv` page is the source of truth. The simplest export is **open `/cv` → choose a variant → browser Print → Save as PDF**.

For a committed PDF at `public/cv/Thao_Thi_Phuong_Dao_CV.pdf`:
```bash
npm run build
npm run generate-cv
```
This is also wired into the deploy workflow (best-effort).

---

## Deploy

1. Push this repository to `https://github.com/drthaodao3101/drthaodao3101.github.io`.
2. In the repo: **Settings → Pages → Build and deployment → Source → GitHub Actions**.
3. Push to `main`. The **Deploy portfolio to GitHub Pages** workflow builds, exports, and publishes to https://drthaodao3101.github.io.

### Quarterly profile updates (optional)
Add a repository variable **`ORCID_ID`** (Settings → Secrets and variables → Actions → Variables) with your ORCID iD. The **Quarterly academic profile check** workflow then runs every 3 months and opens a PR with suggested new publications for your review.

---

## Project structure

```
drthaodao3101.github.io/
├── .github/workflows/      deploy.yml · update-academic-profiles.yml
├── public/                 images, cv, favicon, .nojekyll
├── src/
│   ├── app/                pages (App Router)
│   ├── components/         UI + sections
│   ├── data/               editable JSON content  ← edit here
│   └── lib/                i18n + icons
├── scripts/                generate-cv.ts · update-publications.ts
├── next.config.js          static export config
└── tailwind.config.ts
```

---

## Contact

**Thao Thi Phuong Dao, MD, MSc** · Dtpthao@selab.hcmus.edu.vn
Thong Nhat Hospital, Ho Chi Minh City · University of Science, VNU-HCM
[Google Scholar](https://scholar.google.com/citations?user=dGoK748AAAAJ&hl=en)

---

*This website is for academic and professional portfolio purposes and does not replace medical consultation.*
