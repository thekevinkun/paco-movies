"use client"

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import Image from "next/image";

const LoadMore = ({page, mediaType, category, query, onNextPage}: 
    { 
      page: number, mediaType: string, 
      category: string, query?: string, onNextPage: (items: any) => void
    }) => {

  const { ref, inView } = useInView();
  
  useEffect(() => {
    const loadNextPage = async () => {
      try {
        const response = await fetch(
          `/api/next-page?mediaType=${mediaType}&category=${category}&query=${query || ""}&page=${page + 1}`
        );
        const data = await response.json();

        if (response.ok) {
          onNextPage(data);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error("Error fetching next page:", error);
      }
    }

    if (inView) {
      loadNextPage();
    }
  }, [inView]);

  return (
    <div
      ref={ref}
      className="grow pb-10 flex flex-col items-center justify-center"
    >
      <Image
        priority
        unoptimized
        src="/icons/spinner.svg"
        alt="spinner"
        width={0}
        height={0}
        sizes="100vw"
        className="w-[50px] h-[50px] max-sm:w-[45px] max-sm:h-[45px] object-contain"
      />
    </div>
  )
}

export default LoadMore;