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