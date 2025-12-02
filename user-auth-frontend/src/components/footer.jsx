import React from "react";
import { NavLink } from "react-router";

export default function Footer() {
  return (
    <footer className="border-t bg-background/50 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">

          {/* Left Section */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold tracking-tight">
              User Auth App
            </h3>
            <p className="text-sm text-muted-foreground">
              Secure login & authentication platform.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <NavLink
              to="#"
              className="text-muted-foreground transition hover:text-foreground"
            >
              Documentation
            </NavLink>

            <NavLink
              to="#"
              className="text-muted-foreground transition hover:text-foreground"
            >
              Privacy Policy
            </NavLink>

            <NavLink
              to="#"
              className="text-muted-foreground transition hover:text-foreground"
            >
              Terms & Conditions
            </NavLink>

            <NavLink
              to="#"
              className="text-muted-foreground transition hover:text-foreground"
            >
              Support
            </NavLink>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t" />

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-3 text-sm text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} User Auth App. All rights reserved.</p>

          <p className="flex items-center gap-1">
            Crafted with ❤️ by{" "}
            <span className="font-medium text-foreground">
              <a href="https://www.linkedin.com/in/aaditya-bachchu-chatterjee-0485933b/">Aaditya B Chatterjee</a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
