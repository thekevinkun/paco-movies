import Link from "next/link";
import Image from "next/image";
import moment from "moment";

import { FallbackImage } from "@components";

import { ICardPersonCredits } from "@types";
import { roundedToFixed } from "@helpers/helpers";

const CardPersonCredits = ({id, mediaType, title, character, 
    releaseDate, poster, vote}: ICardPersonCredits) => {
  return (
    <div key={id} className="w-full h-36 py-2 flex border-b">
        <Link 
            href={`/title/${mediaType}/${id + "-" + 
                title?.toLowerCase().replace(/[^A-Z0-9]+/ig, "-")}`}
            className="relative w-24 max-sm:w-[85px] h-full group "
        >
            <FallbackImage
                src={poster}
                mediaType={mediaType}
                alt="poster"
                fill
                sizes="(min-width: 640px) 96px, 85px"
                placeholder="blur"
                blurDataURL="/images/blur.jpg"
                className="object-cover opacity-80 transition-opacity
                    duration-100 group-hover:opacity-30"
            />
        </Link>

        <div className="flex-1 flex justify-between">
            <div className="flex flex-col gap-1 ml-4">
                <Link
                    href={`/${mediaType}`}
                    className="p-1 w-fit flex items-center
                        rounded-sm border border-gray-500"
                >
                    <span className="text-main-1 text-[10px] max-sm:text-[8px]">
                        {mediaType}
                    </span>
                </Link>

                <Link 
                    href={`/title/${mediaType}/${id + "-" + 
                        title?.toLowerCase().replace(/[^A-Z0-9]+/ig, "-")}`}
                    className="pt-1"
                >
                    <h4 className="text-main max-sm:text-sm font-semibold
                        capitalize hover:text-tale"
                    >
                        {title}
                    </h4>
                </Link>

                <div className="pt-2 flex items-center gap-1">
                    <Image
                        src="/icons/star-2.svg"
                        alt="Rating Star"
                        width={16}
                        height={16}
                        sizes="16px"
                        className="relative object-contain bottom-[1px]"
                    />

                    <span 
                        className={`text-sm text-main ${vote > 0 ? 
                            "font-semibold" : "font-normal italic"}`
                    }
                    >
                        {vote > 0 ? roundedToFixed(vote, 1) : "NaN"}
                    </span>
                </div>

                <p className="pt-2 max-sm:text-sm text-main">{character}</p>
            </div>

            <div>
                {releaseDate ?
                    <p className="text-main-1 max-sm:text-sm">
                        {moment(releaseDate).format("YYYY")}
                    </p>
                :
                    <p className="text-main-1 italic text-sm ">
                        No date yet
                    </p>
                }
            </div>
        </div>
    </div>
  )
}

export default CardPersonCredits