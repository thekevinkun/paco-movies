"use client"

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

import { IoMdPlay } from "react-icons/io";
import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";

const getVideosDesktop = (videos: any) => {
  return (
    <div 
      className="grid grid-cols-8 gap-x-4 gap-y-7 max-xl:gap-x-3 max-xl:gap-y-5
        grid-rows-[275px,165px] max-xl:grid-rows-[255px,145px]"
    >
      {videos.slice(0, 2).map((video: any) => (
        <div key={video.key} className="relative bg-dark col-span-4 rounded-xl">
          <Image
            priority
            unoptimized
            loader={() => `https://i.ytimg.com/vi/${video.key}/hqdefault.jpg`}
            src={`https://i.ytimg.com/vi/${video.key}/hqdefault.jpg`}
            alt="Video thumbnail"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-full object-cover rounded-xl opacity-95"
          />

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Link
              href={`/video/play?key=${video.key}`}
              className="group"
              data-site={video.site}
              data-id={video.key}
              data-title={video.name}
            >
              <div className="w-[75px] h-[75px] flex items-center justify-center rounded-full 
                  bg-dark bg-opacity-70 group-hover:bg-opacity-100 transition-[background] duration-200">
                <IoMdPlay className="text-light text-4xl"/>
              </div>
            </Link>
          </div>
        </div>
      ))}
      
      {videos.slice(3, 7).map((video: any) => (
        <div key={video.key} className="relative bg-dark col-span-2 rounded-xl">
          <Image
            priority
            unoptimized
            loader={() => `https://i.ytimg.com/vi/${video.key}/hqdefault.jpg`}
            src={`https://i.ytimg.com/vi/${video.key}/hqdefault.jpg`}
            alt="Video thumbnail"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-full object-cover rounded-xl opacity-95"
          />

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Link
              href={`/video/play?key=${video.key}`}
              className="group"
              data-site={video.site}
              data-id={video.key}
              data-title={video.name}
            >
              <div className="w-[50px] h-[50px] flex items-center justify-center rounded-full 
                  bg-dark bg-opacity-70 group-hover:bg-opacity-100 transition-[background] duration-200">
                <IoMdPlay className="text-light text-2xl"/>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

const getVideosMobile = (videos: any) => {
  return videos.slice(0, 10).map((video: any) => (
    <div
      key={video.id}
      style={{
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url('https://i.ytimg.com/vi/${video.key}/hqdefault.jpg')`
      }}
      className="keen-slider__slide flex-shrink-0 rounded-xl
        h-[187px] max-md:h-[185px] max-sm:h-[195px]" 
    >
      <div className="h-full flex items-center justify-center">
        <Link
          href={`/video/play?key=${video.key}`}
          className="group"
          data-site={video.site}
          data-id={video.key}
          data-title={video.name}
        >
          <div className="w-[67px] h-[67px] max-md:w-[60px] max-md:h-[60px] max-sm:w-[55px] max-sm:h-[55px]
              flex items-center justify-center rounded-full 
              bg-dark bg-opacity-70 group-hover:bg-opacity-100 transition-[background] duration-200">
            <IoMdPlay className="text-light text-4xl max-md:text-3xl max-sm:text-2xl"/>
          </div>
        </Link>
      </div>
    </div>
  ));
};

const Videos = ({movieId, mediaType, title, videos}: 
      {movieId: number, mediaType: string, title: string, videos: any}) => {
  
  const [currentSlide, setCurrentSlide] = useState(0)
  const [sliderRef, slider] = useKeenSlider({
    loop: false,
    breakpoints: {
      
      "(max-width: 768px)": {
        slides: { perView: 2.15, spacing: 12 },
      },
      "(max-width: 640px)": {
        slides: { perView: 1.70, spacing: 12 },
      },
    },
    slides: {
      perView: 3.15,
      spacing: 13
    },
    mode: "free-snap",
    slideChanged: (s) => setCurrentSlide(s.track.details.rel)
  })

  const totalSlides = Math.ceil(videos.slice(0, 10).length / 3)

  const scrollLeft = () => slider.current?.prev()
  const scrollRight = () => slider.current?.next()

  return (
    <div className="w-full overflow-x-hidden">
      <Link 
        href={`/title/${mediaType}/${movieId + "-" 
          + title.toLowerCase().replace(/[^A-Z0-9]+/ig, "-")}/videogallery`} 
        className="group flex items-center w-fit"
      >
        <h3 className="text-main text-2xl max-sm:text-xl font-semibold">Videos</h3>
        <span className="pl-3 text-xs text-main-1">{videos.length}</span>

        <MdArrowForwardIos 
          className="text-main text-3xl max-sm:text-2xl font-semibold 
            transition-colors duration-200 group-hover:text-tale"
        />
      </Link>

      {/* DESKTOP MOBILE */}
      <div className="pt-7 max-lg:hidden">
          {getVideosDesktop(videos)}
      </div>
      
      {/* CAROUSEL MOBILE */}
      <div 
        className="hidden max-lg:block relative pt-7 max-md:pt-5 overflow-hidden 
          h-[18rem] max-md:h-full max-w-full"
      >
        {/* Slider */}
        <div ref={sliderRef} className="keen-slider">
          {getVideosMobile(videos)}
        </div>

        {/* Arrow */}
        <div className="max-md:hidden absolute right-0 bottom-0 z-10">
          {/* Left arrow */}
          <button
            onClick={scrollLeft}
            className={`mr-3 bg-light/85 hover:bg-light/5 text-dark hover:text-tale 
                p-3 rounded-full opacity-50 hover:opacity-100 transition-opacity duration-200
                ${currentSlide < 1 && "pointer-events-none !opacity-10"}`}
          >
            <MdArrowBackIosNew className="font-bold text-xl"/>
          </button>

          {/* Right arrow */}
          <button
              onClick={scrollRight}
              className={`bg-light/85 hover:bg-light/5 text-dark hover:text-tale  
                p-3 rounded-full opacity-50 hover:opacity-100 transition-opacity duration-200
                ${currentSlide > 6 && "pointer-events-none opacity-10"}`}
          >
            <MdArrowForwardIos className="font-bold text-xl"/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Videos;