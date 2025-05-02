import React from "react";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import { FaPlay } from "react-icons/fa";

import { FallbackImage } from "@components";

import { IDetailsMain } from "@types";
import { convertRuntime, roundedToFixed, slugify } from "@helpers/helpers";

import { CreditList, GenreList, NetworkList, Director } from "@components/Common";

const DetailsMainMobile = ({id, mediaType, backdrop, poster, title, rating, releaseDate, 
        genres, tagline, overview, credits, country, certification, runtime, 
        tvrating, status, networks, creators}: IDetailsMain) => {
    
    const url = `/title/${mediaType}/${id}-${slugify(title)}`;
            
    return (
        <section className="hidden max-md:block">
            <div
                style={{
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundImage: `url("https://image.tmdb.org/t/p/w1280${backdrop}")`,
                }}
                className="relative w-full h-72 max-sm:h-64"
            >
                {/* Background image gradient */}
                <div
                    style={{
                    backgroundImage:
                        "linear-gradient(to right, rgba(0, 0, 0, 0.5) calc((50vw - 170px) - 340px), rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.2) 100%)",
                    }}
                    className="w-full h-full absolute top-0 right-0"
                ></div>
            </div>

            <div className="relative pt-4 z-20">
                {/* TITLE */}
                <Link href={url} className="block w-fit mx-auto">
                    <h2 className="text-main text-2xl text-center font-extrabold
                        capitalize hover:text-tale"
                    >
                        {title}{" "}

                        <span className="font-light">
                            {releaseDate &&
                            `(${moment(releaseDate).format("YYYY")})`}
                        </span>
                    </h2>
                </Link>

                {/* POSTER */}
                <div className="mt-5 mx-auto relative w-48 h-64 
                    max-sm:w-40 max-sm:h-56 shadow-lg shadow-light/10 rounded-md"
                >
                    <FallbackImage
                        src={poster}
                        mediaType={mediaType}
                        alt="poster"
                        fill
                        sizes="(min-width: 640px) 192px, 208px"
                        placeholder="blur"
                        blurDataURL="/images/blur.jpg"
                        className="object-cover rounded-md opacity-95"
                    />
                </div>

                {/* RATING, NETWORKS & TRAILER */}
                <div className="pt-7 flex items-center justify-center">
                    {/* RATING */}
                    <div className="flex items-center gap-1">
                        <Image
                            src="/icons/star-2.svg"
                            alt="rating star"
                            width={29}
                            height={29}
                            sizes="29px"
                            className="relative object-contain bottom-[1.7px]"
                        />

                         <span 
                            className={`text-main text-lg 
                            ${rating > 0 ? "font-semibold" : "font-normal italic"}`}
                        >
                            {rating > 0 ? roundedToFixed(rating, 1) : "NaN"}
                        </span>
                    </div>

                    {/* TV NETWORKS */}
                    {(mediaType === "tv" && networks) &&
                        <div className="ml-10 flex items-center gap-1">
                            <NetworkList 
                                mediaType={mediaType}
                                networks={networks}
                            />
                        </div>
                    }

                    <Link
                        href={`${url}#`}
                        className="flex items-center gap-2 ml-10 text-main hover:text-light-2"
                    >
                        <FaPlay className="text-2xl"/>
                        <span className="font-semibold">Play Trailer</span>
                    </Link>
                </div>

                {/* FACTS */}
                <div 
                    className="mt-7 py-4 bg-dark-2 border-y border-dark 
                    text-light-1 font-normal flex flex-col items-center justify-center gap-1"
                >
                    {/* MOVIE TV RATE & RELEASE DATE COUNTRY */}
                    {mediaType === "movie" ?
                        <div className="flex items-center gap-2">
                            {certification && 
                                <span className="px-1 text-sm font-medium
                                    bg-dark border border-gray-500"
                                >
                                    {certification}
                                </span>
                            }
                            
                            <span className="text-sm">
                                {releaseDate && `${moment(releaseDate).format("L")}`}    
                                {` (${country.iso_3166_1})`}
                            </span>
                        </div>
                    :
                        <>
                        {tvrating && 
                            <span className="px-1 text-sm font-medium
                                bg-dark border border-gray-500"
                            >
                                {tvrating}
                            </span>
                        }
                        </>
                    }

                     {/* RUNTIME MOVIE or TV STATUS AIR */}
                    {mediaType === "movie" ? 
                        (runtime && runtime > 0) &&  
                            <span className="text-sm">
                                {convertRuntime(runtime)}
                            </span>
                    :
                        status &&                    
                            <span className="italic text-sm">
                                {status}
                            </span>
                    }

                    {/* SHOW GENRES */}
                    <div>
                        <GenreList 
                            mediaType={mediaType}
                            genres={genres}
                        />
                    </div>
                </div>

                {/* OVERVIEW */}
                <div className="px-3 pt-7">
                    <div>
                        <h3 className="text-main text-lg font-semibold">
                            Overview
                        </h3>
                        <p className="pt-2 text-main text-sm font-normal">
                            {overview}
                        </p>
                    </div>
                </div>

                {/* CREDITS */}
                <div className="px-3 pt-7 text-main">
                    {/* DIRECTOR or CREATORS */}
                    <div className="py-2 flex items-center font-semibold
                        border-b border-gray-500"
                    >
                        <h3 className="basis-[20%]">
                            {mediaType === "movie" ?
                                "Director" : "Creators"
                            }
                        </h3>
                        
                        {mediaType === "movie" ? 
                            <Director 
                                crews={credits.crew}
                            />
                        :
                            <div className="flex items-center gap-2">
                                <CreditList 
                                    items={creators} 
                                />
                            </div> 
                        }
                    </div>

                    {/* WRITERS */}
                    {mediaType === "movie" &&
                        <div className="py-2 flex items-center font-semibold
                            border-b border-gray-500"
                        >
                            <h3 className="basis-[20%]">
                                Writers
                            </h3>

                            <div className="flex items-center gap-2">
                                <CreditList 
                                    items={credits.crew} 
                                    filterJobs={["Writer", "Screenplay", "Characters"]} 
                                />
                            </div>
                        </div>
                    }

                    {/* STARS */}
                    <div className="py-2 flex items-center font-semibold
                        border-b border-gray-500"
                    >
                        <h3 className="basis-[20%]">
                            Stars
                        </h3>

                        <div className="flex items-center gap-2">
                            <CreditList 
                                items={credits.cast} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DetailsMainMobile;