import { 
  CreditsMovie, CreditItem, Country,
  ExternalIds, Genre, ImageSet, MediaItem, 
  PersonItem, ReleaseDate, ReviewItem, 
  ReleaseDatePreview, TvRatings, VideoItem
} from "@types";


export interface ITMDBError {
  success: false;
  status_message: string;
};

export interface IApiOptions {
    method: string;
    cache: RequestCache | undefined;
    headers: {
        accept: string,
        Authorization: string
    }
}

export interface ReleaseDateEntry {
  certification: string;
  release_date: string;
};

export interface ReleaseDateResult {
  iso_3166_1: string;
  release_dates: ReleaseDateEntry[];
};

export interface ReleaseDatesResponse {
  results: ReleaseDateResult[];
};

export interface TvRatingResult {
  iso_3166_1: string;
  rating: string;
};

export interface TvRatingResponse {
  results: TvRatingResult[];
};

export interface MovieDetails extends MediaItem {
  origin_country: string[];
  production_countries: { iso_3166_1?: string}[];
}

export interface PersonDetails extends PersonItem {}

export interface VideosResponse {
  results: VideoItem[];
};

export interface ImagesMovieResponse {
  backdrops: ImageSet[];
  posters: ImageSet[];
}

export interface ImagesPersonResponse {
  profiles: ImageSet[];
}

export interface ReviewsResponse {
  results: ReviewItem[];
};

export interface RecommendationsResponse {
  results: MediaItem[];
};

export interface IGetByCategoryResponse {
  page: number;
  firstResult?: {
    result: MediaItem;
    officialTrailer: VideoItem | null;
  };
  results: MediaItem[] | CreditItem[];
  total_pages: number;
  total_results: number;
}

export interface IGetStarsResponse {
  page: number;
  results: MediaItem[] | CreditItem[];
  total_pages: number;
  total_results: number;
}

export interface IGetSearchResponse {
  page: number;
  results: MediaItem[] | CreditItem[];
  total_pages: number;
  total_results: number;
}

export interface IGetGenreResponse {
  genres: Genre[];
}

export interface IGetMovieDetailsResponse {
  details: MovieDetails;
  releaseDate?: ReleaseDate;
  ratings?: TvRatings;
  officialTrailer: VideoItem | null;
  originCountry: Country[];
  credits: CreditsMovie;
  media: {
    videos: VideoItem[];
    backdrops: ImageSet[];
    posters: ImageSet[];
  };
  externalIds: ExternalIds;
  reviews: ReviewItem[];
  recommendations: MediaItem[];
}

export interface IGetPersonDetailsResponse {
  details: PersonDetails,
  credits: CreditsMovie,
  images: ImageSet[],
  externalIds: ExternalIds
}

export interface IGetPreviewDetailsResponse {
  details: MovieDetails;
  releaseDate?: ReleaseDatePreview | null;
  ratings?: TvRatings | null;
  credits: CreditsMovie;
}

export type CachedResponse =
  | IGetMovieDetailsResponse
  | IGetPersonDetailsResponse;

export type CachedCategoryResponse = 
  | IGetStarsResponse
  | IGetByCategoryResponse;

export type CachedNextPageResponse =
  | IGetByCategoryResponse
  | IGetSearchResponse;