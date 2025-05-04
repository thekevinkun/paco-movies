"use client"

import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import { motion, AnimatePresence } from "framer-motion";
import { RxCross2 } from "react-icons/rx";

import { FallbackImage } from "@components";
import { CreditList, Director, GenreList, NetworkList } from "@components/Common";

import { usePreview } from "@contexts/PreviewContext";

import { parentModalVariants, previewModalVariants } from "@lib/utils/motion";
import { convertRuntime, roundedToFixed, slugify } from "@lib/helpers/helpers";

const PreviewModal = () => {
  const { previewId, previewMediaType, close } = usePreview();
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<any>(null);
  
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });

  // Handle escape key and body scroll lock
  useEffect(() => {
    const loadPreview = async () => {
      try {
        const response = await fetch(
          `/api/preview?mediaType=${previewMediaType}&id=${previewId}`
        );

        const data = await response.json();

        if (response.ok) {
          setData(data);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error("Error fetching next page:", error);
      }
    }

    if (previewId) {
      loadPreview();
    }
  }, [previewId]);

  // Handle escape key and body scroll lock
  useEffect(() => {
    if (previewId) {
        setIsOpen(true);
        document.body.classList.add("modal-open");
    } else {
        setIsOpen(false);
        setData(null);
        document.body.classList.remove("modal-open");
    }

    const esc = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", esc);

    return () => window.removeEventListener("keydown", esc);
  }, [previewId, close]);

  return (
    <AnimatePresence>
        {(isOpen && data) && (
            <motion.div
                key="modal"
                variants={parentModalVariants(0.15)}
                initial="hidden"
                animate="show"
                exit="exit"
                className="fixed inset-0 z-[9999] flex items-center justify-center max-sm:items-end"
            >
                {/* Blurred background */}
                <motion.div
                    variants={parentModalVariants()}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="absolute inset-0 bg-black/25 backdrop-blur-sm pointer-events-none"
                />

                {/* Modal content */}
                <motion.div
                    variants={previewModalVariants(isMobile)}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="p-7 py-9 max-sm:py-7 bg-dark-1/75 relative z-10 w-full 
                        max-w-xl max-lg:max-w-lg max-sm:max-w-full
                        rounded-md max-sm:rounded-none"
                >
                    {/* POSTER AND INFORMATION */}
                    <div className="w-full h-full flex gap-3">
                        {/* POSTER */}
                        <div className="relative bg-dark rounded-lg w-20 h-28">
                            <FallbackImage
                                src={data.details.poster_path}
                                mediaType={previewMediaType}
                                alt="poster"
                                fill
                                sizes="80px"
                                placeholder="blur"
                                blurDataURL="/images/blur.jpg"
                                className="object-cover rounded-lg opacity-90"
                            />
                        </div>
                        
                        {/* INFORMATION */}
                        <div className="flex flex-1 flex-col">
                            {/* TITLE */}
                            <Link 
                                href={`/title/${previewMediaType}/${previewId}-${slugify(data.details.title || data.details.name)}`}  
                                title={data.details.title || data.details.name} 
                                className="inline-block w-fit"
                                onClick={close}
                            >
                                <h3 className="font-semibold text-lg
                                    text-light hover:text-tale"
                                >
                                    {data.details.title || data.details.name} 
                                </h3>
                            </Link>
                            
                            {/* RELEASE & RUNTIME */}
                            <div className="pt-1 text-light-1 text-sm max-sm:text-xs
                                flex items-center gap-2"
                            >
                                {/* RELEASE DATE */}
                                {previewMediaType === "movie" && data.releaseDate ?
                                    <p>
                                        {data.releaseDate.date && `${moment(data.releaseDate.date).format("YYYY")}`}
                                    </p>
                                : (previewMediaType === "tv" && data.details) &&
                                    <p>
                                        {data.details.first_air_date && `${moment(data.details.first_air_date).format("YYYY")}`}
                                    </p>
                                }
                                
                                {/* RUNTIME OR SEASONS */}
                               
                                {previewMediaType === "movie" && data.details.runtime > 0 ?
                                    <>
                                        <span className="">&#8226;</span>
                                        <p className="">
                                            {convertRuntime(data.details.runtime)}
                                        </p>
                                    </>
                                    
                                : (previewMediaType === "tv" && data.details.number_of_seasons > 0) &&
                                    <>
                                        <span className="">&#8226;</span>
                                        <p>
                                            {`${data.details.number_of_seasons} Seasons`}
                                        </p>
                                    </>                 
                                }

                                {/* RATING */}
                                {previewMediaType === "movie" && data.releaseDate.certification ?
                                    <>
                                        <span className="">&#8226;</span>
                                        <p className="">
                                            {data.releaseDate.certification}
                                        </p>
                                    </>
                                : (previewMediaType === "tv" && data.ratings.rating) &&
                                    <>
                                        <span className="">&#8226;</span>
                                        <p className="">
                                            {data.ratings.rating}
                                        </p>
                                    </>
                                }

                                {/* NETWORKS FOR TV */}
                                {(previewMediaType === "tv" && data.details.networks) &&
                                    <>
                                        <span className="">&#8226;</span>
                                        <NetworkList 
                                            mediaType={previewMediaType}
                                            networks={data.details.networks}
                                            containerStyles="w-[32px] h-[20px]
                                                max-sm:w-[29px] h-[17px]"
                                        />
                                    </>
                                }
                            </div>

                            {/* GENRE */}
                            <div className="pt-1 text-light-1 flex items-center gap-2">
                                <GenreList 
                                    mediaType={previewMediaType}
                                    genres={data.details.genres}
                                    containerStyles="text-sm max-sm:text-xs"
                                    childStyles="text-sm max-sm:text-xs"
                                    handleClick={close}
                                />
                            </div>

                            {/* RATING */}
                            <div className="pt-2.5 flex items-center gap-1"
                            >
                                <Image
                                    src="/icons/star-2.svg"
                                    alt="Rating Star"
                                    width={0}
                                    height={0}
                                    sizes="18px"
                                    className="w-[18px] h-[18px] max-sm:w-4 max-sm:h-4
                                        relative object-contain bottom-[1.7px]"
                                />
                
                                <span 
                                    className={`text-lg max-sm:text-base text-light-1
                                        ${data.details.vote_average > 0 ? 
                                        "font-semibold" : "font-normal italic"}`
                                    }
                                >
                                    {data.details.vote_average  > 0 ? roundedToFixed(data.details.vote_average, 1) : "NaN"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* OVERVIEW */}
                    <div className="pt-7 max-sm:pt-5">
                        <p className="text-light text-sm max-sm:text-xs">
                            {data.details.overview}
                        </p>
                    </div>

                    {/* CREDITS */}
                    <div className="pt-5 text-light">
                        {(data.credits.crew.length > 0 || data.details.created_by) &&
                            <div className="flex items-baseline font-semibold">
                                <h3 className="text-sm max-sm:text-xs basis-[15%] max-sm:basis-[17%]">
                                    {previewMediaType === "movie" ?
                                        "Director" : "Creators"
                                    }
                                </h3>

                                {previewMediaType === "movie" ? 
                                    <Director 
                                        crews={data.credits.crew}
                                        childStyles="text-xs max-sm:text-[0.675rem]"
                                        handleClick={close}
                                    />
                                :
                                    <div className="text-xs flex items-center gap-2">
                                        <CreditList 
                                            items={data.details.created_by} 
                                            childStyles="text-xs max-sm:text-[0.675rem]"
                                            handleClick={close}
                                        />
                                    </div> 
                                }
                            </div>
                        }
                        
                        {data.credits.cast.length > 0 &&
                            <div className="pt-2 flex items-baseline font-semibold">
                                <h3 className="text-sm max-sm:text-xs basis-[15%] max-sm:basis-[17%]">
                                    Stars
                                </h3>

                                <div className="flex items-center gap-2">
                                    <CreditList 
                                        items={data.credits.cast}
                                        childStyles="text-xs max-sm:text-[0.675rem]"
                                        handleClick={close}
                                    />
                                </div>
                            </div>
                        }
                    </div>

                    <RxCross2 
                        className="absolute top-[-11%] max-sm:top-[-13%]
                            max-xs:top-[-11%] right-1 text-4xl max-xs:text-3xl
                            text-danger cursor-pointer hover:text-danger/55"
                        onClick={close}
                    />
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
  )
}

export default PreviewModal;