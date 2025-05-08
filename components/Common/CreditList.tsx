import React from "react";
import Link from "next/link";

import type { ICreditListProps } from "@types";

import { slugify } from "@lib/helpers/helpers";

const CreditList = ({
  items,
  filterJobs,
  containerStyles,
  childStyles,
  handleClick,
}: ICreditListProps) => {
  const filtered = filterJobs
    ? items.filter((person) => filterJobs.includes(person.job || ""))
    : items;
  if (!filtered) return null;

  return (
    <>
      {filtered.slice(0, 3).map((item) => (
        <React.Fragment key={item.id}>
          <Link
            href={`/name/${item.id}-${slugify(item.name ?? "")}`}
            className={`hover:underline hover:text-tale
                            ${containerStyles}`}
            onClick={handleClick}
          >
            <p className={childStyles}>{item.name}</p>
          </Link>
          <span className={`bullet-separator ${childStyles}`}> &#8226; </span>
        </React.Fragment>
      ))}
    </>
  );
};

export default CreditList;
