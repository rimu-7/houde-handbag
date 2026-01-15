"use client";

import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthProvider";

export default function Register() {
  const router = useRouter();
  const { user, loading, refreshUser } = useAuth();

  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [loading, user, router]);

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    // 1. Client-Side Validation
    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    startTransition(async () => {
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // 2. Ensure body is valid JSON
          body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Registration failed");
          return;
        }

        // 3. Success Flow:
        // A. Update Client Context (if using context)
        if (refreshUser) await refreshUser();

        // B. Refresh Server Components (recognizes cookie)
        router.refresh();

        // C. Navigate to Dashboard
        router.replace("/dashboard");
      } catch (err) {
        console.error("Registration error:", err);
        setError("Something went wrong. Please try again.");
      }
    });
  };

  // Prevent flash of content while checking auth status
  if (loading) return null;

  return (
    <div className="w-full justify-center flex items-center min-h-screen mx-auto px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>Enter your details to register</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  disabled={isPending}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  disabled={isPending}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength={6}
                  disabled={isPending}
                />
              </div>

              {error && (
                <p className="text-sm text-red-500 font-medium">{error}</p>
              )}

              <Button
                type="submit"
                className="w-full mt-2"
                disabled={isPending}
              >
                {isPending ? "Creating Account..." : "Register"}
              </Button>
            </div>
          </form>
        </CardContent>

        <CardFooter className="justify-center">
          <Button variant="link" asChild className="text-muted-foreground">
            <Link href="/login">Already have an account? Sign In</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
