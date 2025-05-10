import { 
  Country, CreditItem, CreditsMovie, ExternalIds, 
  Genre, ImageSet, MediaItem, Network, PersonDetails,
  ProductionCompany, ReleaseDate, ReviewItem, 
  SpokenLanguage, SeasonItem, TvRatings, VideoItem,
  IGetByCategoryResponse, IGetSearchResponse,
  IGetMovieDetailsResponse, IGetPersonDetailsResponse,
} from "@types";

interface Content {
  mediaType: string;
  category?: string;
  categoryTitle?: string;
}

export interface IContentMoviesProps extends Content {
  data: IGetByCategoryResponse; 
  genres?: Genre[];
}

export interface IContentStarsProps extends Content {
  data: IGetByCategoryResponse; 
}

export interface IContentSearchProps extends Content {
  data: IGetSearchResponse; 
  query: string;
}

export interface IContentDetailsProps extends Content {
  data: IGetMovieDetailsResponse | IGetPersonDetailsResponse; 
}

export interface IDetailsMainProps {
    id: number;
    mediaType: string;
    backdrop: string;
    poster: string;
    title: string;
    rating: number;
    releaseDate: string;
    officialTrailer: VideoItem | null;
    genres: Genre[];
    tagline?: string;
    overview: string;
    credits?: CreditsMovie;
    country?: Country | null;
    certification?: string;
    runtime?: number;
    tvrating?: string;
    status?: string;
    networks?: Network[];
    creators?: CreditItem[];
}

export interface IDetailsMore {
    mediaType: string;
    details: MediaItem;
    releaseDate?: ReleaseDate;
    tvratings?: TvRatings;
    originCountry: Country[];
    videos: VideoItem[];
    posters: ImageSet[];
    backdrops: ImageSet[];
    credits: CreditsMovie;
    externalIds: ExternalIds;
    reviews: ReviewItem[];
    recommendations: MediaItem[];
}

export interface IDetailsPersonMain {
    details: PersonDetails;
    externalIds: ExternalIds;
}

export interface IDetailsPersonMore {
    details: PersonDetails;
    credits: IPersonCredits;
    images: ImageSet[];
}

export interface IBoxOfficeProps {
  details: {
    budget: number | null;
    revenue: number | null;
  };
}

export interface ICreditsProps {
  id: number;
  mediaType: string;
  title: string;
  casts: CreditItem[];
  crews: CreditItem[];
  creators: CreditItem[];
}

export interface IDetailsProps {
  mediaType: string;
  details: MediaItem & {
    homepage?: string;
    spoken_languages: SpokenLanguage[];
    production_companies: ProductionCompany[];
  };
  releaseDate?: ReleaseDate;
  tvratings?: TvRatings;
  originCountry: Country[];
  externalIds: ExternalIds;
}

export interface IVideosProps {
  id: number
  mediaType: string 
  title: string
  videos?: VideoItem[] | null;
}

export interface IMoviePhotoProps {
  id: number
  mediaType: string 
  title: string
  posters: ImageSet[];
  backdrops: ImageSet[];
}

export interface ITvPhotoProps {
  id: number
  mediaType: string 
  name: string
  posters: ImageSet[];
  backdrops: ImageSet[]
}

export interface IPersonCredits {
  cast: CreditItem[];
  crew: CreditItem[];
}

export interface IPersonCreditsProps {
  credits: IPersonCredits;
}

export interface IPersonKnownForProps {
  works: CreditItem[];
}

export interface IPersonPhotosProps {
  personId: number;
  name: string;
  images: ImageSet[]
}

export interface IRecommendationsProps {
  recommendations: CreditItem[];
}

export interface IReviewsProps {
  id: number;
  mediaType: string;
  title: string; 
  reviews: ReviewItem[];
}

export interface ISeasonsProps {
  id: number;
  mediaType: string;
  name: string;
  seasons: number;
  seasonList: SeasonItem[];
}