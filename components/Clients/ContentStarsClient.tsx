"use client";

import dynamic from "next/dynamic";
import { Spinner } from "@components";

const ContentStars = dynamic(() => import("@sections/Contents/ContentStars"), {
  ssr: false,
  loading: () => <Spinner />,
});

export default ContentStars;