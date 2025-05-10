"use client";

import Link from "next/link";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";

import { FallbackImage, PreviewAction } from "@components";

import type { CreditItem, IRecommendationsProps } from "@types";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useKeenSliderWithArrows } from "@lib/utils/useKeenSlider";
import { roundedToFixed, slugify } from "@lib/helpers/helpers";

const getRecommendations = (data: CreditItem[]) => {
  return data.map((item) => (
    <div key={item.id} className="keen-slider__slide min-w-0 shrink-0 h-full">
      <div className="flex flex-col h-full">
        <Link
          href={`/title/${item.media_type}/${item.id}-${slugify(
            item.title || item.name || "Untitled"
          )}`}
          className="relative bg-dark w-full h-[335px] 
            max-lg:h-[285px] max-md:h-[265px] max-sm:h-[230px]
            max-[425px]:h-[210px] max-[390px]:h-[185px]"
        >
          <FallbackImage
            src={item.poster_path}
            mediaType={item.media_type!}
            alt="poster"
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            placeholder="blur"
            blurDataURL="/images/blur.jpg"
            className="object-cover opacity-90"
          />
        </Link>

        <div
          className="px-2 py-3 w-auto h-auto bg-light 
          border-b border-gray-300 rounded-b-lg
          shadow-inner shadow-dark-1"
        >
          <div className="flex items-center gap-1">
            <Image
              src="/icons/star.svg"
              alt="rating star"
              width={18}
              height={18}
              sizes="18px"
              className="relative object-contain bottom-[1px]"
            />

            <span
              className={`text-dark-1 max-sm:text-sm
                ${
                  item.vote_average && item.vote_average > 0
                    ? "font-medium"
                    : "font-normal italic"
                }`}
            >
              {item.vote_average && item.vote_average > 0
                ? roundedToFixed(item.vote_average, 1)
                : "NaN"}
            </span>
          </div>

          <Link
            href={`/title/${item.media_type}/${item.id}-${slugify(
              item.title || item.name || "Untitled"
            )}`}
            title={item.title || item.name}
            className="w-fit pt-3 line-clamp-1"
          >
            <h2
              className="font-semibold text-dark max-md:text-sm
                max-sm:text-xs hover:text-tale"
            >
              {item.title || item.name}
            </h2>
          </Link>

          <div
            className="pt-7 pb-3 max-md:pb-2 
              px-7 max-[830px]:px-5 max-sm:pt-5 max-[425px]:px-3
              flex items-center justify-between"
          >
            <Link
              href={`/title/${item.media_type}/${item.id}-${slugify(
                item.title || item.name || "Untitled"
              )}#`}
              className="py-1 px-2 flex items-center gap-2 max-sm:text-xs text-dark
               bg-transparent hover:bg-tale/75 transition-colors duration-100 rounded-md"
            >
              <FaPlay />
              <span className="font-medium">Trailer</span>
            </Link>

            <PreviewAction
              mediaType={item.media_type!}
              id={item.id}
              containerStyles="text-2xl max-sm:text-lg text-dark-1 hover:text-light-2"
            >
              <AiOutlineExclamationCircle />
            </PreviewAction>
          </div>
        </div>
      </div>
    </div>
  ));
};

const Recommendations = ({ recommendations }: IRecommendationsProps) => {
  // KEEN SLIDER SETUP
  const { arrowDisabled, updateArrows } = useKeenSliderWithArrows();

  const [sliderRef, slider] = useKeenSlider({
    loop: false,
    breakpoints: {
      "(max-width: 1281px)": {
        slides: { perView: 3.85, spacing: 15 },
      },
      "(max-width: 1199px)": {
        slides: { perView: 3.65, spacing: 15 },
      },
      "(max-width: 1119px)": {
        slides: { perView: 3.25, spacing: 15 },
      },
      "(max-width: 1025px)": {
        slides: { perView: 4.25, spacing: 13 },
      },
      "(max-width: 926px)": {
        slides: { perView: 3.5, spacing: 13 },
      },
      "(max-width: 769px)": {
        slides: { perView: 3.25, spacing: 12 },
      },
      "(max-width: 641px)": {
        slides: { perView: 3.15, spacing: 12 },
      },
      "(max-width: 541px)": {
        slides: { perView: 2.5, spacing: 12 },
      },
      "(max-width: 390px)": {
        slides: { perView: 2.35, spacing: 12 },
      }
    },
    slides: {
      perView: 4.25,
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

  return (
    <>
      <h3 className="mb-7 text-main text-2xl max-sm:text-xl font-semibold">
        Recommendations
      </h3>

      {/* SLIDER MOVIE */}
      <div
        className="relative w-full px-3 max-md:px-0 
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
          bg-main/90 hover:bg-main/60 text-tale  
            p-4 rounded-sm transition-opacity duration-200
            ${
              arrowDisabled.prev
                ? "pointer-events-none !text-dark !opacity-10"
                : ""
            }`}
        >
          <MdArrowBackIosNew className="font-bold text-3xl" />
        </button>

        {/* Right arrow */}
        <button
          onClick={scrollRight}
          className={`max-md:hidden absolute top-1/2 -translate-y-1/2 right-0 z-20
          bg-main/90 hover:bg-main/60 text-tale  
            p-4 rounded-sm transition-opacity duration-200
            ${
              arrowDisabled.next
                ? "pointer-events-none !text-dark !opacity-10"
                : ""
            }`}
        >
          <MdArrowForwardIos className="font-bold text-3xl" />
        </button>
      </div>
    </>
  );
};

export default Recommendations;
