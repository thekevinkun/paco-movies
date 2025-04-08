import { MouseEventHandler, Dispatch, SetStateAction } from "react";

export interface IShowMobileMenu {
    isShowMobileMenu?: boolean;
    setIsShowMobileMenu?: Dispatch<SetStateAction<boolean>>;
}

export interface IMenuContext {
    activeMediaType: string;
    handleChangeMediaType: (item: string) => void;
    showCategories?: {id: string, title: string, icon: string}[];
    showGenres?: {id: number, name: string}[];
}