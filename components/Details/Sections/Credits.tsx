import React from "react";
import Link from "next/link";
import { MdArrowForwardIos } from "react-icons/md";

import { FallbackImage } from "@components";
import { CreditList, Director } from "@components/Common";

import type { ICreditsProps, CreditItem } from "@types";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { slugify } from "@lib/helpers/helpers";

const getCasts = (casts: CreditItem[]) => {
  return (
    <div className="grid grid-cols-2 gap-y-5">
      {casts.slice(0, 18).map((cast) => (
        <div key={cast.id} className="flex items-center gap-5">
          <Link
            href={`/name/${cast.id}-${slugify(cast.name ?? "")}`}
            className="relative w-32 h-32 bg-dark rounded-full group"
          >
            <FallbackImage
              src={cast.profile_path}
              mediaType="person"
              alt="profile"
              fill
              sizes="128px"
              placeholder="blur"
              blurDataURL="/images/blur.jpg"
              className="object-cover rounded-full 
                opacity-90 transition-opacity duration-100 group-hover:opacity-55"
            />
          </Link>

          <div>
            <Link
              href={`/name/${cast.id}-${slugify(cast.name ?? "")}`}
              className="text-main hover:text-tale"
            >
              <p>{cast.name}</p>
            </Link>

            <p className="font-light text-main-1 text-sm">{cast.character}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const getCastsMobile = (casts: CreditItem[]) => {
  return casts.slice(0, 18).map((cast) => (
    <div key={cast.id} className="keen-slider__slide flex-shrink-0">
      <div className="flex flex-col gap-3">
        <Link
          href={`/name/${cast.id}-${slugify(cast.name ?? "")}`}
          className="relative w-full aspect-square bg-black rounded-full group"
        >
          <FallbackImage
            src={cast.profile_path}
            mediaType="person"
            alt="profile"
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            placeholder="blur"
            blurDataURL="/images/blur.jpg"
            className="object-cover rounded-full 
              opacity-90 transition-opacity duration-100 group-hover:opacity-55"
          />
        </Link>

        <div className="text-center">
          <Link
            href={`/name/${cast.id}-${slugify(cast.name ?? "")}`}
            className="line-clamp-1 text-main hover:text-tale max-sm:text-sm max-[390px]:text-xs"
          >
            <p>{cast.name}</p>
          </Link>

          <p className="line-clamp-1 pt-[2px] font-light text-main-1
                text-xs max-sm:text-[0.65rem] max-[390px]:text-[0.6rem]"
          >
            {cast.character}
          </p>
        </div>
      </div>
    </div>
  ));
};

const Credits = ({
  id,
  mediaType,
  title,
  casts,
  crews,
  creators,
}: ICreditsProps) => {
  const [sliderRef] = useKeenSlider({
    loop: false,
    breakpoints: {
      "(max-width: 641px)": {
        slides: { perView: 3.35, spacing: 12 },
      },
    },
    slides: {
      perView: 4.25,
      spacing: 12,
    },
    mode: "free-snap",
  });

  const route = `/title/${mediaType}/${id}-${slugify(title)}`;

  return (
    <>
      <Link
        href={`${route}/fullcredits`}
        className="group flex items-center w-fit"
      >
        <h3 className="text-main text-2xl max-sm:text-xl font-semibold">
          Top Cast
        </h3>
        <span className="pl-3 text-xs text-main-1">
          {casts.length > 99 ? "99+" : casts.length}
        </span>

        <MdArrowForwardIos
          className="text-main text-3xl max-sm:text-2xl font-semibold 
            transition-colors duration-200 group-hover:text-tale"
        />
      </Link>

      {/* CASTS DESKTOP */}
      <div className="pt-7 max-md:hidden">{getCasts(casts)}</div>

      {/* CASTS MOBILE */}
      <div
        className="hidden max-md:block relative pt-7 
          max-md:h-full max-w-full overflow-hidden "
      >
        {/* Slider */}
        <div ref={sliderRef} className="keen-slider">
          {getCastsMobile(casts)}
        </div>
      </div>

      {/* CREWS CREDITS */}
      <div className="!text-main pt-7 max-sm:pt-5 w-[90%] max-md:w-[100%]">
        {mediaType === "movie" && crews.length > 0 &&
          <div className="py-3 font-semibold grid grid-cols-[17%_1fr]
                  max-lg:grid-cols-[20%_1fr] max-xs:grid-cols-[21%_1fr]
                  max-xs:gap-x-2 items-baseline border-t border-gray-500"
          >
            <h3 className="text-main text-lg max-md:text-base max-sm:text-sm">
              Director
            </h3>

            <Director
              crews={crews || []}
              childStyles="max-md:text-sm max-sm:text-xs"
            />
          </div>
        }

       {mediaType === "tv" && creators.length > 0 &&
          <div className="py-3 font-semibold grid grid-cols-[17%_1fr]
                  max-lg:grid-cols-[20%_1fr] max-xs:grid-cols-[21%_1fr]
                  max-xs:gap-x-2 items-baseline border-t border-gray-500"
          >
            <h3 className="text-main text-lg max-md:text-base max-sm:text-sm">
              Creators
            </h3>

            <div className="flex flex-wrap items-center gap-2">
              <CreditList
                items={creators || []}
                childStyles="max-md:text-sm max-sm:text-xs"
              />
            </div>
          </div>
        }

        {mediaType === "movie" && (
          <div className="py-3 font-semibold grid grid-cols-[17%_1fr]
                max-lg:grid-cols-[20%_1fr] max-xs:grid-cols-[21%_1fr]
                max-xs:gap-x-2 items-baseline border-t border-gray-500"
          >
            <h3
              className="text-main text-lg max-md:text-base max-sm:text-sm"
            >
              Writers
            </h3>

            <div className="flex flex-wrap items-center gap-2">
              <CreditList
                items={crews || []}
                filterJobs={["Writer", "Screenplay", "Characters"]}
                childStyles="max-md:text-sm max-sm:text-xs"
              />
            </div>
          </div>
        )}

        <div className="py-3 font-semibold border-y border-gray-500">
          <Link
            href={`${route}/fullcredits`}
            className="text-main hover:text-tale max-sm:text-sm flex items-center justify-between"
          >
            <h3>All cast & crew</h3>
            <MdArrowForwardIos className="text-lg max-md:text-base font-semibold" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Credits;
