import { getServerSession } from "next-auth";
import { authOptions } from "./utils/auth";

import Navigation from "./components/navigation";
import MovieList from "./components/MovieList";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <Navigation />

      <MovieList />
    </main>
  );
}
