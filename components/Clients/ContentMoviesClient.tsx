"use client";

import dynamic from "next/dynamic";
import { Spinner } from "@components";

const ContentMovies = dynamic(() => import("@sections/Contents/ContentMovies"), {
  ssr: false,
  loading: () => <Spinner />,
});

export default ContentMovies;