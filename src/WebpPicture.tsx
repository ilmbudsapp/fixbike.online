/**
 * Raster images (PNG/JPG). Optional `webpSrc` is kept for future `<picture>` when .webp
 * files exist on the host — serving a missing .webp via `<source>` breaks some browsers.
 */

type WebpPictureProps = {
  webpSrc: string;
  fallbackSrc: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  imgClassName?: string;
  loading?: "lazy" | "eager";
  decoding?: "async" | "auto";
  fetchPriority?: "high" | "low" | "auto";
  sizes?: string;
};

export default function WebpPicture({
  webpSrc,
  fallbackSrc,
  alt,
  width,
  height,
  className,
  imgClassName,
  loading,
  decoding,
  fetchPriority,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 640px",
}: WebpPictureProps) {
  void webpSrc;
  const mergedClass =
    [className, imgClassName].filter(Boolean).join(" ").trim() || undefined;
  const fallbackSrcSet = `${fallbackSrc} 480w, ${fallbackSrc} 768w, ${fallbackSrc} 1200w`;

  return (
    <img
      src={fallbackSrc}
      srcSet={fallbackSrcSet}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      className={mergedClass}
      loading={loading}
      decoding={decoding}
      fetchPriority={fetchPriority}
      referrerPolicy="strict-origin-when-cross-origin"
    />
  );
}
