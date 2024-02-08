import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LogoutButton from "./LogoutButton";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/auth";
import Search from "./Search";

export default async function Navigation() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="flex w-full justify-between border-b-2 p-10">
      <h1 className="text-2xl font-bold">The Movie Database</h1>
      <Search />
      <div className="flex space-x-4">
        {session ? (
          <div>
            <LogoutButton />
          </div>
        ) : (
          <div>
            <Button asChild>
              <Link href="/auth">Sign in</Link>
            </Button>
          </div>
        )}
        <ModeToggle />
      </div>
    </nav>
  );
}
