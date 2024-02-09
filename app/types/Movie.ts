import { Session } from "next-auth";

export interface MovieAPIResponse {
  results: Movie[];
}

export interface Movie {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  overview?: string;
  poster_path?: string;
  backdrop_path?: string;
}

export interface MovieCardProps {
  movie: Movie;
  session: Session | null;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export interface MovieListProps {
  session: Session | null;
}
