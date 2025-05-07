import { ReactNode, Dispatch, SetStateAction } from "react";
import { ImageProps } from "next/image";

export interface ShowMobileMenuProps {
    isShowMobileMenu?: boolean;
    setIsShowMobileMenu?: Dispatch<SetStateAction<boolean>>;
}

export interface Category {
  id: string; 
  title: string; 
  icon: string;
}

export interface FallbackImageProps extends Omit<ImageProps, "src"> {
    src?: string | null;
    mediaType: string;
    sizes?: string;
}

// ACTION PROPS
export interface VideoActionProps {
    href: string;
    videoKey: string;
    videoTitle: string;
    containerStyles: string;
    children: ReactNode;
}

export interface PreviewActionProps {
    mediaType: string;
    id: number;
    containerStyles: string;
    children: ReactNode;
}