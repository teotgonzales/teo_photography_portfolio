# Website Documentation

This file is for anyone taking over or updating the Teo Gonzales photography portfolio.

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- Plain CSS split into smaller files
- No backend
- Static hosting friendly

## Live Site and Source Control

- Live website: [https://teogonzales.com](https://teogonzales.com)
- GitHub repository: [teotgonzales/teo_photography_portfolio](https://github.com/teotgonzales/teo_photography_portfolio)
- Production branch: `main`
- Hosting: GitHub Pages
- Deployment: GitHub Actions via `.github/workflows/deploy-pages.yml`

Every push to `main` automatically builds and redeploys the website. The normal update flow is:

1. Edit and test the website locally.
2. Review the changes in GitHub Desktop.
3. Commit with a short summary.
4. Click **Push origin**.
5. Confirm the `Deploy website to GitHub Pages` workflow passes in the GitHub **Actions** tab.

## App Entry Points

- `index.html`: HTML shell used by Vite.
- `src/main.tsx`: creates the React Router routes and renders the app.
- `src/App.tsx`: shared layout wrapper with skip link, header, main content, and footer.
- `src/styles.css`: CSS import hub. It imports all smaller CSS files.

## Routes

Routes are defined in `src/main.tsx`.

| URL | Page | Purpose |
| --- | --- | --- |
| `/` | `Home.tsx` | On Stage gallery |
| `/on-set` | `CategoryPage.tsx` | On Set gallery |
| `/portraits` | `CategoryPage.tsx` | Portraits gallery |
| `/lifestyle` | `Work.tsx` | Lifestyle gallery |
| `/contact` | `Contact.tsx` | About/contact page |
| `/work/:slug` | `ProjectDetail.tsx` | Older project detail route, kept for future use |

## Data

Project/photo data is generated from the image folders by:

```bash
npm run optimize-images
npm run sync-photos
```

The generated data is split by page:

```text
src/data/onStage.ts
src/data/onSet.ts
src/data/portraits.ts
src/data/lifestyle.ts
```

Shared types and the combined project list live in:

```text
src/data/projects.ts
```

Each project has:

- `id`
- `slug`
- `title`
- `category`
- `year`
- `client`
- `location`
- `coverImage`
- `coverAlt`
- `images`
- `description`

The active categories are:

- `On Stage`
- `On Set`
- `Portraits`
- `Lifestyle`

To add photo cards, place numbered originals in the correct `photo-sources/...` folder, then commit and push. GitHub Actions handles optimization, syncing, building, and deployment.

## Images

Original images should be placed in the source folder for the matching page:

```text
photo-sources/on-stage
photo-sources/on-set
photo-sources/portraits
photo-sources/lifestyle
```

Use a leading number to control the gallery order, for example `01-opening-photo.jpg`, `02-second-photo.jpg`, and `03-third-photo.jpg`. Numbered files sort first in ascending numeric order. The ordering number is removed from generated slugs and titles.

The optimizer writes deployable WebP files to `public/images/[category]/thumbs` and `public/images/[category]/full`. Do not manually place originals in those output folders. The Contact page image remains in `public/images/contact`.

Use image paths like:

```ts
'/images/on-stage/photo-name.jpg'
```

Do not import images into React components unless you intentionally move them into `src`.

`src/utils/assetPath.ts` makes public image paths work on both the custom domain and the fallback GitHub project URL. Use `assetPath(...)` whenever a component renders one of these string-based image paths.

## Auto-Syncing Photos

GitHub Actions automatically uses this order after every push to `main`:

```bash
npm run optimize-images
npm run sync-photos
```

`optimize-images` creates smaller WebP files for faster loading:

```text
public/images/on-stage/thumbs
public/images/on-stage/full
```

The grid uses `thumbs`. The full-screen viewer uses `full`.

The sync script lives at:

```text
scripts/sync-photos.mjs
```

The optimization script lives at:

```text
scripts/optimize-images.py
```

It scans these folders:

```text
photo-sources/on-stage
photo-sources/on-set
photo-sources/portraits
photo-sources/lifestyle
```

It then rewrites:

```text
src/data/onStage.ts
src/data/onSet.ts
src/data/portraits.ts
src/data/lifestyle.ts
```

Supported image types:

- `.jpg`
- `.jpeg`
- `.png`
- `.webp`
- `.avif`

For local previewing, run:

```bash
npm run optimize-images
npm run sync-photos
```

Then run `npm run dev`. For the live website, committing and pushing the numbered source photos is sufficient.

## Components

### Layout Components

- `src/components/Header.tsx`
  - Top masthead with `TEO GONZALES`
  - Navigation links
  - Email, Instagram, and LinkedIn icons
  - Email: `teogonzalesphoto@gmail.com`
  - Instagram: `https://www.instagram.com/teotgonzales`
  - LinkedIn: `https://www.linkedin.com/in/teo-gonzales-00962a420/`

- `src/components/Footer.tsx`
  - Copyright text only

### Gallery Components

- `src/components/ProjectGrid.tsx`
  - Displays a natural-proportion masonry gallery
  - Uses three columns on desktop, two on tablets, and one on phones
  - Does not show captions below gallery images
  - Handles full-screen image viewer
  - Supports click-to-open, close button, backdrop click, keyboard Escape, and arrow key navigation

- `src/components/ProjectCard.tsx`
  - Individual photo/project tile inside a grid

- `src/components/ProjectGallery.tsx`
  - Older gallery component used by `ProjectDetail.tsx`

- `src/components/Lightbox.tsx`
  - Older lightbox component used by `ProjectGallery.tsx`

### Page Components

- `src/pages/Home.tsx`
  - Uses `src/data/onStage.ts`

- `src/pages/CategoryPage.tsx`
  - Reusable category page for `On Set` and `Portraits`
  - Uses `src/data/onSet.ts` and `src/data/portraits.ts`

- `src/pages/Work.tsx`
  - Lifestyle page
  - Uses `src/data/lifestyle.ts`

- `src/pages/Contact.tsx`
  - About/contact page with image and contact details

- `src/pages/ProjectDetail.tsx`
  - Older detailed project page, currently not the main browsing experience

## CSS Structure

The main CSS entry is:

```text
src/styles.css
```

It imports these files:

- `src/styles/base.css`
  - CSS variables
  - reset/base element styles
  - typography defaults

- `src/styles/layout.css`
  - page shell
  - skip link
  - shared page spacing

- `src/styles/page-shared.css`
  - shared section headings
  - shared link styles
  - reusable page layout helpers

- `src/styles/animations.css`
  - fade-in and lightbox animations

- `src/styles/responsive.css`
  - tablet/mobile breakpoints
  - mobile gallery uses one column

Component CSS files are colocated in `src/components`.

Page CSS files are colocated in `src/pages`.

## Common Updates

### Change Navigation Labels

Edit:

```text
src/components/Header.tsx
```

Update the `navItems` array.

### Change a Route

Edit:

```text
src/main.tsx
```

Then update any links in `Header.tsx`, `Footer.tsx`, or page components.

### Change Contact Info

Edit:

```text
src/pages/Contact.tsx
src/components/Header.tsx
```

The email appears in both the Contact page and the top email icon.

### Change Social Links

Edit:

```text
src/components/Header.tsx
```

Current profile URLs are listed under **Components** above.

### Change Footer

Edit:

```text
src/components/Footer.tsx
```

### Change Mobile Columns

Edit:

```text
src/styles/responsive.css
```

Look for `.project-grid` inside the `@media (max-width: 680px)` block.

## Notes

- The site is static. There is no backend upload system.
- A private upload/admin page would require authentication, storage, and a backend or third-party CMS.
- The current lightbox opens cover images from the visible grid.
- Some older components remain because `ProjectDetail.tsx` still supports detail/gallery pages.

## GitHub Pages and Domain Configuration

GitHub Pages is configured under the repository's **Settings → Pages** screen with:

- Source: `GitHub Actions`
- Custom domain: `teogonzales.com`
- HTTPS: enabled after GitHub issues the certificate

The workflow builds the Vite site and uploads `dist` to GitHub Pages. `public/404.html`, the redirect restoration script in `index.html`, and the runtime basename in `src/main.tsx` preserve React routes when a visitor opens a route directly.

DNS is managed through Cloudflare. All website records must remain **DNS only** rather than proxied:

| Type | Name | Content |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `teotgonzales.github.io` |

Do not modify MX or TXT records when changing website DNS; those records may control email and domain verification.

## Repository Ignore Rules

`.gitignore` excludes dependencies, generated output, and local settings. Originals in `photo-sources` are intentionally tracked so GitHub Actions can optimize them. The first automated-photo commit is large because it adds the existing source library; no current source file exceeds GitHub's 100 MB per-file limit.

## Automated Photo Publishing

The GitHub Pages workflow performs these steps on every push:

1. Installs Node.js and Python.
2. Installs project dependencies and Pillow.
3. Runs `npm run optimize-images`.
4. Runs `npm run sync-photos`.
5. Runs `npm run build`.
6. Deploys `dist` to GitHub Pages.

The optimizer also deletes orphaned WebP outputs when a source photo is removed.

The contributor workflow is:

1. Rename photos with leading order numbers.
2. Drop them into the appropriate `photo-sources` category folder.
3. Review the files in GitHub Desktop.
4. Commit to `main` and click **Push origin**.
5. Wait for the GitHub Pages Action to complete.
