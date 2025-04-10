
"use client"

import { useEffect, useState, useRef } from "react";

import { Menu, SearchBar } from "@components";

import { IoMdMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const mobileMenu = useRef<HTMLElement>(null);

  const [isShowMobileMenu, setIsShowMobileMenu] = useState(false);

  useEffect(() => {
    if (!isShowMobileMenu) return;

    const handleClickOutsideMobileMenu = (e: CustomEvent<MouseEvent>) => {
      if (mobileMenu.current && !mobileMenu.current?.contains(e.target as Node)) {
        setIsShowMobileMenu(false);
      }
    }

    window.addEventListener("mousedown", (handleClickOutsideMobileMenu) as EventListener);

    return () => {
      window.removeEventListener("mousedown", (handleClickOutsideMobileMenu) as EventListener);
    }
  }, [isShowMobileMenu])

  return (
    <div>
      {/* NAV DESKTOP */}
      <nav className="w-72 max-xl:w-64 max-lg:hidden">
        <div className="w-72 max-xl:w-64 fixed bottom-0 left-0 
              flex grow shrink-0 basis-auto flex-col items-center z-50"
        >
          <div className="nav-glass nav-menu w-full h-[calc(100vh-64px)] 
              flex flex-col items-center pt-5 overflow-auto"
          >
              <Menu />
          </div>
        </div>
      </nav>

      {/* MENU ICON FOR MOBILE */}
      <div className="hidden h-16 max-sm:h-14 ml-[18px] max-sm:ml-3 
            fixed top-0 left-0 z-50 max-lg:flex items-center">
        <IoMdMenu 
          className="text-main text-[27px] max-sm:text-[25px] cursor-pointer hover:text-neutral-500 
                transition-colors duration-200"
          onClick={() => setIsShowMobileMenu(true)}
        />
      </div>

      {/* NAV MOBILE */}
      <nav 
        ref={mobileMenu} 
        className={`${isShowMobileMenu && "nav-glass"} fixed top-0 left-0 transition-all z-50 
        ${isShowMobileMenu ? "w-96" : "w-0"}`}
      >
        <div className="nav__menu h-screen flex flex-col overflow-x-hidden overflow-y-auto">
          <div className="mb-3 p-3">
            <SearchBar widthClass="w-full" margin="mx-auto" />
          </div>

          <Menu
            isShowMobileMenu={isShowMobileMenu}
            setIsShowMobileMenu={setIsShowMobileMenu}
          />
        </div>

        <RxCross2
          className={`${isShowMobileMenu ? "w-auto p-1" : "w-0"} 
                    object-contain absolute top-[13px] right-[-45px] 
                    text-[32px] text-danger bg-main/95 hover:bg-main/45 cursor-pointer`}
          onClick={() => setIsShowMobileMenu(false)}
        />
      </nav>
    </div>
  )
}

export default Navbar;