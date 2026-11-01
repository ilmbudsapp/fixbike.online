type ScenePhotoProps = {
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

export default function ScenePhoto({
  srcBase,
  alt,
  width = 1672,
  height = 941,
  loading = "lazy",
  fetchPriority,
  sizes = "100vw",
  className,
  objectPosition,
}: ScenePhotoProps) {
  const webp = `${srcBase}.webp`;
  const webpSmall = `${srcBase}-960.webp`;
  const jpg = `${srcBase}.jpg`;
  const resolvedLoading = fetchPriority === "high" ? "eager" : loading;

  return (
    <picture>
      <source
        type="image/webp"
        srcSet={`${webpSmall} 960w, ${webp} 1672w`}
        sizes={sizes}
      />
      <img
        src={jpg}
        srcSet={`${jpg} ${width}w`}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={resolvedLoading}
        decoding="async"
        fetchPriority={fetchPriority}
        style={objectPosition ? { objectPosition } : undefined}
      />
    </picture>
  );
}
