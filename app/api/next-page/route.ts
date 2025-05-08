import { getCachedNextPage } from "@lib/redis/getCachedNextPage";
import { withApiHandler } from "@lib/utils/withApiHandler";

export const GET = withApiHandler(async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const mediaType = searchParams.get("mediaType") || "movie";
  const category = searchParams.get("category") || "popular";
  const query = searchParams.get("query") || "";
  const page = parseInt(searchParams.get("page") || "1");

  const data = await getCachedNextPage(mediaType, category, query, page);
  return data;
});
