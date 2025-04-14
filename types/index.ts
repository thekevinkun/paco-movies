import { MouseEventHandler, Dispatch, SetStateAction } from "react";

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

export interface IMovieContext {
    results: any[];
    page: number;
    totalPages: number;
    totalResults: number;
    handleCollectData: (data: {page: number, results: [], total_pages: number, total_results: number}) => void;
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
    index: number
    poster: string
    title: string
    mediaType: string
    releaseDate: string
    rating: number
}

export interface ICardPerson {
    id: number
    index: number
    name: string
    photo: string
    department: string
    popularity: number 
    works: any
}