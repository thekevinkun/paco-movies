import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found — PacoMovies",
  description: "404 | Page is not found",
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
  );
};

export default NotFound;
