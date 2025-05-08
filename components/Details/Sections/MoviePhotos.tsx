import "@styles/photos.css";

import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import { MdArrowForwardIos } from "react-icons/md";

import { FallbackImage } from "@components";

import type { IMoviePhotoProps } from "@types";

import { slugify } from "@lib/helpers/helpers";

const getLessPhotos = (props: IMoviePhotoProps & { route: string }) => {
  const { mediaType, posters, backdrops, route } = props;

  return (
    <div
      className="grid grid-cols-11 max-md:grid-cols-10
        gap-[15px] max-md:gap-[8px] w-full 
        h-[240px] max-xl:h-[200px] max-lg:h-[190px] 
        max-md:h-[175px] max-sm:h-[125px]"
    >
      {posters.slice(0, 4).map((item, index: number) => (
        <div
          key={index + 1 + "-posters"}
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

      {backdrops.slice(0, 1).map((item) => (
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
            className={`object-cover rounded-md
              ${
                posters.length + backdrops.length > 5
                  ? "opacity-50 transition-opacity duration-200 group-hover:opacity-30"
                  : "opacity-80"
              }`}
          />

          {posters.length + backdrops.length > 5 && (
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <FiPlus className="text-light text-5xl" />
            </span>
          )}
        </Link>
      ))}
    </div>
  );
};

const getPhotos = (props: IMoviePhotoProps & { route: string }) => {
  const { mediaType, posters, backdrops, route } = props;

  return (
    <div className="grid-photos">
      {posters.slice(0, 4).map((item, index: number) => (
        <div
          key={index + 1 + "-posters"}
          className={`relative bg-dark rounded-md
            ${`photo-${index + 1}`}`}
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

      {backdrops.slice(0, 3).map((item, index: number) => (
        <div
          key={index + 1 + "-backdrops"}
          className={`relative bg-dark rounded-md 
            ${`backdrop-${index + 1}`}`}
        >
          <FallbackImage
            src={item.file_path}
            mediaType={mediaType}
            alt="backdrop"
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            placeholder="blur"
            blurDataURL="/images/blur.jpg"
            className="object-cover rounded-md opacity-80"
          />
        </div>
      ))}

      {backdrops.slice(3, 4).map((item) => (
        <Link
          key="last-backdrops"
          href={`${route}/photogallery`}
          className="last-backdrop relative group bg-dark rounded-md"
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
            <FiPlus className="text-light text-5xl" />
          </span>
        </Link>
      ))}
    </div>
  );
};

const MoviePhotos = ({
  id,
  mediaType,
  title,
  posters,
  backdrops,
}: IMoviePhotoProps) => {
  const route = `/title/${mediaType}/${id}-${slugify(title)}`;

  return (
    <>
      <Link
        href={`${route}/photogallery`}
        className="group flex items-center w-fit"
      >
        <h3 className="text-main text-2xl max-sm:text-xl font-semibold">
          Photos
        </h3>
        <span className="pl-3 text-xs text-main-1">
          {posters.length + backdrops.length}
        </span>

        <MdArrowForwardIos
          className="text-main text-3xl max-sm:text-2xl font-semibold 
              transition-colors duration-200 group-hover:text-tale"
        />
      </Link>

      <div className="pt-7">
        {posters.length > 4 && backdrops.length > 4
          ? getPhotos({ id, mediaType, title, posters, backdrops, route })
          : getLessPhotos({ id, mediaType, title, posters, backdrops, route })}
      </div>
    </>
  );
};

export default MoviePhotos;
