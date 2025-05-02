import { Dispatch, ReactNode, MouseEventHandler, SetStateAction } from "react";
import { ImageProps } from "next/image";
export interface IShowMobileMenu {
    isShowMobileMenu?: boolean;
    setIsShowMobileMenu?: Dispatch<SetStateAction<boolean>>;
}

export interface IMenuContext {
    activeMediaType: string;
    activeCategory: string;
    handleChangeMediaType: (mediaType: string, genre?: any) => void;
    handleChangeCategory: (name: string) => void;
    showCategories?: {id: string, title: string, icon: string}[];
    showGenres?: {id: number, name: string}[];
}

export interface IVideoContext {
    videoKey: string | null;
    videoTitle: string;
    open: (key: string, videoTitle: string) => void;
    close: () => void;
}

export interface IVideoAction {
    href: string;
    videoKey: string;
    videoTitle: string;
    containerStyles: string;
    children: ReactNode;
}

export interface IApiOptions {
    method: string;
    cache: RequestCache | undefined;
    headers: {
        accept: string,
        Authorization: string
    }
}

export interface FallbackImageProps extends Omit<ImageProps, "src"> {
    src?: string | null;
    mediaType: string;
    sizes?: string;
}

interface Person {
  id: number;
  name: string;
  job?: string;
}

export interface ICreditListProps {
  items: Person[];
  filterJobs?: string[];
}

export interface IDirectorProps {
  crews: Person[];
}

interface Genre {
  id: number;
  name: string;
}

export interface IGenreProps {
  mediaType: string;
  genres: Genre[];
}

interface Network {
  id: number;
  logo_path: string;
  name: string;
}

export interface INetworkProps {
  mediaType: string;
  networks: Network[];
}

export interface ICardMovieTop {
    id: number;
    poster: string;
    backDrop: string;
    title: string;
    overview: string;
    mediaType: string;
    releaseDate: string;
    rating: number;
}

export interface ICardMovie {
    id: number;
    poster: string;
    title: string;
    mediaType: string;
    releaseDate: string;
    rating: number;
}

export interface ICardPerson {
    id: number;
    name: string;
    photo: string;
    department: string;
    popularity: number;
    works: any;
}

export interface ICardSearch { 
    id: number;
    name: string;
    photo: string;
    mediaType: string;
    releaseDate: string;
    vote: number;
    overview: string;
    department: string;
    works: any;
}

export interface ICardPersonCredits {
    id: number;
    mediaType: string;
    title: string;
    character: string;
    releaseDate: string;
    poster: string;
    vote: number;
}

export interface IDetailsMain {
    id: number;
    mediaType: string;
    backdrop: string;
    poster: string;
    title: string;
    rating: number;
    releaseDate: any;
    genres: any;
    tagline: string;
    overview: string;
    credits: any;
    country?: any;
    certification?: string;
    runtime?: number;
    tvrating?: number;
    status?: string;
    networks?: any;
    creators?: any;
}

export interface IDetailsMore {
    mediaType: string;
    details: any;
    releaseDate?: any;
    tvratings?: any;
    originCountry: any;
    videos: any;
    posters: any;
    backdrops: any;
    credits: any;
    externalIds: any;
    reviews: any;
    recommendations: any;
}

export interface IDetailsPersonMain {
    details: any;
    externalIds: any;
}

export interface IDetailsPersonMore {
    details: any;
    credits: any;
    images: any;
}
