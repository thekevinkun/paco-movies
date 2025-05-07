"use client"

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

import type { LoadMoreProps, CachedNextPageResponse, ITMDBError } from "@types";

const LoadMore = ({page, mediaType, category, query, onNextPage}: LoadMoreProps) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    const loadNextPage = async () => {
      try {
        const response = await fetch(
          `/api/next-page?mediaType=${mediaType}&category=${category}&query=${query || ""}&page=${page + 1}`
        );
        const data: CachedNextPageResponse & Partial<ITMDBError> = await response.json();

        if (response.ok) {
          onNextPage(data);
        } else {
          console.error(data.status_message);
        }
      } catch (error) {
        console.error("Error fetching next page:", error);
      }
    }

    if (inView) {
      loadNextPage();
    }
  }, [inView]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className="grow pb-10 flex flex-col items-center justify-center"
    >
      <div ref={ref} className="relative w-[50px] h-[50px] max-sm:w-[45px] max-sm:h-[45px]">
        <Image
          src="/icons/spinner.svg"
          alt="Spinner Loading"
          width={0}
          height={0}
          sizes="(min-width: 640px) 50px, 45px"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  )
}

export default LoadMore;