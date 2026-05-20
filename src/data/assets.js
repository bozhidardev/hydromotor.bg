/**
 * Asset path helper for sub-path deployments (GitHub Pages).
 * import.meta.env.BASE_URL is '/hydromotor.bg/' in production and '/' in dev.
 */
export function asset(path) {
  const base = import.meta.env.BASE_URL || '/';
  const clean = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${clean}`;
}
