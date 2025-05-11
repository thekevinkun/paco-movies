"use client";

import { useEffect, useState, useRef } from "react";

import { Menu, MotionDiv, SearchBar } from "@components";

import { parentModalVariants } from "@lib/utils/motion";
import { IoMdMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const mobileMenu = useRef<HTMLElement>(null);

  const [isShowMobileMenu, setIsShowMobileMenu] = useState(false);

  // Handle escape key and body scroll lock
  useEffect(() => {
    if (isShowMobileMenu) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [isShowMobileMenu]);

  return (
    <div>
      {/* NAV DESKTOP */}
      <nav className="w-72 max-xl:w-64 max-lg:hidden">
        <div
          className="w-72 max-xl:w-64 fixed bottom-0 left-0 
            flex grow shrink-0 basis-auto flex-col items-center z-20"
        >
          <div
            className="nav-glass nav-menu w-full h-[calc(100dvh-64px)]
            flex flex-col items-center pt-5 overflow-auto"
          >
            <Menu />
          </div>
        </div>
      </nav>

      {/* MENU ICON FOR MOBILE */}
      <div
        className="hidden h-16 ml-[18px] max-md:ml-3 
            fixed top-0 left-0 z-30 max-lg:flex items-center"
      >
        <IoMdMenu
          className="text-main text-[27px] cursor-pointer hover:text-neutral-500 
                transition-colors duration-200"
          onClick={() => setIsShowMobileMenu(true)}
        />
      </div>

      {/* NAV MOBILE */}
      <nav
        ref={mobileMenu}
        className={`${
          isShowMobileMenu && "nav-glass"
        } fixed top-0 left-0 transition-all z-40 
        ${isShowMobileMenu ? "w-96 max-sm:w-80 max-xs:w-72 max-2xs:w-64" : "w-0"}`}
      >
        <div className="nav-menu h-dvh flex flex-col overflow-x-hidden overflow-y-auto">
          <div className="mb-3 p-3">
            <SearchBar 
              widthClass="w-full" 
              margin="mx-auto" 
              isShowMobileMenu={isShowMobileMenu}
              setIsShowMobileMenu={setIsShowMobileMenu}
            />
          </div>

          <Menu
            isShowMobileMenu={isShowMobileMenu}
            setIsShowMobileMenu={setIsShowMobileMenu}
          />
        </div>

        <RxCross2
          className={`${isShowMobileMenu ? "w-auto p-1" : "w-0"} 
                object-contain absolute top-[11px] right-[-55px] 
                text-[42px] text-danger hover:text-red-500 cursor-pointer`}
          onClick={() => setIsShowMobileMenu(false)}
        />
      </nav>

      {/* Blurred background */}
      {isShowMobileMenu &&
        <MotionDiv
          variants={parentModalVariants()}
          initial="hidden"
          animate="show"
          exit="exit"
          className="w-full h-screen absolute inset-0 z-30
            bg-black/55 backdrop-blur-sm"
        />
      }
    </div>
  );
};

export default Navbar;
