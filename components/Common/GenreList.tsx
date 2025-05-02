import React from "react";
import Link from "next/link";
import { slugify } from "@helpers/helpers";

import { IGenreProps } from "@types";

const GenreList = ({ mediaType, genres }: IGenreProps) => {
  return (
    <>
      {genres.map((genre) => (
        <React.Fragment key={genre.id}>
          <Link
            href={`/genre/${mediaType}/${genre.id}-${slugify(genre.name)}`}
            className="inline-block font-normal text-sm max-xl:text-xs
                max-lg:text-sm hover:text-tale"
          >
            {genre.name}
          </Link>
          <span className="bullet-separator text-sm
            max-xl:text-xs max-lg:text-sm font-normal"
          >
            {" "}&#8226;{" "}
          </span>
        </React.Fragment>
      ))}
    </>
  );
};

export default GenreList;