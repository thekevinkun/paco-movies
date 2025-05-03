import { Metadata } from "next";

import { ContentDetailsClient } from "@components/Clients";

import { getCachedDetails } from "@lib/cache";
import { isNumeric } from "@lib/helpers/helpers";

export async function generateMetadata({params, mediaType="person"}: 
      {params: any, mediaType: string}): Promise<Metadata> {
  params = await params;
  const nameId = params.slug.substring(0, params.slug.indexOf("-"));
  
  const data = await getCachedDetails(mediaType, !isNumeric(params.slug) ? nameId : params.slug);
  const title = data.details.name;

  return {
    title: title + " — PacoMovies",
    description: title + " details page",
  };
}

const NamePerson = async ({params, mediaType="person"}: {params: any, mediaType: string}) => {
  params = await params;
  const nameId = params.slug.substring(0, params.slug.indexOf("-"));
  
  const data = await getCachedDetails(mediaType, !isNumeric(params.slug) ? nameId : params.slug);

  return (
    <ContentDetailsClient 
      data={data}
      mediaType={mediaType}
    />
  )
}

export default NamePerson;