import { CachedNextPageResponse } from "@types";

export interface MediaItem {
  id: number;
  media_type: string;
  title?: string;
  name?: string;
  overview?: string;
  poster_path?: string;
  backdrop_path?: string;
  vote_average?: number;
  release_date?: string;
  first_air_date?: string;
  runtime?: number;
  number_of_seasons?: number;
  networks?: Network[]
  character?: string;
  created_by?: CreditItem[];
  vote_count?: number;
  popularity?: number;
  [key: string]: any;
}

export interface VideoItem {
  id: number;
  key: string;
  name: string;
  site?: string;
  type?: string;
  official?: boolean;
  published_at?: string;
}

export interface PersonWorks {
  id: number;
  media_type: string;
  title?: string;
  name?: string;
}

export interface PersonItem {
  id: number;
  name: string;
  profile_path?: string;
  homepage?: string;
  birthday?: string;
  deathday?: string;
  place_of_birth?: string;
  biography?: string;
}

export interface CreditItem {
  id: number;
  media_type?: string;
  title?: string;
  name?: string;
  profile_path?: string;
  character?: string;
  release_date?: string;
  first_air_date?: string;
  poster_path?: string;
  vote_average?: number;
  popularity?: number;
  job?: string;
  known_for_department?: string;
  known_for?: PersonWorks[];
  [key: string]: any;
}

export interface CreditsMovie {
  cast: CreditItem[];
  crew: CreditItem[];
}

export interface SeasonItem {
  id: string;
  poster_path: string;
  name: string;
  episode_count: number;
  season_number: number;
  air_date: string;
  overview: string;
  vote_average: number;
}

export interface ReviewItem {
  author: string;
  content: string;
  created_at: string;
  author_details: {
    name: string | null;
    username: string;
    avatar_path: string | null;
    rating: number | null;
  };
}

export interface Country {
  iso_3166_1: string;
  native_name?: string;
  english_name?: string;
}

export interface ReleaseDate {
  iso_3166_1: Country | undefined;
  date: string | null;
  certification: string | null;
}

export interface ReleaseDatePreview {
  iso_3166_1: string  | null;
  date: string | null;
  certification: string | null;
}

export interface TvRatings {
  rating: string;
  iso_3166_1?: Country | string;
}

export interface ImageSet {
  file_path: string;
}

export interface ExternalIds {
  twitter_id?: string;
  facebook_id?: string;
  instagram_id?: string;
  imdb_id?: string;
  wikidata_id?: string;
}

export interface Person {
  id: number;
  name: string;
  profile_path?: string;
  known_for_department?: string;
  known_for?: PersonWorks[];
  popularity?: number;
}

export interface Crew extends Person {
  job: string;
}

export interface Cast extends Person {
  character: string;
}

export interface CreditsPerson {
  cast: Cast[];
  crew: Crew[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface Network {
  id: number;
  logo_path: string;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
}

export interface SpokenLanguage {
  name: string;
  english_name?: string;
}

export interface SearchResult {
  id: number;
  media_type: string;
  name?: string;
  title?: string;
  overview?: string;
  poster_path?: string;
  profile_path?: string;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  popularity?: number;
}

export interface LoadMoreProps {
  page: number;
  mediaType: string;
  category: string;
  query?: string;
  onNextPage: (items: CachedNextPageResponse) => void;
}