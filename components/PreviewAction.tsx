"use client";

import { usePreview } from "@contexts/PreviewContext";

import { IPreviewAction } from "@types";

export default function PreviewAction({mediaType, id, containerStyles, children}: IPreviewAction) {
    const { open } = usePreview();

    return (
      <button 
        className={`cursor-pointer ${containerStyles}`}
        onClick={(e) => open(mediaType, id)}
      >
        {children}
      </button>
    );
}