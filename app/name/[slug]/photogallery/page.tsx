import { Metadata } from "next";

export async function generateMetadata({params, mediaType="person"}: 
    {params: any, mediaType: string}): Promise<Metadata> {

    return {
        title: "Page on building..." + " — PacoMovies",
        description: "Person Photo Gallery",
    };
}

const PersonPhotoGallery = async ({params, mediaType="person"}: {params: any, mediaType: string}) => {
  params = await params;
  const nameId = params.slug.substring(0, params.slug.indexOf("-"));

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

export default PersonPhotoGallery;