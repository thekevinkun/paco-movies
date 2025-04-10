import { MouseEventHandler, Dispatch, SetStateAction } from "react";

export interface IShowMobileMenu {
    isShowMobileMenu?: boolean;
    setIsShowMobileMenu?: Dispatch<SetStateAction<boolean>>;
}

export interface IMenuContext {
    activeMediaType: string;
    activeCategory: string;
    handleChangeMediaType: (mediaType: string) => void;
    handleChangeCategory: (name: string) => void;
    showCategories?: {id: string, title: string, icon: string}[];
    showGenres?: {id: number, name: string}[];
}

export interface IApiOptions {
    method: string
    cache: RequestCache | undefined;
    headers: {
        accept: string,
        Authorization: string
    }
}

export interface ICardMovieTop {
    id: number
    poster: string
    backDrop: string
    title: string
    overview: string
    mediaType: string
    releaseDate: string
    rating: number
}

export interface ICardMovie {
    id: number
    poster: string
    title: string
    mediaType: string
    releaseDate: string
    rating: number
}