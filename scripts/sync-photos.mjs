import { readdir, readFile, writeFile } from 'node:fs/promises';
import { extname, join, parse } from 'node:path';

const pages = [
  {
    folder: 'on-stage',
    output: 'src/data/onStage.ts',
    exportName: 'onStageProjects',
    category: 'On Stage',
    idStart: 1000,
    preferredOrder: [
      '_R000226.webp',
      '010_01_JSolomon_TeoGonzales007.webp',
      '010_01_JSolomon_TeoGonzales031.webp',
      '010_01_AylaClaire_TeoGonzales005.webp',
    ],
    defaultClient: 'On Stage',
    defaultDescription: 'On stage photography by Teo Gonzales.',
  },
  {
    folder: 'on-set',
    output: 'src/data/onSet.ts',
    exportName: 'onSetProjects',
    category: 'On Set',
    idStart: 2000,
    preferredOrder: [
      'AylaClaire02-06-2026_TeoGonzales053.webp',
      'EulogyBTS_TeoGonzales013.webp',
      'EulogyBTS_TeoGonzales050.webp',
      'AylaClaire02-06-2026_TeoGonzales080.webp',
    ],
    defaultClient: 'On Set',
    defaultDescription: 'On set photography by Teo Gonzales.',
  },
  {
    folder: 'portraits',
    output: 'src/data/portraits.ts',
    exportName: 'portraitProjects',
    category: 'Portraits',
    idStart: 3000,
    defaultClient: 'Portraits',
    defaultDescription: 'Portrait photography by Teo Gonzales.',
  },
  {
    folder: 'lifestyle',
    output: 'src/data/lifestyle.ts',
    exportName: 'lifestyleProjects',
    category: 'Lifestyle',
    idStart: 4000,
    defaultClient: 'Lifestyle',
    defaultDescription: 'Lifestyle photography by Teo Gonzales.',
  },
];

const supportedExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);
const isGalleryImage = (filename) =>
  supportedExtensions.has(extname(filename).toLowerCase()) &&
  !filename.toLowerCase().includes('placeholder');

const compareGalleryFiles = (page) => (a, b) => {
  const getNumber = (filename) => {
    const match = parse(filename).name.match(/^(\d+)(?:[\s_.-]+|$)/);
    return match ? Number(match[1]) : null;
  };
  const aNumber = getNumber(a);
  const bNumber = getNumber(b);

  if (aNumber !== null || bNumber !== null) {
    if (aNumber === null) return 1;
    if (bNumber === null) return -1;
    if (aNumber !== bNumber) return aNumber - bNumber;
  }

  const preferredOrder = page.preferredOrder ?? [];
  const aIndex = preferredOrder.indexOf(a);
  const bIndex = preferredOrder.indexOf(b);

  if (aIndex !== -1 || bIndex !== -1) {
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  }

  return a.localeCompare(b);
};

const escapeText = (value) => value.replaceAll('\\', '\\\\').replaceAll("'", "\\'");

const toSlug = (filename) =>
  parse(filename)
    .name.replace(/^\d+(?:[\s_.-]+|$)/, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'photo';

const toTitle = (filename) => {
  const cleaned = parse(filename)
    .name.replace(/^\d+(?:[\s_.-]+|$)/, '')
    .replace(/teogonzales/gi, '')
    .replace(/\.(jpg|jpeg|png|webp|avif)$/i, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\b\d+\b/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!cleaned) {
    return '';
  }

  return cleaned.replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const readImageSize = async (filePath) => {
  const buffer = await readFile(filePath);
  const extension = extname(filePath).toLowerCase();

  if (extension === '.png' && buffer.length >= 24) {
    return {
      width: buffer.readUInt32BE(16),
      height: buffer.readUInt32BE(20),
    };
  }

  if ((extension === '.jpg' || extension === '.jpeg') && buffer.length > 4) {
    let offset = 2;

    while (offset < buffer.length) {
      if (buffer[offset] !== 0xff) {
        break;
      }

      const marker = buffer[offset + 1];
      const length = buffer.readUInt16BE(offset + 2);

      if (marker >= 0xc0 && marker <= 0xc3) {
        return {
          height: buffer.readUInt16BE(offset + 5),
          width: buffer.readUInt16BE(offset + 7),
        };
      }

      offset += 2 + length;
    }
  }

  return null;
};

const getOrientation = async (filePath) => {
  const size = await readImageSize(filePath);

  if (!size) {
    return 'portrait';
  }

  if (Math.abs(size.width - size.height) < Math.max(size.width, size.height) * 0.08) {
    return 'square';
  }

  return size.width > size.height ? 'landscape' : 'portrait';
};

const createProject = async (page, file, index) => {
  const titleSource = file.sourceName ?? file.filename;
  const thumbPath = `/images/${page.folder}/${file.thumbPath}`;
  const fullPath = `/images/${page.folder}/${file.fullPath}`;
  const title = toTitle(titleSource);
  const alt = `${page.category} photograph by Teo Gonzales`;
  const orientation = await getOrientation(join('public', 'images', page.folder, file.fullPath));

  return `  {
    id: ${page.idStart + index + 1},
    slug: '${escapeText(toSlug(titleSource))}',
    title: '${escapeText(title)}',
    category: '${page.category}',
    year: '2026',
    client: '${page.defaultClient}',
    location: 'Los Angeles, CA',
    coverImage: '${escapeText(thumbPath)}',
    coverAlt: '${escapeText(alt)}',
    description: '${escapeText(page.defaultDescription)}',
    images: [{ src: '${escapeText(fullPath)}', alt: '${escapeText(alt)}', orientation: '${orientation}' }],
  }`;
};

const listFiles = async (folderPath) => {
  try {
    return await readdir(folderPath);
  } catch {
    return [];
  }
};

const syncPage = async (page) => {
  const folderPath = join('public', 'images', page.folder);
  const optimizedThumbs = (await listFiles(join(folderPath, 'thumbs')))
    .filter(isGalleryImage)
    .sort(compareGalleryFiles(page));

  const files = optimizedThumbs.length
    ? optimizedThumbs.map((filename) => ({
        filename,
        sourceName: filename,
        thumbPath: `thumbs/${filename}`,
        fullPath: `full/${filename}`,
      }))
    : (await readdir(folderPath))
        .filter(isGalleryImage)
        .sort(compareGalleryFiles(page))
        .map((filename) => ({
          filename,
          sourceName: filename,
          thumbPath: filename,
          fullPath: filename,
        }));

  const projects = await Promise.all(files.map((filename, index) => createProject(page, filename, index)));
  const contents = `import type { Project } from './projects';

export const ${page.exportName}: Project[] = [
${projects.join(',\n')}
];
`;

  await writeFile(page.output, contents);
  return { page: page.category, count: files.length };
};

const results = await Promise.all(pages.map(syncPage));

for (const result of results) {
  console.log(`${result.page}: ${result.count} photo(s) synced`);
}
