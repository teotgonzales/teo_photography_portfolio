# Teo Gonzales Photography Portfolio

A static photography portfolio for Teo Gonzales, built with React, TypeScript, Vite, React Router, and plain CSS.

The current sections are:

- On Stage: `/`
- On Set: `/on-set`
- Portraits: `/portraits`
- Lifestyle: `/lifestyle`
- Contact/About: `/contact`

## Requirements

Install Node.js LTS first:

```bash
node -v
npm -v
```

Both commands should print version numbers.

## Local Development

Run commands from the project root, not from `src`:

```bash
cd "C:\Users\thaku\OneDrive\Documents\Teo's Website"
npm install
npm run dev
```

Vite will print a local URL, usually:

```text
http://localhost:5173/
```

## Scripts

```bash
npm run dev
npm run optimize-images
npm run sync-photos
npm run build
npm run preview
```

- `dev`: starts the local development server.
- `optimize-images`: creates optimized `thumbs` and `full` WebP images.
- `sync-photos`: scans `public/images` page folders and regenerates gallery data.
- `build`: creates the production files in `dist`.
- `preview`: previews the production build locally.

## Editing Photos

Add image files to the folder for the matching page:

```text
public/images/on-stage
public/images/on-set
public/images/portraits
public/images/lifestyle
public/images/contact
```

Then run:

```bash
npm run optimize-images
npm run sync-photos
```

The optimizer creates:

```text
public/images/on-stage/thumbs
public/images/on-stage/full
```

and the same `thumbs` / `full` folders for the other gallery pages.

The sync script updates these files automatically:

```text
src/data/onStage.ts
src/data/onSet.ts
src/data/portraits.ts
src/data/lifestyle.ts
```

## Deployment

This project is configured for static hosting and can be deployed to GitHub Pages.

Current Vite config uses:

```ts
base: './'
```

For a GitHub Pages project site, you may also use:

```ts
base: '/your-repo-name/'
```

Build the site:

```bash
npm run build
```

The deployable files will be in:

```text
dist
```

## More Documentation

See [DOCUMENTATION.md](./DOCUMENTATION.md) for details about routes, components, CSS files, image data, and common update tasks.
