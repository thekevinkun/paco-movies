import React from "react";
import Link from "next/link";

import { FallbackImage } from "@components";

import type { INetworkListProps } from "@types";

import { slugify } from "@lib/helpers/helpers";

const NetworkList = ({ mediaType, networks, containerStyles }: INetworkListProps) => {
  if (!networks) return null;
  
  return (
    <>
      {networks.map((network) => (
        <Link 
          key={network.id} 
          href={`https://www.${slugify(network.name)}.com`} 
          target="_blank"
          rel="noopener noreferrer"
          className={`bg-white p-1 rounded-sm ${containerStyles}`}
        >
          <FallbackImage 
            src={network.logo_path}
            mediaType={mediaType}
            alt="logo"
            width={0}
            height={0}
            sizes="50px"
            className="w-full h-full object-contain"
          />
        </Link>
      ))}
    </>
  );
};

export default NetworkList;