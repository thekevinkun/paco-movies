"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

import { IoMdPlay } from "react-icons/io";
import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";

const getMainVideos = (videos: any) => {
  return (
    <div 
      className="grid grid-cols-8 gap-x-[15px]
        grid-rows-[275px] max-xl:grid-rows-[255px]"
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
    </div>
  )
}

const getVideosSlider = (start: number, videos: any) => {
  return videos.slice(start, 10).map((video: any) => (
    <div
      key={video.id}
      style={{
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url('https://i.ytimg.com/vi/${video.key}/hqdefault.jpg')`
      }}
      className="keen-slider__slide min-w-0 shrink-0 rounded-xl
        h-[165px] max-lg:h-[175px] max-md:h-[170px] max-sm:h-[150px]" 
    >
      <div className="h-full flex items-center justify-center">
        <Link
          href={`/video/play?key=${video.key}`}
          className="group"
          data-site={video.site}
          data-id={video.key}
          data-title={video.name}
        >
          <div className="w-[55px] h-[55px] max-sm:w-[45px] max-sm:h-[45px]
            flex items-center justify-center rounded-full 
            bg-dark bg-opacity-70 group-hover:bg-opacity-100 transition-[background] duration-200"
          >
            <IoMdPlay className="text-light text-2xl max-sm:text-xl"/>
          </div>
        </Link>
      </div>
    </div>
  ));
}

const Videos = ({movieId, mediaType, title, videos}: 
      {movieId: number, mediaType: string, title: string, videos: any}) => {
    
    // DYNAMIC RESIZE SCREEN SETUP
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth < 1024);
      handleResize(); // run once on mount
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    const startIndex = isMobile ? 0 : 3;

    // KEEN SLIDER SETUP
    const [currentSlide, setCurrentSlide] = useState(0);
    const [perView, setPerView] = useState(1);
    const [arrowDisabled, setArrowDisabled] = useState({ prev: true, next: false });
  
    const [sliderRef, slider] = useKeenSlider({
      loop: false,
      breakpoints: {
        "(max-width: 768px)": {
          slides: { perView: 2.25, spacing: 12 },
        },
      },
      slides: {
        perView: 3.25,
        spacing: 15
      },
      mode: "free-snap",
      created(s) {
        updateArrows(s)
      },
      updated(s) {
        updateArrows(s)
      },
      slideChanged(s) {
        setCurrentSlide(s.track.details.rel);
        updateArrows(s);
      }
    });
  
    const updateArrows = (s: any) => {
      const rel = s.track.details.rel;
      const slideCount = s.track.details.slides.length;
  
      let dynamicPerView = 1;
      const slidesOption = s.options?.slides;
  
      if (typeof slidesOption?.perView === "number") {
        dynamicPerView = slidesOption.perView;
      } else if (typeof slidesOption?.perView === "function") {
        dynamicPerView = slidesOption.perView(window.innerWidth, s.track.details.slides);
      }
  
      setPerView(dynamicPerView);
  
      const atStart = rel === 0;
      const atEnd = rel >= slideCount - Math.ceil(dynamicPerView - 1);
  
      setArrowDisabled({ prev: atStart, next: atEnd });
    }
  
    const scrollLeft = () => slider.current?.prev();
    const scrollRight = () => slider.current?.next();

  return (
    <div className="w-full">
      <Link 
        href={`/title/${mediaType}/${movieId + "-" 
          + title.toLowerCase().replace(/[^A-Z0-9]+/ig, "-")}/videogallery`} 
        className="mb-7 group flex items-center w-fit"
      >
        <h3 className="text-main text-2xl max-sm:text-xl font-semibold">Videos</h3>
        <span className="pl-3 text-xs text-main-1">{videos.length}</span>

        <MdArrowForwardIos 
          className="text-main text-3xl max-sm:text-2xl font-semibold 
            transition-colors duration-200 group-hover:text-tale"
        />
      </Link>

      {/* DESKTOP VIDEOS */}
      <div>
          {/* Two main video */}
          <div className="mb-5 max-lg:hidden">
            {getMainVideos(videos)}
          </div>
          
          {/* Slider */}
          <div className="relative w-full px-3 max-md:px-0 max-w-[calc(100vw-(288px+55px))]
            max-xl:max-w-[calc(100vw-(256px+55px))] max-lg:max-w-full overflow-hidden"
          >
            {/* DESKTOP SLIDER */}
            <div ref={sliderRef} className="keen-slider">
              {getVideosSlider(startIndex, videos)}
            </div>

            {/* Arrow */}
            {/* Left arrow */}
            <button
              onClick={scrollLeft}
              className={`max-md:hidden absolute top-1/2 -translate-y-1/2 left-0 z-20
                bg-light/90 hover:bg-light/60 text-tale  
                p-3 rounded-sm transition-opacity duration-200
                  ${arrowDisabled.prev ? "pointer-events-none !text-dark !opacity-10" : ""}`}
            >
              <MdArrowBackIosNew className="font-bold text-2xl"/>
            </button>

            {/* Right arrow */}
            <button
              onClick={scrollRight}
              className={`max-md:hidden absolute top-1/2 -translate-y-1/2 right-0 z-20
                bg-light/90 hover:bg-light/60 text-tale  
                p-3 rounded-sm transition-opacity duration-200
                ${arrowDisabled.next ? "pointer-events-none !text-dark !opacity-10" : ""}`}
            >
              <MdArrowForwardIos className="font-bold text-2xl"/>
            </button>
          </div>
      </div>
    </div>
  )
}

export default Videos;