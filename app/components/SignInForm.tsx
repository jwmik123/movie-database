"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignInForm() {
  const [email, setEmail] = useState<null | string>(null);

  async function SignInWithEmail() {
    const signInResult = await signIn("email", {
      email,
      callbackUrl: `${window.location.origin}/`,
      redirect: false,
    });

    if (!signInResult?.ok) {
      return toast({
        title: "Login failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }

    return toast({
      title: "Check your email",
      description: "A link has been sent to your email address.",
    });
  }

  return (
    <form action={SignInWithEmail}>
      <div className="flex flex-col gap-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          type="email"
          placeholder="johndoe@example.com"
        />
        <Button type="submit">Login with email</Button>
      </div>
    </form>
  );
}
