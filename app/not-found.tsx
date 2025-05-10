import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found — PacoMovies",
  description: "404 | Page is not found",
};

const NotFound = () => {
  return (
    <>
      <div className="max-xs:px-10 h-full mx-auto max-lg:min-h-[94vh] flex flex-col items-center justify-center">
        <h2 className="font-medium text-danger text-lg max-xs:text-base text-center">
          Sorry, this page could not be found.
        </h2>
      </div>
    </>
  );
};

export default NotFound;
