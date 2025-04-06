import { MouseEventHandler, Dispatch, SetStateAction } from "react";

export interface IShowMobileMenu {
    isShowMobileMenu?: boolean;
    setIsShowMobileMenu?: Dispatch<SetStateAction<boolean>>;
}