"use client"

import Image from "next/image";

const Loading = () => {
  return (
    <div className="h-[92vh] flex flex-col items-center justify-center">
        <Image
            src="/icons/spinner.svg"
            alt="Loading Spinner"
            width={75}
            height={75}
            className="object-contain"
        />
    </div>
  )
}

export default Loading;