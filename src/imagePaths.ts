/** Central WebP paths — place matching .webp files in public/images/ */

export const HERO_MECHANIKER_WEBP = "/images/hero-mechaniker.webp";
export const HERO_MECHANIKER_FALLBACK = "/images/hero-mechaniker.png";

export const HERO_VIDEO_DESKTOP = "/videos/hero-1-desktop.mp4";
export const HERO_VIDEO_MOBILE = "/videos/hero-1-mobile.mp4";

/** PNG fallback for bike/service assets exported as `.webp` + original `.png`. */
export function webpToRasterPng(webpPath: string): string {
  return webpPath.replace(/\.webp$/i, ".png");
}

export function webpToJpg(webpPath: string): string {
  return webpPath.replace(/\.webp$/i, ".jpg");
}
