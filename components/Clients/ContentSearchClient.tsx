"use client";

import dynamic from "next/dynamic";
import { Spinner } from "@components";

const ContentSearch = dynamic(() => import("@sections/Contents/ContentSearch"), {
  ssr: false,
  loading: () => <Spinner />,
});

export default ContentSearch;