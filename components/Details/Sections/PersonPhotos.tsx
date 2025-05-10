import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import { MdArrowForwardIos } from "react-icons/md";

import { FallbackImage } from "@components";

import type { IPersonPhotosProps } from "@types";

import { slugify } from "@lib/helpers/helpers";

const PersonPhotos = ({ personId, name, images }: IPersonPhotosProps) => {
  const route = `/name/${personId}-${slugify(name)}`;

  return (
    <>
      <Link
        href={`${route}/photogallery`}
        className="group flex items-center w-fit"
      >
        <h3 className="text-main text-2xl max-sm:text-xl font-semibold">
          Photos
        </h3>
        <span className="pl-3 text-xs text-main-1">{images.length}</span>

        <MdArrowForwardIos
          className="text-main  text-3xl max-sm:text-2xl font-semibold
            transition-colors duration-200 group-hover:text-tale"
        />
      </Link>

      <div
        className="pt-7 grid gap-[15px] max-md:gap-[8px] w-full 
          grid-cols-10 grid-rows-[1fr] max-md:grid-cols-8
          h-[280px] max-xl:h-[250px] max-lg:h-[255px] 
          max-md:h-[250px] max-sm:h-[195px] max-xs:h-[180px]
          max-2xs:h-[165px]"
      >
        {images.slice(0, 4).map((item, index: number) => (
          <div
            key={index}
            className={`relative col-span-2 bg-dark rounded-md
              ${index === 0 && "max-md:hidden"}`}
          >
            <FallbackImage
              src={item.file_path}
              mediaType="person"
              alt="profile"
              fill
              sizes="(min-width: 768px) 20vw, 25vw"
              placeholder="blur"
              blurDataURL="/images/blur.jpg"
              className="object-cover rounded-md opacity-80"
            />
          </div>
        ))}

        {images.slice(4, 5).map((item, index: number) => (
          <Link
            key={index}
            href={`${route}/photogallery`}
            className="relative bg-black col-span-2 
              group rounded-md"
          >
            <FallbackImage
              src={item.file_path}
              mediaType="person"
              alt="profile"
              fill
              sizes="(min-width: 768px) 20vw, 25vw"
              placeholder="blur"
              blurDataURL="/images/blur.jpg"
              className={`object-cover rounded-md
                ${
                  images.length > 5
                    ? "opacity-50 transition-opacity duration-200 group-hover:opacity-30"
                    : "opacity-80"
                }`}
            />

            {images.length > 5 && (
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <FiPlus className="text-light text-5xl max-md:text-4xl max-xs:text-3xl" />
              </span>
            )}
          </Link>
        ))}
      </div>
    </>
  );
};

export default PersonPhotos;
