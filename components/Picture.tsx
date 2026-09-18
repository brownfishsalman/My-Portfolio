import Image from "next/image";
import type { Picture as PictureType } from "@/lib/types";

type Props = {
  picture: PictureType;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/** Renders a local figure or a Sanity-hosted image with the right loader. */
export function Picture({ picture, sizes = "(max-width: 767px) 90vw, 60vw", priority, className }: Props) {
  const isSvg = picture.local || picture.url.endsWith(".svg") || picture.url.includes("format=svg");
  return (
    <Image
      src={picture.url}
      alt={picture.alt}
      width={picture.width}
      height={picture.height}
      sizes={sizes}
      priority={priority}
      unoptimized={isSvg}
      className={className}
    />
  );
}
