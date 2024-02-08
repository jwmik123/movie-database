export interface Movie {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  overview?: string;
  poster_path?: string;
  backdrop_path?: string;
}
