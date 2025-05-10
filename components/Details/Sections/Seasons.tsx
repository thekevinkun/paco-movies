"use client";

import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";

import { FallbackImage } from "@components";

import type { SeasonItem, ISeasonsProps } from "@types";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useKeenSliderWithArrows } from "@lib/utils/useKeenSlider";
import { slugify } from "@lib/helpers/helpers";

const getSeasonsSlider = (seasons: SeasonItem[]) => {
  return seasons
    .filter((item) => item.season_number !== 0)
    .map((season) => (
      <div
        key={season.id}
        className="keen-slider__slide min-w-0 shrink-0
            bg-light text-dark rounded-xl
            shadow-inner shadow-dark-1
            h-[165px] max-xl:h-[150px] max-lg:h-[145px]
            max-md:h-[140px] max-sm:h-[130px] max-xs:h-[120px]"
      >
        <div className="w-full h-full flex gap-3 max-sm:gap-1">
          <div className="bg-dark rounded-l-md w-[28%] h-full">
            <FallbackImage
              src={season.poster_path}
              mediaType="tv"
              alt="poster"
              width={0}
              height={0}
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              placeholder="blur"
              blurDataURL="/images/blur.jpg"
              className="w-full h-full object-cover rounded-l-md opacity-90"
            />
          </div>

          <div className="p-2 flex flex-1 flex-col">
            <div className="flex items-center gap-3 max-xl:gap-1">
              <h4 className="font-semibold text-dark max-sm:text-sm max-xs:text-xs">
                {season.name}
              </h4>
              <span>|</span>
              <p className="text-dark text-xs max-sm:text-[0.625rem] max-xs:text-[0.6rem]">
                {season.episode_count} Episodes
              </p>
            </div>

            <p className="pt-1 text-dark-1 text-xs max-sm:text-[0.625rem]">
              {moment(season.air_date).format("ddd, MMM Do, YYYY")}
            </p>

            {season.overview ? (
              <p className="line-clamp-2 mt-auto text-sm max-lg:text-xs max-sm:text-[0.625rem] max-xs:leading-3">
                {season.overview}
              </p>
            ) : (
              <p className="mt-auto italic text-sm max-md:text-xs text-dark-1">No Overview.</p>
            )}

            <div
              className="pt-3 max-xl:pt-1 max-lg:pt-2 
              flex items-center justify-end gap-1"
            >
              <Image
                src="/icons/star-2.svg"
                alt="Rating Star"
                width={14}
                height={14}
                sizes="14px"
                className="relative object-contain bottom-[1.7px]"
              />

              <span
                className={`text-sm max-sm:text-xs
                      ${
                        season.vote_average > 0
                          ? "font-semibold"
                          : "font-normal italic"
                      }`}
              >
                {season.vote_average > 0 ? season.vote_average : "NaN"}
              </span>
            </div>
          </div>
        </div>
      </div>
    ));
};

const Seasons = ({
  id,
  mediaType,
  name,
  seasons,
  seasonList,
}: ISeasonsProps) => {
  // KEEN SLIDER SETUP
  const { arrowDisabled, updateArrows } = useKeenSliderWithArrows();

  const [sliderRef, slider] = useKeenSlider({
    loop: false,
    breakpoints: {
      "(max-width: 1280px)": {
        slides: { perView: 2.3, spacing: 15 },
      },
      "(max-width: 1024px)": {
        slides: { perView: 2.5, spacing: 15 },
      },
      "(max-width: 856px)": {
        slides: { perView: 2.25, spacing: 12 },
      },
      "(max-width: 640px)": {
        slides: { perView: 1.75, spacing: 12 },
      },
    },
    slides: {
      perView: 2.5,
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

  const route = `/title/${mediaType}/${id}-${slugify(name)}`;

  return (
    <>
      <Link
        href={`${route}/fullseasons`}
        className="group flex items-center w-fit"
      >
        <h3 className="text-main text-2xl max-sm:text-xl font-semibold">
          Seasons
        </h3>
        <span className="pl-3 text-xs text-main-1">{seasons}</span>

        <MdArrowForwardIos
          className="text-main text-3xl max-sm:text-2xl font-semibold 
                  transition-colors duration-200 group-hover:text-tale"
        />
      </Link>

      <div className="pt-7">
        <div
          className={`${seasons > 2 && "px-3 max-md:px-0"}
                  relative w-full max-w-[calc(100vw-(288px+55px))]
                  max-xl:max-w-[calc(100vw-(256px+55px))] max-lg:max-w-full overflow-hidden`}
        >
          <div ref={sliderRef} className="keen-slider">
            {getSeasonsSlider(seasonList)}
          </div>

          {/* Arrow */}
          {/* Left arrow */}
          {seasons > 2 && (
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
      </div>
    </>
  );
};

export default Seasons;
