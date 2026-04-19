/** Central WebP paths — place matching .webp files in public/images/ */

export const HERO_MECHANIKER_WEBP = "/images/hero-mechaniker.webp";
export const HERO_MECHANIKER_FALLBACK = "/images/hero-mechaniker.png";

/** PNG fallback for bike/service assets exported as `.webp` + original `.png`. */
export function webpToRasterPng(webpPath: string): string {
  return webpPath.replace(/\.webp$/i, ".png");
}
