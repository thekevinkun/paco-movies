"use client";

import Link from "next/link";
import Image from "next/image";

import { useMenu } from "@contexts/MenuContext";

import type { ShowMobileMenuProps } from "@types";

import { slugify } from "@lib/helpers/helpers";
import { MEDIA_TYPE } from "@lib/utils/constants";

const Menu = ({
  isShowMobileMenu,
  setIsShowMobileMenu,
}: ShowMobileMenuProps) => {
  const { activeMediaType, activeCategory, showCategories, showGenres } =
    useMenu();

  const toggleMenu = () => {
    if (isShowMobileMenu && setIsShowMobileMenu) setIsShowMobileMenu(false);
  };

  return (
    <>
      {MEDIA_TYPE.map((item) => (
        <Link
          key={item.id}
          id={item.id}
          href={`/${item.id}`}
          className={`w-full py-3.5 max-lg:px-3
          ${
            activeMediaType !== item.id
              ? "hover:bg-tale-1"
              : "pointer-events-none"
          }`}
          onClick={() => toggleMenu()}
        >
          <div
            className="flex flex-col items-center 
                max-lg:flex-row max-lg:gap-3 pointer-events-none"
          >
            <Image
              priority
              src={item.icon}
              alt="icon"
              width={28}
              height={28}
              sizes="28px"
              className={`pointer-events-none object-contain 
                  ${activeMediaType === item.id && "opacity-50"}`}
            />
            <p
              className={`text-main font-semibold pt-2.5 max-lg:pt-1 pointer-events-none
                ${activeMediaType === item.id && "!text-gray-700"}`}
            >
              {item.title}
            </p>
          </div>
        </Link>
      ))}

      <div className="w-full pt-3">
        {showCategories && showCategories.length > 0 && (
          <div className="py-3.5 border-t-2 border-gray-500">
            <h2 className="px-3 text-light-2">Categories</h2>

            <div
              className={`${
                activeMediaType !== "stars" &&
                "grid grid-cols-2 items-center px-3"
              }
                pt-2 max-lg:flex max-lg:flex-col max-lg:items-start max-lg:px-0`}
            >
              {showCategories?.map((item) => (
                <Link
                  key={item.id}
                  id={item.id}
                  href={`/${activeMediaType}/${item.id}`}
                  className={`py-3 flex flex-col items-center max-lg:px-3 max-lg:w-full 
                      max-lg:flex-row max-lg:gap-3
                      ${
                        activeCategory === item.id.replace(/-/g, "_")
                          ? "pointer-events-none"
                          : "hover:bg-tale-1"
                      }`}
                  onClick={() => toggleMenu()}
                >
                  <Image
                    priority
                    src={item.icon}
                    alt="Icon"
                    width={28}
                    height={28}
                    sizes="28px"
                    className={`object-contain 
                      ${
                        activeCategory === item.id.replace(/-/g, "_") &&
                        "opacity-50"
                      }`}
                  />

                  <p
                    className={`text-main text-sm font-semibold pt-2.5 max-lg:pt-0 ${
                      activeCategory === item.id.replace(/-/g, "_") &&
                      "!text-gray-700"
                    }`}
                  >
                    {item.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {showGenres && showGenres.length > 0 && (
          <div className="py-3.5 border-t-2 border-gray-500">
            <h2 className="px-3 text-light-2">Genres</h2>

            <div className="pt-2">
              {showGenres.map((item) => (
                <Link
                  key={item.id}
                  id={item.id.toString()}
                  href={`/genre/${activeMediaType}/${item.id}-${slugify(
                    item.name
                  )}`}
                  className={`p-3 flex items-center gap-3
                    ${
                      activeCategory == item.id.toString()
                        ? "pointer-events-none"
                        : "hover:bg-tale-1"
                    }`}
                  onClick={() => toggleMenu()}
                >
                  <Image
                    priority
                    src={`/images/${slugify(item.name)}.svg`}
                    alt="Icon"
                    width={28}
                    height={28}
                    sizes="28px"
                    className={`object-contain 
                      ${activeCategory == item.id.toString() && "opacity-50"}`}
                  />

                  <p
                    className={`text-main text-sm font-semibold pt-2.5 max-lg:pt-0
                      ${
                        activeCategory == item.id.toString() && "!text-gray-700"
                      }`}
                  >
                    {item.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Menu;
