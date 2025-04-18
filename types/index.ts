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

export interface ICardSearch { 
    id: number
    index: number
    name: string
    photo: string
    mediaType: string
    releaseDate: string
    vote: number
    overview: string
    department: string
    works: any
}

export interface IDetailsMovieMain {
    id: number
    mediaType: string
    backdrop: string
    poster: string
    title: string
    rating: number
    releaseDate: any
    country: any
    certification: string
    runtime: number
    genres: any
    tagline: string
    overview: string
    credits: any
}

export interface IDetailsMovieMore {
    mediaType: string
    details: any
    releaseDate: any
    videos: any
    posters: any
    backdrops: any
    credits: any
    externalIds: any
    reviews: any
    recommendations: any
}

export interface IDetailsTvMain {
    id: number
    mediaType: string
    backdrop: string
    poster: string
    name: string
    rating: number
    releaseDate: any
    tvrating: number
    status: string
    networks: any
    genres: any
    tagline: string
    overview: string
    creators: any
    stars: any
}

export interface IDetailsTvMore {
    mediaType: string
    details: any
    ratings: number
    videos: any
    posters: any
    backdrops: any
    credits: any
    externalIds: any
    reviews: any
    recommendations: any
}

export interface IDetailsPersonMain {
    details: any
    externalIds: any
}

export interface IDetailsPersonMore {
    details: any
    credits: any
    images: any
}
