"use client"

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found — PacoMovies",
  description: "Not found page",
};

const NotFound = () => {
  return (
    <>
      <div className="h-[92vh] flex flex-col items-center justify-center">
        <h2 className="text-danger text-lg font-medium">
            Sorry, this page could not be found.
        </h2>
      </div>
    </>
    
  )
}

export default NotFound;