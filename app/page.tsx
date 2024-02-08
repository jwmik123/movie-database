import { getServerSession } from "next-auth";
import { authOptions } from "./utils/auth";

import MovieList from "./components/MovieList";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <MovieList session={session} />
    </main>
  );
}
