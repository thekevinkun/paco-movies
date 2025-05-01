"use client";

import Link from "next/link";
import { useVideo } from "@contexts/VideoContext";

import { IVideoAction } from "@types";

export default function VideoAction({
    href,
    videoKey,
    videoTitle,
    containerStyles,
    children,
  }: IVideoAction) {
    const { open } = useVideo();

    return (
      <Link 
        href={href}
        className={containerStyles}
        onClick={(e) => {
          e.preventDefault()
          open(videoKey, videoTitle)
        }}
      >
        {children}
      </Link>
    );
}