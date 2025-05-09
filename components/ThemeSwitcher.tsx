"use client";

import React from "react";
import { useState } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";

const ThemeSwitcher = () => {
  const [whichTheme, setWhichTheme] = useState("dark");

  const handleSwitchTheme = () => {
    const body = document.body;

    if (whichTheme === "dark") {
      body.classList.remove("dark");
      body.classList.add("light");

      setWhichTheme("light");
    } else if (whichTheme === "light") {
      body.classList.remove("light");
      body.classList.add("dark");

      setWhichTheme("dark");
    }
  };

  return (
    <div className="ml-auto mr-5 max-lg:mr-[18px] max-md:mr-3 max-lg:absolute max-lg:right-0">
      {whichTheme === "light" ? (
        <MdDarkMode
          className="text-[27px] max-sm:text-[25px] text-main cursor-pointer hover:text-light-2 
                transition-colors duration-200"
          onClick={() => handleSwitchTheme()}
        />
      ) : (
        <MdLightMode
          className="text-[27px] max-sm:text-[25px] text-main cursor-pointer hover:text-light-2 
                transition-colors duration-200"
          onClick={() => handleSwitchTheme()}
        />
      )}
    </div>
  );
};

export default ThemeSwitcher;
