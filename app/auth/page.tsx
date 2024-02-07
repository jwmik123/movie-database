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

export default function AuthRoute() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Please sign in</CardTitle>
          <CardDescription>
            To add movies to your favorites you have to sign in.
          </CardDescription>
        </CardHeader>
        <CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <div className="flex flex-col gap-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="johndoe@example.com"
                />
                <Button type="submit">Login with email</Button>

                <SignInWithGithub />
              </div>
            </div>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
