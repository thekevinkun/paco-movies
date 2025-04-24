"use client"

import Image from "next/image";
import { useState } from "react";

import { FallbackImageProps } from "@types";

export default function FallbackImage({ src, mediaType, sizes, ...rest }: FallbackImageProps) {
  const imgSize = rest.alt === "poster" ? "w500" 
    : rest.alt === "backdrop" ? "w780" : "original";

  const fallbackSrc =
    mediaType === "person"
      ? "/images/not-found-person.png"
      : "/images/not-found-poster.jpg";

  const [imgSrc, setImgSrc] = useState(
    src ? `https://image.tmdb.org/t/p/${imgSize}${src}` : fallbackSrc)

  return (
    <Image
      {...rest}
      src={imgSrc}
      sizes={sizes}
      onError={() => setImgSrc(fallbackSrc)}
      alt={rest.alt || "Image"}
    />
  );
}
