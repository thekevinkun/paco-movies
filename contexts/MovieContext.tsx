import React from "react";
import { createContext, useContext, useState } from "react";

import { IMovieContext } from "@types";

const MovieContextDefaultValues: IMovieContext = {
    results: [],
    page: 0,
    totalPages: 0,
    totalResults: 0,
    handleCollectData: (data: {page: number, results: [], total_pages: number, total_results: number}) => {}
}

const MovieContext = createContext<IMovieContext>(MovieContextDefaultValues);

export function useMovie() {
    return useContext(MovieContext);
}

export const MovieProvider = ({ children } : Readonly<{children: React.ReactNode;}>) => {
    const [results, setResults] = useState<[]>([]);
    const [page, setPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [totalResults, setTotalResults] = useState<number>(0);

    const handleCollectData = 
            (data: {page: number, results: [], total_pages: number, total_results: number}) => {
        setResults(data.results);
        setPage(data.page);
        setTotalPages(data.total_pages);
        setTotalResults(data.total_results);
    }

    const value = {
        results,
        page,
        totalPages,
        totalResults,
        handleCollectData
    }

    return (
        <>
            <MovieContext.Provider value={value}>
                {children}
            </MovieContext.Provider>
        </>
    )
}