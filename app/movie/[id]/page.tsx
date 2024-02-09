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
    <>
      <div className="relative h-[90vh]">
        <div className="absolute flex h-full w-full  bg-black bg-opacity-50 text-white">
          <img
            className="m-10 rounded-md object-cover"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <div className="mt-10 flex flex-col space-y-2 p-10">
            <h1 className="text-6xl font-bold">{movie.title}</h1>
            <p className="text-xl">({movie.release_date})</p>
            <p>Rating: {Math.round(movie.vote_average)}</p>
            <p className="text-lg italic text-gray-300">{movie.tagline}</p>
            <div>
              <h2 className="pt-10 text-3xl font-bold">Overview</h2>
              <p className="pt-4 text-base">{movie.overview}</p>
            </div>
          </div>
        </div>

        <img
          className="h-full w-full object-cover"
          src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${movie.backdrop_path}`}
          alt={movie.title}
        />
      </div>
    </>
  );
};

export default MovieDetailsPage;
