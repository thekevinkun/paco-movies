import React from "react";
import Link from "next/link";
import Image from "next/image";

import { FallbackImage, MotionDiv } from "@components";

import type { ICardPersonProps } from "@types";

import { cardMovieVariants } from "@lib/utils/motion";
import { roundedToFixed, slugify } from "@lib/helpers/helpers";

const CardPerson = ({
  id,
  name,
  photo,
  department,
  popularity,
  works,
}: ICardPersonProps) => {
  const url = `/name/${id}-${slugify(name)}`;

  return (
    <MotionDiv
      variants={cardMovieVariants}
      className="flex flex-col items-center"
    >
      {/* PHOTO */}
      <Link
        href={url}
        className="relative w-72 aspect-square
             max-xl:w-56 max-xl:aspect-square
             max-lg:w-60 max-lg:aspect-square
             max-[867px]:w-56 max-[867px]:aspect-square
             max-[576px]:w-48 max-[576px]:aspect-square
             max-xs:w-44 max-xs:aspect-square
             max-2xs:w-36 max-2xs:aspect-square
             bg-dark rounded-full"
      >
        <FallbackImage
          src={photo}
          mediaType="person"
          alt="profile"
          fill
          sizes="(min-width: 1280px) 288px,
                  (min-width: 1024px) 224px,
                  (min-width: 867px) 240px,
                  (min-width: 576px) 224px,
                  (min-width: 480px) 192px, 
                  (min-width: 375px) 176px, 144px"
          placeholder="blur"
          blurDataURL="/images/blur.jpg"
          className="object-cover object-[55%_45%] rounded-full opacity-90"
        />
      </Link>

      {/* DETAILS */}
      <div className="w-full h-full flex flex-col mt-2 p-2 max-md:py-3 bg-card bg-opacity-95">
        <Link
          href={`/name/${
            id + "-" + name.toLowerCase().replace(/[^A-Z0-9]+/gi, "-")
          }`}
          title={name}
          className="inline-block w-fit"
        >
          <h2
            className="font-semibold text-main text-lg max-lg:text-base 
                  max-md:text-sm max-2xs:text-xs hover:text-tale"
          >
            {name}
          </h2>
        </Link>

        <div className="pt-3 w-full flex items-center gap-5">
          <div className="flex items-center gap-1">
            <Image
              src="/icons/popularity.svg"
              alt="popularity"
              width={0}
              height={0}
              sizes="20px"
              className="relative w-5 h-5 max-2xs:w-4 max-2xs:h-4 
                  object-contain bottom-[0.4px]"
            />

            <span
              className={`text-main-1 text-sm max-[576px]:text-xs max-2xs:text-[0.625rem]
                    ${popularity > 0 ? "font-medium" : "font-normal italic"}`}
            >
              {popularity > 0 ? roundedToFixed(popularity, 2) : "NaN"}
            </span>
          </div>

          <p className="text-main-1 text-sm max-[576px]:text-xs max-2xs:text-[0.625rem]">
            {department}
          </p>
        </div>

        <div
          className="mt-auto pt-5 flex flex-wrap max-sm:flex-col
            items-center max-sm:items-start gap-x-1 gap-y-0.5 max-sm:gap-y-0"
        >
          {works?.map((work) => {
            const title = work.title ?? work.name ?? "untitled";
            const route = `/title/${work.media_type}/${work.id}-${slugify(
              title
            )}`;

            return (
              <React.Fragment key={work.id}>
                <Link
                  href={route}
                  title={work.title || work.name}
                  className="w-fit line-clamp-1"
                >
                  <p className="text-main-1 text-xs 
                    max-md:text-[0.675rem] max-xs:text-[0.625rem] 
                    max-2xs:text-[0.575rem] hover:text-tale"
                  >
                    {work.title || work.name}
                  </p>
                </Link>
                <span
                  className="bullet-separator max-sm:hidden
                    text-main-1 text-xs max-md:text-[0.675rem] 
                    max-xs:text-[0.625rem] max-2xs:text-[0.575rem]"
                >
                  &#8226;
                </span>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </MotionDiv>
  );
};

export default CardPerson;
