"use client";
import { useQuery } from "react-query";
import { getPopularMovies } from "../movies/api";
import { Movie } from "../types/Movie";
import Link from "next/link";

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
      <div className="grid grid-cols-4 gap-10">
        {data?.results?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link
      href={`/movie/${movie.id}`}
      className="relative my-10 cursor-pointer transition-transform hover:scale-105"
    >
      <img
        className=" w-full rounded-t-lg object-cover shadow-lg"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <div className="bg-secondary-foreground text-primary-foreground flex items-center justify-between rounded-b-lg px-2 py-4 font-bold">
        <h2 className=" font-bol text-xl">{movie.title}</h2>
      </div>
    </Link>
  );
};
