"use client";
import { useState } from "react";
import { useQuery } from "react-query";
import { searchMovies } from "../movies/api";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Movie } from "../types/Movie";

interface SearchProps {
  data: any;
  isLoading: boolean;
  error: any;
  focused: (value: boolean) => void;
}

export default function Search() {
  const [query, setQuery] = useState("");
  const [isInputFocused, setInputFocused] = useState(false);
  const { data, isLoading, error } = useQuery(
    ["movies", query],
    () => searchMovies(query),
    {
      enabled: !!query,
    },
  );
  return (
    <div className="relative w-1/3">
      <div className="relative flex max-w-sm items-center space-x-2">
        <Input
          type="text"
          placeholder="Search movies"
          value={query}
          onFocus={() => setInputFocused(true)}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {isInputFocused && (
        <SearchResults
          data={data}
          isLoading={isLoading}
          error={error}
          focused={setInputFocused}
        />
      )}
    </div>
  );
}

const SearchResults: React.FC<SearchProps> = ({
  data,
  isLoading,
  error,
  focused,
}) => {
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div
      className="bg-primary text-primary-foreground absolute z-50 p-5"
      onClick={() => focused(false)}
    >
      <ul className="divide-y-2 divide-gray-300">
        <p className="text-base font-bold">Search Results:</p>
        {data?.results.map((movie: Movie) => (
          <li className="py-2" key={movie.id}>
            <Link href={`/movie/${movie.id}`}>
              {movie.title} | {movie.release_date}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
