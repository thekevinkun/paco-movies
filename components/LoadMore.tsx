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
        src="/icons/spinner.svg"
        alt="spinner"
        width={50}
        height={50}
        className="object-contain"
      />
    </div>
  )
}

export default LoadMore;