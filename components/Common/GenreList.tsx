import React from "react";
import Link from "next/link";

import type { IGenreListProps } from "@types";

import { slugify } from "@lib/helpers/helpers";

const GenreList = ({
  mediaType,
  genres,
  containerStyles,
  childStyles,
  handleClick,
}: IGenreListProps) => {
  return (
    <>
      {genres.map((genre) => (
        <React.Fragment key={genre.id}>
          <Link
            href={`/genre/${mediaType}/${genre.id}-${slugify(genre.name)}`}
            className={`inline-block font-normal hover:text-tale
              ${containerStyles}`}
            onClick={handleClick}
          >
            {genre.name}
          </Link>
          <span className={`bullet-separator font-normal ${childStyles}`}>
            {" "}
            &#8226;{" "}
          </span>
        </React.Fragment>
      ))}
    </>
  );
};

export default GenreList;
