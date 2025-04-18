import React from "react";
import Link from "next/link";
import Image from "next/image";

import { MotionDiv } from "@components";
import { cardMovieVariants } from "@utils/motion";

import { ICardPerson } from "@types";
import { roundedToFixed } from "@helpers/helpers";

const CardPerson = ({id, index, name, photo, department, popularity, works}: ICardPerson) => {
  return (
    <MotionDiv 
        variants={cardMovieVariants(index * 0.25)}
        initial="hidden"
        animate="visible"
        viewport={{ amount: 0 }}
        className="flex flex-col items-center"
    >
        {/* PHOTO */}
        <Link 
            href={`/name/${id + "-" + name.toLowerCase().replace(/[^A-Z0-9]+/ig, "-")}`} 
            className="w-72 h-72 
                max-lg:w-60 max-lg:h-60 
                max-[867px]:w-56 max-[867px]:h-56
                max-[576px]:w-48 max-[576px]:h-48 
                bg-black rounded-full"
        >
            <Image
                priority
                unoptimized
                loader={() => `https://image.tmdb.org/t/p/w500${photo}`}
                src={photo ? `https://image.tmdb.org/t/p/w500${photo}` 
                    : `/images/not-found-person.png`}
                alt="Poster"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-full object-cover object-[55%_45%] rounded-full opacity-90"
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
                    priority
                    unoptimized
                    src="/icons/popularity.svg"
                    alt="Popularity"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="relative w-6 h-6 max-md:w-5 max-md:h-5 object-contain bottom-[0.4px]"
                />

                <span className="text-gray-500 text-sm max-[576px]:text-xs">
                    {popularity > 0 ? roundedToFixed(popularity, 1) : "N"}
                </span>
            </div>

            <p className="text-gray-500 text-sm max-[576px]:text-xs">
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
                            <p className="truncate w-fit max-w-[155px] max-md:max-w-[125px] text-gray-500 hover:text-tale
                                text-xs max-md:text-[0.675rem]"
                            >
                                {work.title || work.name}
                            </p>
                        </Link>
                        <span className="bullet-separator align-top text-gray-500 text-xs"> &#8226; </span>
                    </React.Fragment>
                )
            })}
        </div>
      </div>
    </MotionDiv>
  )
}

export default CardPerson;