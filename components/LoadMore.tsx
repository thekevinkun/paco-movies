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
      className="grow pb-10 flex flex-col items-center justify-center"
    >
      <div ref={ref} className="relative w-[50px] h-[50px] max-sm:w-[45px] max-sm:h-[45px]">
        <Image
          src="/icons/spinner.svg"
          alt="Spinner Loading"
          fill
          sizes="(max-width: 640px) 45px, 50px"
          className="object-contain"
        />
      </div>
    </div>
  )
}

export default LoadMore;