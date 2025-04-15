"use client"

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { useMenu } from "@contexts/MenuContext";

import { IShowMobileMenu } from "@types";
import { MEDIA_TYPE } from "@helpers/constants";

const Menu = ({isShowMobileMenu, setIsShowMobileMenu} : IShowMobileMenu) => {
  const { activeMediaType, activeCategory, showCategories, showGenres } = useMenu();
  
  const toggleMenu = () => {
    if (isShowMobileMenu && setIsShowMobileMenu)
      setIsShowMobileMenu(false);
  }

  return (
    <>
      {MEDIA_TYPE.map((item) => (
        <Link key={item.id} id={item.id} href={`/${item.id}`}
            className={`w-full py-3 max-lg:px-3
            ${activeMediaType !== item.id ? "hover:bg-tale-1" : "pointer-events-none"}`}
            onClick={(e) => {toggleMenu();}}
        >
            <div className="flex flex-col items-center 
                  max-lg:flex-row max-lg:items-center max-lg:gap-3 pointer-events-none"
            >
                <Image
                    src={item.icon}
                    alt="icon"
                    width={28}
                    height={28}
                    className={`pointer-events-none object-contain 
                      ${activeMediaType === item.id && "opacity-50"}`}
                />
                <p className={`text-main font-semibold pt-2.5 pointer-events-none
                    ${activeMediaType === item.id && "!text-gray-700"}`}
                >
                    {item.title}
                </p>
            </div>
        </Link>
      ))}

      <div className="w-full pt-3">
        {showCategories && showCategories.length > 0 &&
            <div className="py-3 border-t-2 border-slate-200">
            <h2 className="px-3 text-gray-500">Categories</h2>

            <div className={`${activeMediaType !== "stars" && "grid grid-cols-2 items-center px-3"}
                pt-2 max-lg:flex max-lg:flex-col max-lg:items-start max-lg:px-0`}>
                {showCategories?.map((item) => (
                  <Link key={item.id} id={item.id} href={`/${activeMediaType}/${item.id}`}
                    className={`py-3 flex flex-col items-center max-lg:px-3 max-lg:w-full 
                        max-lg:flex-row max-lg:gap-3
                        ${activeCategory === item.id.replace(/-/g, "_") ? "pointer-events-none" : "hover:bg-tale-1"}`}
                    onClick={() => toggleMenu()}
                  >
                    <Image
                      src={item.icon}
                      alt="Icon"
                      width={28}
                      height={28}
                      className={`object-contain 
                        ${activeCategory === item.id.replace(/-/g, "_") && "opacity-50"}`
                      }
                    />
              
                    <p
                      className={`text-main text-sm font-semibold pt-2.5 ${
                        activeCategory === item.id.replace(/-/g, "_") && "!text-gray-700"
                      }`}
                    >
                      {item.title}
                    </p>
                  </Link>
                ))}
            </div>
            </div>
        }
        
        { (showGenres && showGenres.length > 0) &&
          <div className="py-3 border-t-2 border-slate-200">
            <h2 className="px-3 text-gray-500">Genres</h2>

            <div className="pt-2">
              {showGenres.map((item) => (
                <Link 
                    key={item.id}
                    id={item.id.toString()} 
                    href={`/genre/${activeMediaType}/${item.id + "-" 
                      + item.name.toLowerCase().replace(/[^A-Z0-9]+/ig, "-")}`
                    }
                    className={`p-3 flex items-center gap-3
                      ${activeCategory == item.id.toString() ? "pointer-events-none" : "hover:bg-tale-1"}`}
                    onClick={() => toggleMenu()}
                >
                  <Image
                    src={`/images/${item.name.toLowerCase()}.svg`}
                    alt="Icon"
                    width={28}
                    height={28}
                    className={`object-contain 
                      ${activeCategory == item.id.toString() && "opacity-50"}`
                    }
                  />

                  <p className={`text-main text-sm font-semibold pt-2.5 
                      ${activeCategory == item.id.toString() && "!text-gray-700"}`}>
                    {item.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        }
      </div>
    </>
  )
}

export default Menu;