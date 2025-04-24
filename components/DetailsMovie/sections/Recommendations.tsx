"use client"

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { FallbackImage } from "@components";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

import { FaPlay } from "react-icons/fa";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";

import { roundedToFixed } from "@helpers/helpers";

const getRecommendations = (data: any) => {
  return data.slice(0, 10).map((item: any) => (
    <div 
      key={item.id} 
      className={`${data.length > 5 && "keen-slider__slide min-w-0 shrink-0"}`}
    >
      <div className="flex flex-col">
        <Link
          href={`/title/${item.media_type}/${item.id + "-" + 
              (item.title || item.name)?.toLowerCase().replace(/[^A-Z0-9]+/ig, "-")}`}
          className="relative bg-dark w-full h-[335px] 
            max-lg:h-[285px] max-md:h-[265px] max-sm:h-[235px]"
        >
          <FallbackImage
            src={item.poster_path}
            mediaType={item.media_type}
            alt="poster"
            fill
            sizes="(max-width: 540px) 50vw,
              (max-width: 768px) 32vw,
              (max-width: 1024px) 26vw,
              24vw"
            placeholder="blur"
            blurDataURL="/images/blur.jpg"
            className="object-cover opacity-90"
          />
        </Link>

        <div className="px-2 py-3 w-auto h-auto bg-light 
          border border-t-0 border-gray-300 rounded-b-lg"
        >
          <div className="flex items-center gap-1">
            <Image
              src="/icons/star.svg"
              alt="rating star"
              width={18}
              height={18}
              className="relative object-contain bottom-[1px]"
            />

            <span 
              className={`text-dark-1
                ${item.vote_average > 0 ? "font-medium" : "font-normal italic"}`}
            >
              {item.vote_average > 0 ? roundedToFixed(item.vote_average, 1) : "NaN"}
            </span>
          </div>

          <Link 
            href={`/title/${item.media_type}/${item.id + "-" + 
                (item.title || item.name)?.toLowerCase().replace(/[^A-Z0-9]+/ig, "-")}`}
            title={item.title || item.name} 
            className="pt-3 inline-block w-fit"
          >
            <h2 className="line-clamp-1 text-dark 
                max-md:text-sm font-semibold hover:text-tale"
            >
                {item.title || item.name}
            </h2>
          </Link>
                    
          <div className="pt-5 pb-3 max-md:pt-4 max-md:pb-2 max-sm:pt-3 px-7 
              flex items-center justify-between"
          >
            <Link
              href={`/title/${item.media_type}/${item.id + "-" + 
                  (item.title || item.name)?.toLowerCase().replace(/[^A-Z0-9]+/ig, "-")}`}
              className="flex items-center gap-2 max-sm:text-sm text-dark hover:text-light-2"
            >
              <FaPlay/>
              <span className="font-medium">Trailer</span>
            </Link>

            <AiOutlineExclamationCircle
              className="text-2xl max-sm:text-xl text-dark-1 hover:text-light-2 cursor-pointer"
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  ))
}

const Recommendations = ({recommendations}: any) => {
  // KEEN SLIDER SETUP
  const [currentSlide, setCurrentSlide] = useState(0);
  const [perView, setPerView] = useState(1);
  const [arrowDisabled, setArrowDisabled] = useState({ prev: true, next: false });
  
  const [sliderRef, slider] = useKeenSlider({
    loop: false,
    breakpoints: {
      "(max-width: 1280px)": {
        slides: { perView: 3.85, spacing: 15 },
      },
      "(max-width: 1198px)": {
        slides: { perView: 3.65, spacing: 15 },
      },
      "(max-width: 1118px)": {
        slides: { perView: 3.25, spacing: 15 },
      },
      "(max-width: 1024px)": {
        slides: { perView: 4.25, spacing: 13 },
      },
      "(max-width: 925px)": {
        slides: { perView: 3.65, spacing: 13 },
      },
      "(max-width: 768px)": {
        slides: { perView: 3.25, spacing: 12 },
      },
      "(max-width: 640px)": {
        slides: { perView: 3.15, spacing: 12 },
      },
      "(max-width: 540px)": {
        slides: { perView: 2.5, spacing: 12 },
      }
    },
    slides: {
      perView: 4.25,
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
  })

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
    <>
        <h3 className="mb-7 text-main text-2xl max-sm:text-xl font-semibold">
            Recommendations
        </h3>

        {recommendations.length < 5 ?
          // LESS MOVIE
          <div className="relative w-full flex items-center">
            {getRecommendations(recommendations)}
          </div>
        :
          // SLIDER MOVIE
          <div className="relative w-full px-3 max-md:px-0 
            max-w-[calc(100vw-(288px+55px))]
            max-xl:max-w-[calc(100vw-(256px+55px))]
            max-lg:max-w-full overflow-hidden"
          >
            <div ref={sliderRef} className="keen-slider">
              {getRecommendations(recommendations)}
            </div>

            {/* Arrow */}
            {/* Left arrow */}
            <button
              onClick={scrollLeft}
              className={`max-md:hidden absolute top-1/2 -translate-y-1/2 left-0 z-20
              bg-light/90 hover:bg-light/60 text-tale  
                p-4 rounded-sm transition-opacity duration-200
                ${arrowDisabled.prev ? "pointer-events-none !text-dark !opacity-10" : ""}`}
            >
              <MdArrowBackIosNew className="font-bold text-3xl"/>
            </button>

            {/* Right arrow */}
            <button
              onClick={scrollRight}
              className={`max-md:hidden absolute top-1/2 -translate-y-1/2 right-0 z-20
              bg-light/90 hover:bg-light/60 text-tale  
                p-4 rounded-sm transition-opacity duration-200
                ${arrowDisabled.next ? "pointer-events-none !text-dark !opacity-10" : ""}`}
            >
              <MdArrowForwardIos className="font-bold text-3xl"/>
            </button>
          </div>
        }
    </>
  )
}

export default Recommendations;