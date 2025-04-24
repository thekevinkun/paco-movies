import React from "react";
import Link from "next/link";
import Image from "next/image";

import { FallbackImage, MotionDiv } from "@components";
import { cardMovieVariants } from "@lib/utils/motion";

import { ICardPerson } from "@types";
import { roundedToFixed } from "@helpers/helpers";

const CardPerson = ({id, name, photo, department, popularity, works}: ICardPerson) => {
  return (
    <MotionDiv 
        variants={cardMovieVariants}
        className="flex flex-col items-center"
    >
        {/* PHOTO */}
        <Link 
            href={`/name/${id + "-" + name.toLowerCase().replace(/[^A-Z0-9]+/ig, "-")}`} 
            className="relative aspect-square w-72 h-72 
                max-lg:w-60 max-lg:h-60 
                max-[867px]:w-56 max-[867px]:h-56
                max-[576px]:w-48 max-[576px]:h-48 
                bg-dark rounded-full"
        >
            <FallbackImage
                src={photo}
                mediaType="person"
                alt="profile"
                fill
                sizes="(max-width: 576px) 192px,
                (max-width: 867px) 224px,
                (max-width: 1024px) 240px,
                288px"
                placeholder="blur"
                blurDataURL="/images/blur.jpg"
                className="object-cover object-[55%_45%] rounded-full opacity-90"
            />
      </Link>

      {/* DETAILS */}
      <div className="w-full h-full flex flex-col mt-2 p-2 max-md:py-3 bg-card bg-opacity-95">
        <Link 
            href={`/name/${id + "-" + name.toLowerCase().replace(/[^A-Z0-9]+/ig, "-")}`} 
            title={name} 
            className="inline-block w-fit"
        >
            <h2 className="text-main text-lg max-lg:text-base max-md:text-sm 
                    font-semibold hover:text-tale">
                {name}
            </h2>
        </Link>

        <div className="pt-3 w-full flex items-center gap-5">
            <div className="flex items-center gap-1">
                <Image
                    src="/icons/popularity.svg"
                    alt="popularity"
                    width={20}
                    height={20}
                    className="relative w-5 h-5 object-contain bottom-[0.4px]"
                />

                <span 
                    className={`text-main-1 text-sm max-[576px]:text-xs
                    ${popularity > 0 ? "font-medium" : "font-normal italic"}`}
                >
                    {popularity > 0 ? roundedToFixed(popularity, 2) : "NaN"}
                </span>
            </div>

            <p className="text-main-1 text-sm max-[576px]:text-xs">
                {department}
            </p>
        </div>

        <div className="mt-auto pt-5 leading-5">
            {works?.map((work: any) => {
                const title = work.title || work.name
                const route = "/title" + `/${work.media_type}` + 
                    `/${work.media_type}-${title?.toLowerCase().replace(/[^A-Z0-9]+/ig, "-")}`
                
                return (
                    <React.Fragment key={work.id}>
                        <Link href={route} title={work.title || work.name} className="inline-block">
                            <p className="truncate w-fit max-w-[155px] max-md:max-w-[125px] 
                                text-main-1 hover:text-tale text-xs max-md:text-[0.675rem]"
                            >
                                {work.title || work.name}
                            </p>
                        </Link>
                        <span className="bullet-separator align-top text-main-1 text-xs"> &#8226; </span>
                    </React.Fragment>
                )
            })}
        </div>
      </div>
    </MotionDiv>
  )
}

export default CardPerson;