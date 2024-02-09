"use client";
import { useState } from "react";
import { useQuery } from "react-query";
import { searchMovies } from "../movies/api";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface SearchProps {
  data: any;
  isLoading: boolean;
  error: any;
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
          onBlur={() => setInputFocused(false)}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {isInputFocused && (
        <SearchResults data={data} isLoading={isLoading} error={error} />
      )}
    </div>
  );
}

const SearchResults: React.FC<SearchProps> = ({ data, isLoading, error }) => {
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="bg-primary text-primary-foreground absolute z-50 p-5">
      <ul className="divide-y-2 divide-gray-300">
        <p className="text-base font-bold">Search Results:</p>
        {data?.results.map((movie) => (
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
