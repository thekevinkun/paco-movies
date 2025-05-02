"use client";

import dynamic from "next/dynamic";
import { Spinner } from "@components";

const ContentDetails = dynamic(() => import("@sections/Contents/ContentDetails"), {
  ssr: false,
  loading: () => <Spinner />,
});

export default ContentDetails;