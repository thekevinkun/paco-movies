import React from "react";
import Link from "next/link";

import { FallbackImage } from "@components";

import { INetworkProps } from "@types";
import { slugify } from "@helpers/helpers";

const NetworkList = ({ mediaType, networks }: INetworkProps) => {
  return (
    <>
      {networks.map((network: any) => (
        <Link 
          key={network.id} 
          href={`https://www.${slugify(network.name)}.com`} 
          className="bg-white p-1 rounded-sm w-[53px] h-[30px]"
        >
          <FallbackImage 
            src={network.logo_path}
            mediaType={mediaType}
            alt="logo"
            width={0}
            height={0}
            sizes="53px"
            className="w-full h-full object-contain"
          />
        </Link>
      ))}
    </>
  );
};

export default NetworkList;