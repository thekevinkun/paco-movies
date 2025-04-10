"use client"

import { useInView } from "react-intersection-observer";
 
import Image from "next/image";

const LoadMore = () => {
  const { ref, inView } = useInView();
  
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