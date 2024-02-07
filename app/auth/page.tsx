import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github } from "lucide-react";
import SignInWithGithub from "../components/SignInWithGithub";
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/auth";
import { redirect } from "next/navigation";
import SignInForm from "../components/SignInForm";

export default async function AuthRoute() {
  const session = await getServerSession(authOptions);
  // If the user is already authenticated, redirect to the home page
  if (session) {
    redirect("/");
  }
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Please sign in</CardTitle>
          <CardDescription>
            To add movies to your favorites you have to sign in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <SignInForm />
            <hr className="my-4" />
            <SignInWithGithub />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
