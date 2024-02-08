"use client";
import { useQuery } from "react-query";
import { getPopularMovies } from "../movies/api";
import { Movie } from "../types/Movie";
import { StarIcon } from "lucide-react";

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

  return (
    <div className="m-10">
      <h1 className=" text-3xl font-bold">Most Popular Movies</h1>
      <div className="grid grid-cols-4 gap-4">
        {data?.results?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="relative my-10 cursor-pointer">
      <img
        className=" w-full rounded-t-lg object-cover shadow-lg"
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
      />
      <div className="bg-secondary-foreground text-primary-foreground flex items-center justify-between rounded-b-lg p-2">
        <h2 className=" font-bol text-xl">{movie.title}</h2>
        <span className="items-centers flex space-x-2 py-2">
          <StarIcon size={24} color="blue" />
          <p>{movie.vote_average}</p>
        </span>
      </div>
    </div>
  );
};
