import React from "react";
import Link from "next/link";
import { slugify } from "@helpers/helpers";

import { ICreditListProps } from "@types";

const CreditList = ({ items, filterJobs }: ICreditListProps) => {
    const filtered = filterJobs
        ? items.filter((person) => filterJobs.includes(person.job || ""))
        : items;

    return (
        <>
            {filtered.slice(0, 3).map((item) => (
                <React.Fragment key={item.id}>
                    <Link
                        href={`/name/${item.id}-${slugify(item.name)}`}
                        className="hover:underline hover:text-tale"
                    >
                        <p className="max-xl:text-sm max-sm:text-xs">
                            {item.name}
                        </p>
                    </Link>
                    <span className="max-xl:text-sm max-sm:text-xs bullet-separator"> &#8226; </span>
                </React.Fragment>
            ))}
        </>
    )
}

export default CreditList;