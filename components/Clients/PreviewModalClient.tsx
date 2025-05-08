"use client";

import dynamic from "next/dynamic";

import { Spinner } from "@components";

// Dynamically import with no SSR
const PreviewModal = dynamic(() => import("@components/PreviewModal"), {
  ssr: false,
  loading: () => <Spinner />,
});

const PreviewModalClient = () => {
  return <PreviewModal />;
};

export default PreviewModalClient;
