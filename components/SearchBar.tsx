"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { IoSearch } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

const SearchBar = ({
  widthClass,
  margin,
}: {
  widthClass: string;
  margin: string;
}) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    const query = searchQuery.trim().replace(/\s/g, "-");

    setSearchQuery("");

    router.push(`/search?query=${query}`);
  };

  const handleEnterSearch = (e: React.KeyboardEvent) => {
    const target = e.target as HTMLElement;

    if (e.key === "Enter") {
      target.blur();
      handleSearch();
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div
      className={`${widthClass} ${margin} bg-light px-1.5 
        border border-gray-700 shadow-lg flex items-center`}
    >
      <input
        type="text"
        placeholder="Search"
        className="search-input !rounded-none !border-none"
        value={searchQuery}
        onChange={({ target }) => setSearchQuery(target.value)}
        onKeyUp={(e) => handleEnterSearch(e)}
      />

      {searchQuery && (
        <RxCross2
          className="text-2xl text-danger hover:text-red-500 cursor-pointer mr-1"
          onClick={() => handleClearSearch()}
        />
      )}

      <IoSearch
        className={`text-xl text-dark hover:text-light-2 cursor-pointer ${
          !searchQuery && "pointer-events-none"
        }`}
        onClick={() => handleSearch()}
      />
    </div>
  );
};

export default SearchBar;
