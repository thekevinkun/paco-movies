"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";

import { FallbackImage } from "@components";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";

const getSeasonsSlider = (seasons: any) => {
  return seasons.filter((item: any) => item.season_number !== 0).map((season: any) => (
      <div
        key={season.id}
        className="keen-slider__slide min-w-0 shrink-0
          bg-light-1 text-dark rounded-xl
            h-[165px] max-xl:h-[150px] max-lg:h-[145px]
            max-md:h-[140px] max-sm:h-[130px]"
      >
        <div className="w-full h-full flex gap-3">
          <div className="bg-black rounded-l-md w-[28%] h-full">
            <FallbackImage
              src={season.poster_path}
              mediaType="tv"
              alt="poster"
              width={0}
              height={0}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="w-full h-full object-cover rounded-l-md opacity-90"
            />
          </div>

          <div className="p-2 flex flex-1 flex-col">
            <div className="flex items-center gap-3 max-xl:gap-1">
              <h4 className="font-semibold text-dark max-sm:text-sm">{season.name}</h4>
              <span>|</span>
              <p className="text-xs max-sm:text-[0.625rem] text-dark">{season.episode_count} Episodes</p>
            </div>
            
            <p className="pt-1 text-dark-1 text-xs max-sm:text-[0.625rem]">
              {moment(season.air_date).format("ddd, MMM Do, YYYY")}
            </p>
          
            {season.overview ?
              <p className="line-clamp-2 mt-auto text-sm max-lg:text-xs">
                {season.overview}
              </p>
            :
              <p className="mt-auto italic text-sm text-dark-1">
                No Overview.
              </p>
            }

            <div className="pt-3 max-xl:pt-1 max-lg:pt-2 
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
                      ${season.vote_average > 0 ? 
                      "font-semibold" : "font-normal italic"}`
                  }
              >
                  {season.vote_average > 0 ? season.vote_average : "NaN"}
              </span>
            </div>
          </div>
        </div>
      </div>
  ))
}

const Seasons = ({movieId, mediaType, name, seasons, seasonList}: 
        {movieId: string, mediaType: string, name: string, seasons: any, seasonList: any}) => {

    // KEEN SLIDER SETUP
    const [currentSlide, setCurrentSlide] = useState(0);
    const [perView, setPerView] = useState(1);
    const [arrowDisabled, setArrowDisabled] = useState({ prev: true, next: false });

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
        <>
            <Link 
              href={`/title/${mediaType}/${movieId + "-" 
                  + name.toLowerCase().replace(/[^A-Z0-9]+/ig, "-")}/fullseasons`} 
              className="group flex items-center w-fit"
              >
              <h3 className="text-main text-2xl max-sm:text-xl font-semibold">Seasons</h3>
              <span className="pl-3 text-xs text-main-1">{seasons}</span>

              <MdArrowForwardIos 
                  className="text-main text-3xl max-sm:text-2xl font-semibold 
                  transition-colors duration-200 group-hover:text-tale"
              />
            </Link>

            <div className="pt-7">
              <div className={`${seasons > 2 &&
                  "px-3 max-md:px-0"}
                  relative w-full max-w-[calc(100vw-(288px+55px))]
                  max-xl:max-w-[calc(100vw-(256px+55px))] max-lg:max-w-full overflow-hidden`}
              >
                <div 
                  ref={sliderRef}
                  className="keen-slider"
                >
                  {getSeasonsSlider(seasonList)}
                </div>

                {/* Arrow */}
                {/* Left arrow */}
                {seasons > 2 &&
                <>
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
                </>
                }
              </div>
            </div>
        </>
    )
}

export default Seasons;