"use client";

import dynamic from "next/dynamic";
import { Spinner } from "@components";

const ContentMovies = dynamic(() => import("@contents/ContentMovies"), {
  ssr: false,
  loading: () => <Spinner />,
});

export default ContentMovies;
