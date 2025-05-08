// components/common/Director.tsx
import React from "react";
import Link from "next/link";

import type { IDirectorProps } from "@types";

import { slugify } from "@lib/helpers/helpers";

const Director = ({
  crews,
  containerStyles,
  childStyles,
  handleClick,
}: IDirectorProps) => {
  const director = crews.find((person) => person.job === "Director");
  if (!director) return null;

  return (
    <Link
      href={`/name/${director.id}-${slugify(director.name ?? "")}`}
      className={`hover:underline hover:text-tale
        ${containerStyles}`}
      onClick={handleClick}
    >
      <p className={childStyles}>{director.name}</p>
    </Link>
  );
};

export default Director;
