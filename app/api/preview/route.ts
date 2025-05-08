import { getCachedPreview } from "@lib/redis/getCachedPreview";
import { withApiHandler } from "@lib/utils/withApiHandler";

export const GET = withApiHandler(async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const mediaType = searchParams.get("mediaType") || "movie";
  const id = parseInt(searchParams.get("id") || "1");

  const data = await getCachedPreview(mediaType, id);
  return data;
});