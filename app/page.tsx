import { getServerSession } from "next-auth";
import { authOptions } from "./utils/auth";
import LogoutButton from "./components/LogoutButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <div className="p-10">
        <h1 className="font-bold text-3xl">The Movie Database</h1>

        {session ? (
          <div>
            <p className="mt-10">You're logged in</p>
            <LogoutButton />
          </div>
        ) : (
          <div>
            <p className="mt-10">You are not authenticated. Please login.</p>
            <Button asChild>
              <Link href="/auth">Login</Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
