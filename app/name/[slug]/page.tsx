import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { ContentDetailsClient } from "@components/Clients";

import type { IGetPersonDetailsResponse } from "@types";

import { getCachedDetails } from "@lib/redis";
import { slugify } from "@lib/helpers/helpers";

export const dynamic = "force-dynamic";

// REQUIRED to avoid build/runtime param bugs
export async function generateStaticParams() {
  return []; // Prevents runtime "await params" error
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const mediaType = "person";
  const { slug } = await params;
  const nameId = Number(slug.split("-")[0]);

  try {
    const data = (await getCachedDetails(
      mediaType,
      nameId
    )) as IGetPersonDetailsResponse;
    const title = data.details.name;
    const bio = data.details.biography;

    return {
      title: title + " — PacoMovies",
      description: bio,
    };
  } catch (error) {
    console.error("generateMetadata error:", error);
    return {
      title: "Error — PacoMovies",
      description: "Failed to load details of a person.",
    };
  }
}

const NamePerson = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const mediaType = "person";
  const { slug } = await params;
  const [nameId, ...slugParts] = slug.split("-");
  const currentSlug = slugParts.join("-");

  const data = (await getCachedDetails(
    mediaType, 
    Number(nameId)
  )) as IGetPersonDetailsResponse;

  const trueSlug = slugify(data.details.name ?? "");

  if (trueSlug && currentSlug !== trueSlug) 
    redirect(`/name/${nameId}-${trueSlug}`);

  return <ContentDetailsClient data={data} mediaType={mediaType} />;
};

export default NamePerson;
