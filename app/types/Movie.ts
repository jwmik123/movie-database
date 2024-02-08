export interface Movie {
  id: number;
  title: string;
  release_date: string;
  release_year: number;
  vote_average: number;
  tagline?: string;
  director?: string;
  overview?: string;
  description?: string;
  poster_path?: string;
  backdrop_path?: string;
}
