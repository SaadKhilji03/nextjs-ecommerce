"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string; username?: string }>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!username.trim()) newErrors.username = "Username is required";
    if (!email.includes("@")) newErrors.email = "Enter a valid email";
    if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, username, password }),
      headers: { "Content-Type": "application/json" },
    });
    setLoading(false);

    if (res.ok) {
      toast.success("Signup successful! Please log in.");
      router.push("/login");
    } else {
      const error = await res.text();
      toast.error("Signup failed: " + error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <h2 className="text-xl font-semibold text-foreground">Sign Up</h2>
        </CardHeader>
        <form onSubmit={handleSignup}>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
            </div>

            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2 top-2.5 text-muted-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>
          </CardContent>

          <CardFooter className="mt-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
