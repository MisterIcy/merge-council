/**
 * Base path from Astro config (e.g. /merge-council/). Has trailing slash.
 * Used for all internal links so the site works under GitHub Pages project path.
 */
export const baseUrl = (import.meta.env.BASE_URL ?? "/").replace(/\/?$/, "/");

/**
 * Returns a path prefixed with the configured base (for internal links).
 * @param path - Path with or without leading slash (e.g. "/blog" or "blog")
 */
export function path(pathSegment: string): string {
  const clean = pathSegment.replace(/^\//, "");
  return clean ? `${baseUrl.replace(/\/$/, "")}/${clean}` : baseUrl.replace(/\/$/, "") || "/";
}
