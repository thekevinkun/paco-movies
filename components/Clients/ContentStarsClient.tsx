"use client";

import dynamic from "next/dynamic";
import { Spinner } from "@components";

const ContentStars = dynamic(() => import("@contents/ContentStars"), {
  ssr: false,
  loading: () => <Spinner />,
});

export default ContentStars;