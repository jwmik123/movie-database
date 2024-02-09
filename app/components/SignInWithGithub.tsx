"use client";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { signIn } from "next-auth/react";

export default function SignInWithGithub() {
  return (
    <Button
      onClick={() =>
        signIn("github", {
          callbackUrl: `https://movie-database-sand.vercel.app/`,
        })
      }
      variant="secondary"
    >
      Login with Github <Github className="ml-2 h-4 w-4" />
    </Button>
  );
}
