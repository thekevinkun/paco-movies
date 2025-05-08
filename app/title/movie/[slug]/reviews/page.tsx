import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Page on building..." + " — PacoMovies",
    description: "Movie Reviews",
  };
}

const MovieReviews = async () => {
  return (
    <>
      <div className="h-[92vh] flex flex-col items-center justify-center">
        <h2 className="font-medium text-lg text-danger">
          Sorry. This page is still on building.
        </h2>
      </div>
    </>
  );
};

export default MovieReviews;
