"use client"

import Image from "next/image";
import { useState } from "react";

import type { FallbackImageProps } from "@types";

export default function FallbackImage({ src, mediaType, sizes, ...rest }: FallbackImageProps) {
  const imgSize = rest.alt === "poster" ? "w342" 
    : rest.alt === "backdrop" ? "w780" : rest.alt === "profile" ? "h632" : "w300";

  const fallbackSrc =
    mediaType === "person"
      ? "/images/not-found-person.png"
      : "/images/not-found-poster.jpg";

  const tmdbUrl = src && src.startsWith('/')
    ? `https://image.tmdb.org/t/p/${imgSize}${src}`
    : null;

  const [imgSrc, setImgSrc] = useState(tmdbUrl || fallbackSrc);

  return (
    <Image
      {...rest}
      src={imgSrc}
      sizes={sizes}
      onError={() => {
        console.error('Image failed to load, switching to fallback:', imgSrc);
        setImgSrc(fallbackSrc);
      }}
      alt={rest.alt || "Image"}
      unoptimized={!!tmdbUrl}
    />
  );
}
