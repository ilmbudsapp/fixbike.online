import { useEffect, useRef, useState } from "react";

import { HERO_VIDEO_DESKTOP, HERO_VIDEO_MOBILE } from "./imagePaths";
import ScenePhoto from "./ScenePhoto";

const NARROW = "(max-width: 899px)";
const REDUCE = "(prefers-reduced-motion: reduce)";

export default function HeroStage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [clip, setClip] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia(REDUCE);
    const narrow = window.matchMedia(NARROW);
    const apply = () => {
      setPlaying(false);
      setClip(reduce.matches ? null : narrow.matches ? HERO_VIDEO_MOBILE : HERO_VIDEO_DESKTOP);
    };
    apply();
    reduce.addEventListener("change", apply);
    narrow.addEventListener("change", apply);
    return () => {
      reduce.removeEventListener("change", apply);
      narrow.removeEventListener("change", apply);
    };
  }, []);

  useEffect(() => {
    const node = videoRef.current;
    if (!node || !clip) return;
    node.muted = true;
    node.defaultMuted = true;
    node.playbackRate = clip === HERO_VIDEO_DESKTOP ? 0.55 : 1;
    const start = () => {
      node.playbackRate = clip === HERO_VIDEO_DESKTOP ? 0.55 : 1;
      node.play().catch(() => undefined);
    };
    if (node.readyState >= 2) start();
    else node.addEventListener("canplay", start);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start();
      else node.pause();
    });
    observer.observe(node);
    return () => {
      node.removeEventListener("canplay", start);
      observer.disconnect();
    };
  }, [clip]);

  return (
    <figure className={playing ? "hero__stage is-playing" : "hero__stage"}>
      <ScenePhoto
        srcBase="/images/hero/fixbike-hero-2-cube"
        alt=""
        className="hero__photo"
        loading="eager"
        fetchPriority="high"
        sizes="100vw"
      />
      {clip ? (
        <video
          key={clip}
          ref={videoRef}
          className="hero__photo hero__video"
          src={clip}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          onPlaying={() => setPlaying(true)}
          onError={() => setClip(null)}
        />
      ) : null}
      <span className="hero__veil" aria-hidden="true" />
    </figure>
  );
}
