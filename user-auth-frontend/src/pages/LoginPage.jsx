import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Mail, Lock, LogIn, AlertCircleIcon, Eye, EyeOff } from "lucide-react";
import AuthLayout from "./auth.layout.jsx";
import OAuthButtons from "@/components/auth/oauth.buttons.jsx";
import { NavLink, useNavigate } from "react-router";
import { Helmet } from "react-helmet";
import { useAuthStore } from "@/utils/auth.js";
import toast from "react-hot-toast";
import { Alert, AlertTitle } from "@/components/ui/alert.jsx";
export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login({ email, password });
      navigate("/dashboard");
      toast.success("Logged in successfully");
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout title="Welcome back" description="Login to your account">
      <Helmet>
        <title>Login Here | User Auth App</title>
      </Helmet>
      <form onSubmit={onSubmit} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
              aria-hidden
            />
            <Input
              id="email"
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-9"
              autoComplete="email"
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
              aria-hidden
            />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pl-9 pr-9"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {error && (
          <Alert variant={"destructive"}>
            <AlertCircleIcon />
            <AlertTitle className="ml-2">{error}</AlertTitle>
          </Alert>
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          <LogIn className="mr-2 h-4 w-4" aria-hidden />{" "}
          {loading ? "Signing in…" : "Sign in"}
        </Button>

        <div className="relative my-1">
          <Separator className="my-4" />
          <div className="absolute inset-0 -top-3 flex items-center justify-center">
            <span className="bg-background px-2 text-xs text-muted-foreground">
              or
            </span>
          </div>
        </div>

        <OAuthButtons loading={loading} />

        <CardFooter className="px-0 flex justify-between text-sm text-muted-foreground">
          <NavLink to="/register" className="hover:underline">
            Create account
          </NavLink>
          <a href="/forgot-password" className="hover:underline">
            Forgot password?
          </a>
        </CardFooter>
      </form>
    </AuthLayout>
  );
}
