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

To add photo cards, place image files in the correct `public/images/...` folder, then run `npm run optimize-images` and `npm run sync-photos`.

## Images

Images should be placed in the folder for the matching page:

```text
public/images/on-stage
public/images/on-set
public/images/portraits
public/images/lifestyle
public/images/contact
```

Use image paths like:

```ts
'/images/on-stage/photo-name.jpg'
```

Do not import images into React components unless you intentionally move them into `src`.

## Auto-Syncing Photos

For normal updates, use this order:

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
public/images/on-stage
public/images/on-set
public/images/portraits
public/images/lifestyle
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

After adding or removing photos, run:

```bash
npm run optimize-images
npm run sync-photos
```

Then refresh the site. For a live website, rebuild and redeploy after syncing.

## Components

### Layout Components

- `src/components/Header.tsx`
  - Top masthead with `TEO GONZALES`
  - Navigation links
  - Email, Instagram, and LinkedIn icons

- `src/components/Footer.tsx`
  - Copyright text only

### Gallery Components

- `src/components/ProjectGrid.tsx`
  - Displays gallery cards
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
  - mobile gallery currently uses two columns

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

Replace the placeholder Instagram/LinkedIn URLs with real profile URLs.

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
