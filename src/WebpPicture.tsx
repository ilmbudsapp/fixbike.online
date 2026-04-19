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
}: WebpPictureProps) {
  void webpSrc;
  const mergedClass =
    [className, imgClassName].filter(Boolean).join(" ").trim() || undefined;

  return (
    <img
      src={fallbackSrc}
      alt={alt}
      width={width}
      height={height}
      className={mergedClass}
      loading={loading}
      decoding={decoding}
      fetchPriority={fetchPriority}
    />
  );
}
