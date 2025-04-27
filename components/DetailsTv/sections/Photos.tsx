import Link from "next/link";

import { FallbackImage } from "@components";

import { FiPlus } from "react-icons/fi";
import { MdArrowForwardIos } from "react-icons/md";

const getPhotos = (movieId: number, mediaType: string, 
        name: string, posters: any, backdrops: any) => {
    return (
      <div className={`grid gap-[15px] max-md:gap-[8px]
          ${(posters.length > 6 && backdrops.length > 4) ? 
          `grid-cols-12 grid-rows-[240px,200px]
          max-xl:grid-rows-[200px,165px] max-lg:grid-rows-[190px,175px] 
          max-md:grid-rows-[175px,150px] max-sm:grid-rows-[125px,135px]`
          : "grid-cols-5 max-md:grid-cols-4"}`}
      >
        {posters.slice(0, 6).map((item: any, index: number) => (
          <div 
            key={(index + 1) + "-posters"} 
            className={`relative bg-dark col-span-2 rounded-md`}
          >
            <FallbackImage
              src={item.file_path}
              mediaType={mediaType}
              alt="poster"
              fill
              sizes="(max-width: 768px) 50vw, 30vw"
              placeholder="blur"
              blurDataURL="/images/blur.jpg"
              className="object-cover rounded-md opacity-80"
            />
          </div>
        ))}

        {backdrops.slice(0, 3).map((item: any, index: number) => (
          <div 
            key={(index + 1) + "-backdrops"} 
            className={`relative bg-dark col-span-3 rounded-md
              ${index === 1 && "!col-span-4 max-md:!col-span-3"}`}
          >
            <FallbackImage
              src={item.file_path}
              mediaType={mediaType}
              alt="backdrop"
              fill
              sizes="(max-width: 768px) 50vw, 30vw"
              placeholder="blur"
              blurDataURL="/images/blur.jpg"
              className="object-cover rounded-md opacity-80"
            />
          </div>
        ))}

        {backdrops.length > 4 &&
          backdrops.slice(3, 4).map((item: any) => (
            <Link 
              key="last-backdrops"
              href={`/title/${mediaType}/${movieId + "-" 
                + name?.toLowerCase().replace(/[^A-Z0-9]+/ig, "-")}/photogallery`}
              className="relative group bg-dark col-span-2 max-md:col-span-3 rounded-md"
            >
              <FallbackImage
                src={item.file_path}
                mediaType={mediaType}
                alt="backdrop"
                fill
                sizes="(max-width: 768px) 50vw, 30vw"
                placeholder="blur"
                blurDataURL="/images/blur.jpg"
                className="object-cover rounded-md opacity-50 
                  transition-opacity duration-200 group-hover:opacity-30"
              />

              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <FiPlus className="text-light text-5xl"/>
              </span>
            </Link>
        ))}
      </div>
    )
}

const Photos = ({movieId, mediaType, name, posters, backdrops}: 
    {movieId: number, mediaType: string, name: string, posters: any, backdrops: any}) => {
  
  return (
    <>
      <Link 
        href={`/title/${mediaType}/${movieId + "-" 
          + name?.toLowerCase().replace(/[^A-Z0-9]+/ig, "-")}/photogallery`} 
        className="group flex items-center w-fit"
      >
        <h3 className="text-main text-2xl max-sm:text-xl font-semibold">Photos</h3>
        <span className="pl-3 text-xs text-main-1">{posters?.length + backdrops?.length}</span>

        <MdArrowForwardIos 
          className="text-main text-3xl max-sm:text-2xl font-semibold 
              transition-colors duration-200 group-hover:text-tale"
        />
      </Link>

      <div className="pt-7">
        {getPhotos(movieId, mediaType, name, posters, backdrops)}
      </div>
    </>
  )
}

export default Photos;