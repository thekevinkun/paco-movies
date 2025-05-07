import type { Metadata } from "next";

import { ContentDetailsClient } from "@components/Clients";

import type { IGetPersonDetailsResponse } from "@types";

import { getCachedDetails } from "@lib/cache";

export const dynamic = "force-static";

// REQUIRED to avoid build/runtime param bugs
export async function generateStaticParams() {
  return []; // Prevents runtime "await params" error
}

export async function generateMetadata({ params }: {params: Promise<{ slug: string }>}): Promise<Metadata> {
  const mediaType = "person";
  const { slug } = await params;
  const nameId = Number(slug.split("-")[0]);
  
  const data = await getCachedDetails(mediaType, nameId) as IGetPersonDetailsResponse;
  const title = data.details.name;
  const bio = data.details.biography;

  return {
    title: title + " — PacoMovies",
    description: bio,
  };
}

const NamePerson = async ({ params }: {params: Promise<{ slug: string }>}) => {
  const mediaType = "person";
  const { slug } = await params;
  const nameId = Number(slug.split("-")[0]);
  
  const data = await getCachedDetails(mediaType, nameId);

  return (
    <ContentDetailsClient 
      data={data}
      mediaType={mediaType}
    />
  )
}

export default NamePerson;