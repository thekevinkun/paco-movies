import { MediaItem, VideoItem } from "@types";

export interface ICardMovieTopProps {
  id: number;
  poster: string;
  backDrop: string;
  title: string;
  overview: string;
  mediaType: string;
  releaseDate: string;
  rating: number;
  popularity?: number;
  trailer: VideoItem | null;
}

export interface ICardMovieProps {
  id: number;
  poster: string;
  title: string;
  mediaType: string;
  releaseDate: string;
  rating?: number;
  popularity?: number;
}

export interface ICardPersonProps {
  id: number;
  name: string;
  photo: string;
  department: string;
  popularity: number;
  works: MediaItem[];
}

export interface ICardSearchProps {
  id: number;
  name: string;
  photo: string;
  mediaType: string;
  releaseDate: string;
  vote: number;
  overview: string;
  department: string;
  works: MediaItem[];
}

export interface ICardPersonCreditsProps {
  id: number;
  mediaType: string;
  title: string;
  character: string;
  releaseDate: string;
  poster: string;
  vote: number;
}