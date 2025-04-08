"use client"

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Error — PacoMovies",
  description: "Error page",
};

const Error = () => {
    return (
      <>
          <div className="h-[92vh] flex flex-col items-center justify-center">
            <h2 className="font-medium text-lg text-danger">
              Something went wrong! Please try again later.
            </h2>
          </div>
      </>
    );
  }
  
  export default Error;