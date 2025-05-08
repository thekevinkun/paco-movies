import { MouseEventHandler } from "react";
import { CreditItem, Genre, Network } from "@types";

export interface INetworkListProps {
    mediaType: string;
    networks: Network[];
    containerStyles?: string;
    childStyles?: string;
}

export interface IGenreListProps {
    mediaType: string;
    genres: Genre[];
    containerStyles?: string;
    childStyles?: string;
    handleClick?: MouseEventHandler<HTMLAnchorElement>;
}

export interface ICreditListProps {
  items: CreditItem[];
  filterJobs?: string[];
  containerStyles?: string;
  childStyles?: string;
  handleClick?: MouseEventHandler<HTMLAnchorElement>;
}

export interface IDirectorProps {
  crews: CreditItem[];
  containerStyles?: string;
  childStyles?: string;
  handleClick?: MouseEventHandler<HTMLAnchorElement>;
}