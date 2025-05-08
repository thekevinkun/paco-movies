"use client";

import { usePreview } from "@contexts/PreviewContext";

import type { PreviewActionProps } from "@types";

export default function PreviewAction({
  mediaType,
  id,
  containerStyles,
  children,
}: PreviewActionProps) {
  const { open } = usePreview();

  return (
    <button
      className={`cursor-pointer ${containerStyles}`}
      onClick={() => open(mediaType, id)}
    >
      {children}
    </button>
  );
}
