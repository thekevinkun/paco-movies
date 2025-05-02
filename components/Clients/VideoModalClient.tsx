"use client";

import dynamic from "next/dynamic";

// Dynamically import with no SSR
const VideoModal = dynamic(() => import("@components/VideoModal"), {
  ssr: false,
  loading: () => null,
});

const VideoModalClient = () => {
  return <VideoModal />;
};

export default VideoModalClient;