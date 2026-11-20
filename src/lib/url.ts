/** Prefixes a root-relative path with the deploy base ("/portfolio" on GitHub Pages, "" on a
 *  custom domain). Every internal link and public/ asset goes through this. */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
export const url = (path: string): string => `${BASE}${path}`;
