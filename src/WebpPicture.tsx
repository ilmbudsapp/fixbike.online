/**
 * Prefer WebP with raster fallback (PNG/JPG) until .webp assets exist in /public/images.
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
  return (
    <picture className={className}>
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={fallbackSrc}
        alt={alt}
        width={width}
        height={height}
        className={imgClassName}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
      />
    </picture>
  );
}
