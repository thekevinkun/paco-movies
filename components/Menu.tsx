"use client"

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { IShowMobileMenu } from "@types";
import { MEDIA_TYPE } from "@helpers/constant";


const Menu = ({isShowMobileMenu, setIsShowMobileMenu} : IShowMobileMenu) => {
  const [activeMenu, setActiveMenu] = useState("");
  
  const toggleMenu = () => {
    if (isShowMobileMenu && setIsShowMobileMenu)
      setIsShowMobileMenu(false);
  }

  return (
    <>
      {MEDIA_TYPE.map((item) => (
        <Link key={item.id} id={item.id} href={`/${item.id}`}
            className={`w-full py-3 max-lg:px-3
            ${activeMenu !== item.id ? "hover:bg-tale-1" : "pointer-events-none"}`}
            onClick={() => toggleMenu()}
        >
            <div className="flex flex-col items-center max-lg:flex-row max-lg:items-center max-lg:gap-3">
                <Image
                    src={item.icon}
                    alt="icon"
                    width={28}
                    height={28}
                    className={`object-contain ${activeMenu === item.id && "opacity-50"}`}
                />
                <p className={`text-main font-semibold pt-2.5 
                    ${activeMenu === item.id && "text-gray-700"}`}
                >
                    {item.title}
                </p>
            </div>
        </Link>
      ))}

      {/* <div className="w-full pt-3">
        {menu?.categories.length > 0 &&
            <div className="py-3 border-t-2 border-slate-200">
            <h2 className="px-3 text-gray-500">Categories</h2>

            <div className={`${activeMenu !== "stars" && "grid grid-cols-2 items-center px-3"}
                pt-2 max-lg:flex max-lg:flex-col max-lg:items-start max-lg:px-0`}>
                {menu?.categories.map((item) => (
                <MenuCategory
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    icon={`/assets/images/${item.title.toLowerCase()}.svg`}
                    mediaType={activeMenu}
                    isActive={activeCategory === item.id.replace(/-/g, "_") ? true : false}
                    toggleMenu={() => toggleMenu()}
                />
                ))}
            </div>
            </div>
        }
        
        { (menu?.genres.length > 0 && activeMenu !== "stars") &&
          <div className="py-3 border-t-2 border-slate-200">
            <h2 className="px-3 text-gray-500">Genres</h2>

            <div className="pt-2">
              {menu?.genres.map((item) => (
                <MenuGenre
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  icon={`/assets/images/${item.name.toLowerCase()}.svg`}
                  mediaType={activeMenu}
                  isActive={activeCategory == item.id ? true : false}
                  toggleMenu={() => toggleMenu()}
                />
              ))}
            </div>
          </div>
        }
      </div> */}
    </>
  )
}

export default Menu;