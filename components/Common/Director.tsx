// components/common/Director.tsx
import React from "react";
import Link from "next/link";
import { slugify } from "@helpers/helpers";

import { IDirectorProps } from "@types";


const Director = ({ crews }: IDirectorProps) => {
  const director = crews.find((person) => person.job === "Director");
  if (!director) return null;

  return (
    <Link 
      href={`/name/${director.id}-${slugify(director.name)}`}
      className="hover:underline hover:text-tale"
    > 
      <p className="max-xl:text-sm max-sm:text-xs">
        {director.name}
      </p>
    </Link>
  );
};

export default Director;