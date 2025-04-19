import "@styles/photos.css";

import Link from "next/link";
import Image from "next/image";

import { FiPlus } from "react-icons/fi";
import { MdArrowForwardIos } from "react-icons/md";

const getPhotos = (movieId: number, mediaType: string, 
        title: string, posters: any, backdrops: any) => {
    return (
      <div className="grid-photos">
        {posters.slice(0, 4).map((item: any, index: number) => (
          <div 
            key={(index + 1) + "-posters"} 
            className={`photo-${index + 1} bg-dark rounded-md`}
          >
            <Image
              priority
              unoptimized
              loader={() => `https://image.tmdb.org/t/p/w500${item.file_path}`}
              src={`https://image.tmdb.org/t/p/w500${item.file_path}`}
              alt="Poster"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-full object-cover rounded-md opacity-80"
            />
          </div>
        ))}

        {backdrops.slice(0, 3).map((item: any, index: number) => (
          <div 
            key={(index + 1) + "-backdrops"} 
            className={`backdrop-${index + 1} bg-black rounded-md`}
          >
            <Image
              priority
              unoptimized
              loader={() => `https://image.tmdb.org/t/p/w500${item.file_path}`}
              src={`https://image.tmdb.org/t/p/w500${item.file_path}`}
              alt="Poster"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-full object-cover rounded-md opacity-80"
            />
          </div>
        ))}

        {backdrops.slice(3, 4).map((item: any) => (
          <Link 
            key="last-backdrops"
            href={`/title/${mediaType}/${movieId + "-" 
              + title?.toLowerCase().replace(/[^A-Z0-9]+/ig, "-")}/photogallery`}
            className="last-backdrop relative group bg-dark rounded-md"
          >
            <Image
              priority
              unoptimized
              loader={() => `https://image.tmdb.org/t/p/w500${item.file_path}`}
              src={`https://image.tmdb.org/t/p/w500${item.file_path}`}
              alt="Poster"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-full object-cover rounded-md opacity-50 
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

const Photos = ({movieId, mediaType, title, posters, backdrops}: 
    {movieId: number, mediaType: string, title: string, posters: any, backdrops: any}) => {
  
  return (
    <div className="pt-16 max-sm:pt-12">
      <Link 
        href={`/title/${mediaType}/${movieId + "-" 
          + title?.toLowerCase().replace(/[^A-Z0-9]+/ig, "-")}/photogallery`} 
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
        {getPhotos(movieId, mediaType, title, posters, backdrops)}
      </div>
    </div>
  )
}

export default Photos;