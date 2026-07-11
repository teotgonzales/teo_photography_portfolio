const githubPagesBase = window.location.hostname.endsWith('github.io')
  ? '/teo_photography_portfolio'
  : '';

export function assetPath(path: string) {
  if (/^(?:[a-z]+:)?\/\//i.test(path) || path.startsWith('data:')) {
    return path;
  }

  return `${githubPagesBase}/${path.replace(/^\/+/, '')}`;
}
