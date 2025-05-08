"use client";

import { useMediaQuery } from "react-responsive";
import Link from "next/link";
import Image from "next/image";
import { IoMdPlay } from "react-icons/io";
import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";

import { VideoAction } from "@components";

import type { VideoItem, IVideosProps } from "@types";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useKeenSliderWithArrows } from "@lib/utils/useKeenSlider";
import { slugify } from "@lib/helpers/helpers";

const getMainVideos = (videos: VideoItem[], route: string) => {
  return (
    <div
      className="grid grid-cols-8 gap-x-[15px]
        grid-rows-[275px] max-xl:grid-rows-[255px] 
        max-md:grid-rows-[220px] max-sm:grid-rows-[165px]"
    >
      {videos.slice(0, 2).map((video) => (
        <div key={video.key} className="relative bg-dark col-span-4 rounded-xl">
          <Image
            unoptimized
            loader={() => `https://i.ytimg.com/vi/${video.key}/hqdefault.jpg`}
            src={`https://i.ytimg.com/vi/${video.key}/hqdefault.jpg`}
            alt="Video thumbnail"
            width={0}
            height={0}
            sizes="50vw"
            className="w-full h-full object-cover rounded-xl opacity-95"
          />

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <VideoAction
              href={`${route}#play=${video.key}`}
              videoKey={video.key}
              videoTitle={video.name}
              containerStyles="group"
            >
              <div
                className="w-[75px] h-[75px] max-lg:w-[60px] 
                  max-lg:h-[60px] max-sm:w-[50px] max-sm:h-[50px] 
                  flex items-center justify-center rounded-full 
                  bg-dark bg-opacity-70 group-hover:bg-opacity-100 
                  transition-[background] duration-200"
              >
                <IoMdPlay className="text-light text-4xl max-lg:text-3xl max-sm:text-2xl" />
              </div>
            </VideoAction>
          </div>
        </div>
      ))}
    </div>
  );
};

const getVideosSlider = (start: number, videos: VideoItem[], route: string) => {
  return videos.slice(start, 10).map((video) => (
    <div
      key={video.id}
      style={{
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url('https://i.ytimg.com/vi/${video.key}/hqdefault.jpg')`,
      }}
      className="keen-slider__slide min-w-0 shrink-0
        rounded-xl h-[165px] max-lg:h-[175px] max-md:h-[170px] max-sm:h-[150px]"
    >
      <div className="h-full flex items-center justify-center">
        <VideoAction
          href={`${route}#play=${video.key}`}
          videoKey={video.key}
          videoTitle={video.name}
          containerStyles="group"
        >
          <div
            className="w-[55px] h-[55px] max-sm:w-[45px] max-sm:h-[45px]
              flex items-center justify-center rounded-full 
              bg-dark bg-opacity-70 group-hover:bg-opacity-100 transition-[background] duration-200"
          >
            <IoMdPlay className="text-light text-2xl max-sm:text-xl" />
          </div>
        </VideoAction>
      </div>
    </div>
  ));
};

const Videos = ({ id, mediaType, title, videos }: IVideosProps) => {
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  const startIndexVideoSlider = isMobile ? 0 : 2;

  // KEEN SLIDER SETUP
  const { arrowDisabled, updateArrows } = useKeenSliderWithArrows();

  const [sliderRef, slider] = useKeenSlider({
    loop: false,
    breakpoints: {
      "(max-width: 768px)": {
        slides: { perView: 2.25, spacing: 12 },
      },
    },
    slides: {
      perView: 3.25,
      spacing: 15,
    },
    mode: "free-snap",
    created(s) {
      updateArrows(s);
    },
    updated(s) {
      updateArrows(s);
    },
    slideChanged(s) {
      updateArrows(s);
    },
  });

  const scrollLeft = () => slider.current?.prev();
  const scrollRight = () => slider.current?.next();

  const route = `/title/${mediaType}/${id}-${slugify(title)}`;

  return (
    <>
      <Link
        href={`${route}/videogallery`}
        className="mb-7 group flex items-center w-fit"
      >
        <h3 className="text-main text-2xl max-sm:text-xl font-semibold">
          Videos
        </h3>
        <span className="pl-3 text-xs text-main-1">{videos?.length}</span>

        <MdArrowForwardIos
          className="text-main text-3xl max-sm:text-2xl font-semibold 
            transition-colors duration-200 group-hover:text-tale"
        />
      </Link>

      <div>
        {/* Two main video */}
        <div
          className={`${videos && videos.length > 2 && "mb-5 max-lg:hidden "}`}
        >
          {getMainVideos(videos!, route)}
        </div>

        {videos && videos.length > 2 && (
          <div
            className={`${
              (videos.length > 5 || (videos.length >= 3 && isMobile)) &&
              "px-3 max-md:px-0"
            }
              relative w-full max-w-[calc(100vw-(288px+55px))]
              max-xl:max-w-[calc(100vw-(256px+55px))] max-lg:max-w-full overflow-hidden`}
          >
            <div ref={sliderRef} className="keen-slider">
              {getVideosSlider(startIndexVideoSlider, videos, route)}
            </div>

            {/* Arrow */}
            {/* Left arrow */}
            {(videos.length > 5 || (videos.length > 3 && isMobile)) && (
              <>
                <button
                  onClick={scrollLeft}
                  className={`max-md:hidden absolute top-1/2 -translate-y-1/2 left-0 z-20
                    bg-main/90 hover:bg-main/60 text-tale  
                    p-3 rounded-sm transition-opacity duration-200
                      ${
                        arrowDisabled.prev
                          ? "pointer-events-none !text-dark !opacity-10"
                          : ""
                      }`}
                >
                  <MdArrowBackIosNew className="font-bold text-2xl" />
                </button>

                {/* Right arrow */}
                <button
                  onClick={scrollRight}
                  className={`max-md:hidden absolute top-1/2 -translate-y-1/2 right-0 z-20
                    bg-main/90 hover:bg-main/60 text-tale  
                    p-3 rounded-sm transition-opacity duration-200
                    ${
                      arrowDisabled.next
                        ? "pointer-events-none !text-dark !opacity-10"
                        : ""
                    }`}
                >
                  <MdArrowForwardIos className="font-bold text-2xl" />
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Videos;
