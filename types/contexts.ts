import { Category, Genre } from "@types";

export interface IMenuContextProps {
  activeMediaType: string;
  activeCategory: string;
  handleChangeMediaType: (mediaType: string, genre?: Genre[]) => void;
  handleChangeCategory: (name: string) => void;
  showCategories?: Category[] | null;
  showGenres?: Genre[] | null;
}

export interface IVideoContextProps {
  videoKey: string | null;
  videoTitle: string;
  open: (key: string, videoTitle: string) => void;
  close: () => void;
}

export interface IPreviewContextProps {
  previewId: number | null;
  previewMediaType: string;
  open: (mediaType: string, id: number) => void;
  close: () => void;
}