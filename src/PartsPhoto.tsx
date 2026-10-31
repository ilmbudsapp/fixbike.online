type PartsPhotoProps = {
  srcBase: string;
  alt: string;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  sizes?: string;
  className?: string;
  objectPosition?: string;
};

export default function PartsPhoto({
  srcBase,
  alt,
  width = 1536,
  height = 1024,
  loading = "lazy",
  fetchPriority,
  sizes = "(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 560px",
  className,
  objectPosition = "50% 50%",
}: PartsPhotoProps) {
  const webp = `${srcBase}.webp`;
  const jpg = `${srcBase}.jpg`;
  const resolvedLoading = fetchPriority === "high" ? "eager" : loading;

  return (
    <picture>
      <source type="image/webp" srcSet={`${webp} 1600w`} sizes={sizes} />
      <img
        src={jpg}
        srcSet={`${jpg} 1200w`}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={resolvedLoading}
        decoding="async"
        fetchPriority={fetchPriority}
        style={{ objectPosition }}
      />
    </picture>
  );
}
