import Link from "next/link";

import { FallbackImage } from "@components";

import { FiPlus } from "react-icons/fi";
import { MdArrowForwardIos } from "react-icons/md";

import { slugify } from "@helpers/helpers";

const getLessPhotos = (tvId: number, mediaType: string, 
  title: string, posters: any, backdrops: any, route: string) => {

return (
  <div className="grid grid-cols-11 max-md:grid-cols-10
      gap-[15px] max-md:gap-[8px] w-full 
      h-[240px] max-xl:h-[200px] max-lg:h-[190px] 
      max-md:h-[175px] max-sm:h-[125px]"
  >
    {posters.slice(0, 4).map((item: any, index: number) => (
      <div 
        key={(index + 1) + "-posters"} 
        className="col-span-2 relative bg-dark rounded-md"
      >
        <FallbackImage
          src={item.file_path}
          mediaType={mediaType}
          alt="poster"
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          placeholder="blur"
          blurDataURL="/images/blur.jpg"
          className="object-cover rounded-md opacity-80"
        />
      </div>
    ))}

    {backdrops.slice(0, 1).map((item: any) => (
      <Link 
        key="last-backdrops"
        href={`${route}/photogallery`} 
        className="col-span-3 max-md:col-span-2 relative group bg-dark rounded-md"
      >
        <FallbackImage
          src={item.file_path}
          mediaType={mediaType}
          alt="backdrop"
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
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

const getPhotos = (tvId: number, mediaType: string, 
        name: string, posters: any, backdrops: any, route: string) => {
    return (
      <div className="grid grid-cols-12 
          gap-[15px] max-md:gap-[8px] grid-rows-[240px,200px]
          max-xl:grid-rows-[200px,165px] max-lg:grid-rows-[190px,175px] 
          max-md:grid-rows-[175px,150px] max-sm:grid-rows-[125px,135px]"
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
              sizes="(min-width: 768px) 30vw, 50vw"
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
              sizes="(min-width: 768px) 30vw, 50vw"
              placeholder="blur"
              blurDataURL="/images/blur.jpg"
              className="object-cover rounded-md opacity-80"
            />
          </div>
        ))}

        {backdrops.slice(3, 4).map((item: any) => (
          <Link 
            key="last-backdrops"
            href={`${route}/photogallery`} 
            className="relative group bg-dark col-span-2 max-md:col-span-3 rounded-md"
          >
            <FallbackImage
              src={item.file_path}
              mediaType={mediaType}
              alt="backdrop"
              fill
              sizes="(min-width: 768px) 30vw, 50vw"
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

const Photos = ({tvId, mediaType, name, posters, backdrops}: 
    {tvId: number, mediaType: string, name: string, posters: any, backdrops: any}) => {
  
  const route = `/title/${mediaType}/${tvId}-${slugify(name)}`;

  return (
    <>
      <Link 
        href={`${route}/photogallery`} 
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
        {(posters.length > 6 && backdrops.length > 4) ?
          getPhotos(tvId, mediaType, name, posters, backdrops, route)
        :
          getLessPhotos(tvId, mediaType, name, posters, backdrops, route) 
        }
      </div>
    </>
  )
}

export default Photos;