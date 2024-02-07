import { getServerSession } from "next-auth";
import { authOptions } from "./utils/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <div className="p-10">
        <h1 className="font-bold text-3xl">The Movie Database</h1>

        {session ? (
          <p className="mt-10"></p>
        ) : (
          <p className="mt-10">You are not authenticated. Please login.</p>
        )}
      </div>
    </main>
  );
}
