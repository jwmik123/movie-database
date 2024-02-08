"use client";
import { useQuery } from "react-query";
import { getMovieDetails } from "@/app/movies/api";

const MovieDetailsPage = ({ params }: { params: { id: number } }) => {
  const { id } = params;

  const {
    data: movie,
    isLoading,
    error,
  } = useQuery(["movieDetails", id], () => getMovieDetails(id as number));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading movie details.</div>;

  if (!movie) {
    return <div>Movie not found.</div>;
  }

  return (
    // Render movie details
    <p>{movie.title}</p>
  );
};

export default MovieDetailsPage;
