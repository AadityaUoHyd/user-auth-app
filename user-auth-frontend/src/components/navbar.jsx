import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, LogIn, UserPlus, Moon, Sun } from "lucide-react";
import { NavLink } from "react-router"; // <-- fix import
import { useTheme } from "next-themes";
import { useAuthStore } from "../utils/auth";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const authenticated =
    useAuthStore((state) => state.status) === "authenticated";
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <header className="z-50 border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        {/* Brand */}
        <NavLink
          to={authenticated ? "/dashboard" : "/"}
          className="inline-flex items-center gap-2 font-semibold"
        >
          <img
            src="/logo.png"
            alt="Logo"
            className="inline-block h-6 w-6 rounded-md object-cover"
          />
          <span className="text-base tracking-tight">User Auth App</span>
        </NavLink>

        {/* Desktop actions */}
        <nav className="hidden items-center gap-2 md:flex">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          {authenticated && (
            <>
              <NavLink to="/dashboard" aria-label="Dashboard">
                <Button
                  variant={"ghost"}
                  size="sm"
                  className="gap-2 cursor-pointer"
                >
                  Dashboard
                </Button>
              </NavLink>
              <NavLink to="#" aria-label="Login">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 cursor-pointer"
                >
                  {user?.name}
                </Button>
              </NavLink>

              <NavLink to="#" aria-label="Logout">
                <Button
                  onClick={logout}
                  variant="outline"
                  size="sm"
                  className="gap-2 cursor-pointer"
                >
                  Logout
                </Button>
              </NavLink>
            </>
          )}

          {!authenticated && (
            <>
              <NavLink to="/login" aria-label="Login">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 cursor-pointer"
                >
                  Login
                </Button>
              </NavLink>
              <NavLink to="/register" aria-label="Register">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 cursor-pointer"
                >
                  Register
                </Button>
              </NavLink>
            </>
          )}
        </nav>

        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <img
                    src="/logo.png"
                    alt="Logo"
                    className="inline-block h-6 w-6 rounded-md object-cover"
                  />
                  <span>User Auth App</span>
                </SheetTitle>
              </SheetHeader>

              <div className="mt-6 space-y-4">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2"
                  onClick={toggleTheme}
                >
                  {theme === "dark" ? (
                    <>
                      <Sun className="h-4 w-4" /> Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="h-4 w-4" /> Dark Mode
                    </>
                  )}
                </Button>

                <Separator />

                {!authenticated && (
                  <>
                    <NavLink to="/login" className="block" aria-label="Login">
                      <Button
                        className="w-full justify-start gap-2"
                      >
                        Login
                      </Button>
                    </NavLink>
                    <NavLink to="/register" className="block" aria-label="Register">
                      <Button className="w-full justify-start gap-2">
                        Register
                      </Button>
                    </NavLink>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
