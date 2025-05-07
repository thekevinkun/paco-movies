import React from "react";
import { createContext, useContext, useState } from "react";

import type { IMenuContextProps, Category, Genre } from "@types";

import { MEDIA_TYPE } from "@lib/utils/constants";

const MenuContextDefaultValues: IMenuContextProps = {
    activeMediaType: "all",
    activeCategory: "trending",
    handleChangeMediaType: (mediaType: string, genre?: Genre[]) => {},
    handleChangeCategory: (name: string) => {},
    showCategories: [],
    showGenres: []
}

const MenuContext = createContext<IMenuContextProps>(MenuContextDefaultValues);

export function useMenu() {
    return useContext(MenuContext);
}

export const MenuProvider = ({ children } : Readonly<{children: React.ReactNode;}>) => {
    const [activeMediaType, setActiveMediaType] = useState<string>("all");
    const [activeCategory, setActiveCategory] = useState<string>("trending");
    const [showCategories, setShowCategories] = useState<Category[] | null>(null);
    const [showGenres, setShowGenres] = useState<Genre[] | null>(null);

    const handleChangeMediaType = (mediaType: string, genre?: Genre[]) => {
        const objMediaType = MEDIA_TYPE.find(item => item.id === mediaType);
        const getMediaTypeCategory = objMediaType && objMediaType["categories"];

        setActiveMediaType(mediaType);
        setShowCategories(getMediaTypeCategory ?? null);
        setShowGenres(genre ?? null);
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