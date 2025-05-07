import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Page on building..." + " — PacoMovies",
        description: "TV Photo Gallery",
    };
}

const TvPhotoGallery = async () => {
  return (
    <>
        <div className="h-[92vh] flex flex-col items-center justify-center">
            <h2 className="font-medium text-lg text-danger">
                Sorry. This page is still on building.
            </h2>
        </div>
      </>
  )
}

export default TvPhotoGallery;