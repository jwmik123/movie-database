import Link from "next/link";
import { MovieCardProps } from "../types/Movie";
import { Heart } from "lucide-react";

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  session,
  isFavorite,
  onToggleFavorite,
}) => {
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
            className={`cursor-pointer transition-transform hover:scale-105 hover:text-red-500 ${isFavorite ? "fill-red-500 text-red-500" : "text-black"}`}
            onClick={() => {
              onToggleFavorite();
            }}
          />
        ) : null}
      </div>
    </div>
  );
};
