"use client";
import { useQuery } from "react-query";
import { getPopularMovies } from "../movies/api";
import { Movie } from "../types/Movie";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieList() {
  const { data, isLoading, error } = useQuery<Movie[], Error>({
    queryKey: ["popularMovies"],
    queryFn: getPopularMovies,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>An error has occurred: {error.message}</p>;

  console.log(data);
  return (
    <div>
      <h1>Movie List</h1>
      {data?.results?.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div>
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
    </div>
  );
};
