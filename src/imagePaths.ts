/** Central WebP paths — place matching .webp files in public/images/ */

export const HERO_MECHANIKER_WEBP = "/images/hero-mechaniker.webp";
export const HERO_MECHANIKER_FALLBACK = "/images/hero-mechaniker.png";
export const BANNER_LOGO_WIDE = "/images/banner-logo-wide.jpg";
export const BANNER_SERVICES_WIDE = "/images/banner-services-wide.jpg";
export const BANNER_CAMPAIGN = "/images/banner-campaign.jpg";
export const SERVICE_INTERIOR = "/images/service-interior.jpg";

/** PNG fallback for bike/service assets exported as `.webp` + original `.png`. */
export function webpToRasterPng(webpPath: string): string {
  return webpPath.replace(/\.webp$/i, ".png");
}
