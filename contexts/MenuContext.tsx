import React from "react";
import { createContext, useContext, useState } from "react";

import { IMenuContext } from "@types";

import { MEDIA_TYPE } from "@helpers/constants";

const MenuContextDefaultValues: IMenuContext = {
    activeMediaType: "trending",
    handleChangeMediaType: (item: string) => {},
    showCategories: [],
    showGenres: []
}

const MenuContext = createContext<IMenuContext>(MenuContextDefaultValues);

export function useMenu() {
    return useContext(MenuContext);
}

export const MenuProvider = ({ children } : Readonly<{children: React.ReactNode;}>) => {
    const [activeMediaType, setActiveMediaType] = useState<string>("");
    const [showCategories, setShowCategories] = useState<{ id: string; title: string; icon: string; }[] | undefined>(undefined);
    const [showGenres, setShowGenres] = useState<{id: number, name: string}[] | undefined>(undefined);

    const handleChangeMediaType = (mediaType: string) => {
        const objMediaType = MEDIA_TYPE.find(item => item.id === mediaType);
        const getMediaTypeCategory = objMediaType && objMediaType["categories"];

        setActiveMediaType(mediaType);
        setShowCategories(getMediaTypeCategory);
    }

    const handleChangeCategories = (item: { id: string; title: string; icon: string; }[]) => {
        setShowCategories(item);
    }

    const handleChangeGenres = (item: []) => {
        setShowGenres(item);
    }

    const value = {
        activeMediaType,
        handleChangeMediaType,
        showCategories,
        handleChangeCategories,
        showGenres,
        handleChangeGenres
    }

    return (
        <>
            <MenuContext.Provider value={value}>
                {children}
            </MenuContext.Provider>
        </>
    )
}