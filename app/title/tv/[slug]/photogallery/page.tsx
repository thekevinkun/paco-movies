import { Metadata } from "next";

export async function generateMetadata({params, mediaType="tv"}: 
    {params: any, mediaType: string}): Promise<Metadata> {

    return {
        title: "Page on building..." + " — PacoMovies",
        description: "TV Photo Gallery",
    };
}

const TvPhotoGallery = async ({params, mediaType="tv"}: {params: any, mediaType: string}) => {
  params = await params;
  const titleId = params.slug.substring(0, params.slug.indexOf("-"));

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