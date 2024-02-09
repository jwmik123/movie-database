"use client";
import { useQuery } from "react-query";
import { getPopularMovies } from "../movies/api";
import { Movie, MovieAPIResponse, MovieListProps } from "../types/Movie";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MovieCard } from "./MovieCard";

const MovieList: React.FC<MovieListProps> = ({ session }) => {
  const [favorites, setFavorites] = useState<number[]>(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (movieId: number) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(movieId)) {
        return prevFavorites.filter((id) => id !== movieId);
      } else {
        return [...prevFavorites, movieId];
      }
    });
  };

  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useQuery<MovieAPIResponse, Error>({
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

  const getMovieTitleById = (movieId: number): string => {
    const movie = data?.results?.find((m: Movie) => m.id === movieId);
    return movie ? movie.title : "Unknown Movie";
  };

  return (
    <div className="m-10">
      <div className="flex items-center justify-between">
        <h1 className="w-full text-3xl font-bold">Popular Movies</h1>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => handlePaginationChange(currentPage - 1)}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">{currentPage}</PaginationLink>
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
          <>
            <Popover>
              <PopoverTrigger>
                <Button>My Favorite Movies</Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex flex-col divide-y-2">
                  {favorites.map((movieId) => (
                    <Link
                      href={`/movie/${movieId}`}
                      key={movieId}
                      className="py-2"
                    >
                      {getMovieTitleById(movieId)}
                    </Link>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </>
        )}
      </div>

      <div className="grid grid-cols-4 gap-10">
        {data?.results?.map((movie: Movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            session={session}
            isFavorite={favorites.includes(movie.id)}
            onToggleFavorite={() => toggleFavorite(movie.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
