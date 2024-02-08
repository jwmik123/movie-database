"use client";
import { useQuery } from "react-query";
import { getPopularMovies } from "../movies/api";
import { Movie } from "../types/Movie";
import Link from "next/link";
import { Session } from "next-auth";
import { Heart } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface MovieCardProps {
  movie: Movie;
  session: Session | null;
}

interface MovieListProps {
  session: Session | null;
}

const MovieList: React.FC<MovieListProps> = ({ session }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = useQuery<Movie[], Error>({
    queryKey: ["popularMovies", currentPage],
    queryFn: () => getPopularMovies(currentPage),
  });

  const handlePaginationChange = (newPage: number) => {
    setCurrentPage(newPage);
    if (newPage == 0) {
      setCurrentPage(1);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>An error has occurred: {error.message}</p>;

  return (
    <div className="m-10">
      <div className="flex items-center justify-between">
        <h1 className=" text-3xl font-bold">Most Popular Movies</h1>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => handlePaginationChange(currentPage - 1)}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" className="border-primary border">
                {currentPage}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => handlePaginationChange(currentPage + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        {session && (
          <Button variant="outline" className="text-lg">
            Your favorite movies
          </Button>
        )}
      </div>

      <div className="grid grid-cols-4 gap-10">
        {data?.results?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} session={session} />
        ))}
      </div>
    </div>
  );
};

const MovieCard: React.FC<MovieCardProps> = ({ movie, session }) => {
  const [active, setActive] = useState(false);

  const handleFavoriteClick = () => {
    setActive(!active);
  };

  return (
    <div className="relative my-10 cursor-pointer transition-transform hover:scale-105">
      <Link href={`/movie/${movie.id}`}>
        <img
          className=" w-full rounded-t-lg object-cover shadow-lg"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </Link>
      <div className="bg-secondary-foreground text-primary-foreground flex items-center justify-between rounded-b-lg px-2 py-4 font-bold">
        <Link href={`/movie/${movie.id}`}>
          <h2 className=" font-bol text-xl">{movie.title}</h2>
        </Link>
        {session ? (
          <Heart
            width={32}
            className={`cursor-pointer transition-transform hover:scale-105 hover:text-red-500 ${active ? "fill-red-500 text-red-500" : "text-black"}`}
            onClick={() => handleFavoriteClick()}
          />
        ) : null}
      </div>
    </div>
  );
};

export default MovieList;
