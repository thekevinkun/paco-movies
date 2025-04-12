import React from "react";
import { createContext, useContext, useState } from "react";

import { IMenuContext } from "@types";

import { MEDIA_TYPE } from "@helpers/constants";

const MenuContextDefaultValues: IMenuContext = {
    activeMediaType: "all",
    activeCategory: "trending",
    handleChangeMediaType: (mediaType: string, genre?: any) => {},
    handleChangeCategory: (name: string) => {},
    showCategories: [],
    showGenres: []
}

const MenuContext = createContext<IMenuContext>(MenuContextDefaultValues);

export function useMenu() {
    return useContext(MenuContext);
}

export const MenuProvider = ({ children } : Readonly<{children: React.ReactNode;}>) => {
    const [activeMediaType, setActiveMediaType] = useState<string>("all");
    const [activeCategory, setActiveCategory] = useState<string>("trending");
    const [showCategories, setShowCategories] = useState<{ id: string; title: string; icon: string; }[] | undefined>(undefined);
    const [showGenres, setShowGenres] = useState<{id: number, name: string}[] | undefined>(undefined);

    const handleChangeMediaType = (mediaType: string, genre?: any) => {
        const objMediaType = MEDIA_TYPE.find(item => item.id === mediaType);
        const getMediaTypeCategory = objMediaType && objMediaType["categories"];

        setActiveMediaType(mediaType);
        setShowCategories(getMediaTypeCategory);

        if (genre)
            setShowGenres(genre);
    }

    const handleChangeCategory = (name: string) => {
        setActiveCategory(name);
    }

    const value = {
        activeMediaType,
        handleChangeMediaType,
        activeCategory,
        handleChangeCategory,
        showCategories,
        showGenres
    }

    return (
        <>
            <MenuContext.Provider value={value}>
                {children}
            </MenuContext.Provider>
        </>
    )
}