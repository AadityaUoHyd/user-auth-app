import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router";
import {
  Check,
  Shield,
  Lock,
  KeyRound,
  Fingerprint,
  Globe,
  Clock,
  ArrowRight,
  Sparkles,
  Users,
  LogIn,
  Zap,
  Code,
} from "lucide-react";
import { Helmet } from "react-helmet";

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 text-foreground">
      <Helmet>
        <title>Home | User Auth App</title>
      </Helmet>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent/10" />
        <div className="mx-auto max-w-7xl px-4 py-10 sm:py-24 lg:py-32 text-center relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-medium text-foreground/80 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>Secure auth made simple</span>
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-foreground">
            Classic authentication for modern apps
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-lg leading-relaxed text-muted-foreground">
            Password, OTP, and social sign-in with token refresh baked in.
            Drop-in UI, clean APIs, and production-grade security.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="group shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-shadow">
                Get started free <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="border-border hover:border-primary/50">
                Login
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            No credit card required · 30-days trial
          </p>

          <img
                      src="/logo.png"
                      alt="Logo"
                      className="inline-block h-100 w-100 rounded-md object-cover m-6"
                    />
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-2 bg-card/30">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard icon={<Users className="h-8 w-8 text-primary" />} title="10K+" label="Active Users" />
            <StatCard icon={<LogIn className="h-8 w-8 text-primary" />} title="99.9%" label="Uptime" />
            <StatCard icon={<Zap className="h-8 w-8 text-primary" />} title="50+" label="Integrations" />
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-8 bg-muted/20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 gap-4 rounded-2xl border border-border/30 bg-card/80 p-6 text-center text-sm font-medium text-foreground/70 sm:grid-cols-4 shadow-sm">
            <TrustItem icon={<Shield className="h-4 w-4 text-primary" />} text="ISO-ready" />
            <TrustItem icon={<Globe className="h-4 w-4 text-primary" />} text="OAuth & OIDC" />
            <TrustItem icon={<Clock className="h-4 w-4 text-primary" />} text="99.99% Uptime" />
            <TrustItem icon={<Lock className="h-4 w-4 text-primary" />} text="SSO & MFA" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-background/50">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Why choose User Auth App?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
            Everything you need to plug authentication into your product.
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3 px-4">
          <Feature
            icon={<Lock className="h-5 w-5 text-primary" />}
            title="Secure by default"
            desc="httpOnly cookies, short-lived JWTs, and sane defaults."
          />
          <Feature
            icon={<Fingerprint className="h-5 w-5 text-primary" />}
            title="MFA & OTP"
            desc="Email/SMS OTP, TOTP, and backup codes to keep accounts safe."
          />
          <Feature
            icon={<KeyRound className="h-5 w-5 text-primary" />}
            title="Social sign-in"
            desc="Google, GitHub, Apple, and more with one config."
          />
        </div>
      </section>

      {/* Integrations */}
      <section className="py-12 bg-muted/10">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h3 className="text-xl font-semibold text-foreground mb-8">Works with your stack</h3>
          <div className="flex flex-wrap justify-center items-center gap-12 text-2xl text-muted-foreground">
            <Code className="h-8 w-8" />
            <Zap className="h-8 w-8" />
            <Users className="h-8 w-8" />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            How it works
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
            Three simple steps to authenticate users.
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-7xl gap-8 md:grid-cols-3 px-4 relative">
          <div className="absolute inset-0 flex items-center justify-center hidden md:flex">
            <div className="w-px h-full bg-border/30" />
          </div>
          <Step
            n={1}
            title="Register"
            desc="Sign up via email, OTP, or social login."
            className="md:pr-4"
          />
          <Step
            n={2}
            title="Verify"
            desc="Short-lived access token + secure refresh cookie."
            className="md:mx-4"
          />
          <Step
            n={3}
            title="Access"
            desc="APIs use tokens; refresh happens silently."
            className="md:pl-4"
          />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
        <div className="mx-auto max-w-7xl grid gap-8 md:grid-cols-3 px-4">
          <Testimonial
            name="Karan Mehta"
            role="Engineering Lead, CloudOps"
            quote="The authentication flow is smooth and our onboarding time dropped drastically."
            avatar="https://i.pravatar.cc/64?img=53"
          />
          <Testimonial
            name="Sana Ganguly"
            role="Product Designer, NovaTech"
            quote="The UI feels modern and intuitive. Users immediately understood the login flow."
            avatar="https://i.pravatar.cc/64?img=31"
          />
          <Testimonial
            name="Vikram Rao Prasad"
            role="CEO, DataSphere"
            quote="Setup was quick and the reliability has been rock-solid for our team."
            avatar="https://i.pravatar.cc/64?img=51"
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4">
          <Card className="border-border/30 shadow-md">
            <CardHeader className="bg-muted/20">
              <CardTitle className="text-2xl font-bold text-foreground">Frequently asked questions</CardTitle>
              <CardDescription className="text-muted-foreground">
                Quick answers before you integrate.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="1" className="border-border/10">
                  <AccordionTrigger className="hover:no-underline text-foreground/90">
                    Do you support refresh tokens?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground/90">
                    Yes — access tokens are short-lived, refresh tokens are
                    stored in httpOnly cookies.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="2" className="border-border/10">
                  <AccordionTrigger className="hover:no-underline text-foreground/90">
                    Can I use my own UI?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground/90">
                    Absolutely. Use our APIs with your design system or these
                    shadcn templates.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary/5 via-muted/10 to-primary/5">
        <div className="mx-auto max-w-7xl px-4">
          <Card className="border-border/30 shadow-xl">
            <CardContent className="flex flex-col items-center justify-between gap-6 p-8 text-center md:flex-row md:text-left">
              <div className="max-w-md">
                <CardTitle className="text-2xl font-bold text-foreground">
                  Ready to add auth?
                </CardTitle>
                <CardDescription className="text-muted-foreground mt-2">
                  Copy the starter kit and ship login today.
                </CardDescription>
              </div>
              <div className="flex gap-4">
                <Link to="/register">
                  <Button size="lg" className="shadow-lg shadow-primary/10 hover:shadow-primary/20">
                    Create account
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="border-border hover:border-primary/50">
                    Login
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

/* ========== Subcomponents ========== */

function StatCard({ icon, title, label }) {
  return (
    <Card className="border-border/20 hover:shadow-md transition-shadow text-center p-6">
      <div className="flex flex-col items-center gap-2">
        {icon}
        <div className="text-2xl font-bold text-foreground">{title}</div>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </Card>
  );
}

function TrustItem({ icon, text }) {
  return (
    <div className="flex items-center justify-center gap-2 p-3 rounded-xl hover:bg-muted/30 transition-colors cursor-default">
      {icon}
      <span>{text}</span>
    </div>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <Card className="border-border/20 hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <CardHeader className="flex flex-row items-center gap-4 pb-4 bg-gradient-to-r from-muted/30 to-transparent">
        <div className="grid h-12 w-12 place-items-center rounded-xl border-2 border-border/50 bg-primary/5 group-hover:bg-primary/10 transition-colors group-hover:border-primary/30">
          {icon}
        </div>
        <div>
          <CardTitle className="text-lg font-semibold text-foreground">{title}</CardTitle>
          <CardDescription className="text-muted-foreground">{desc}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <ul className="space-y-3 text-sm text-foreground/70">
          <li className="flex items-center gap-3 pl-1 group-hover:text-primary/80 transition-colors">
            <Check className="h-4 w-4 text-primary flex-shrink-0" />
            Easy to integrate
          </li>
          <li className="flex items-center gap-3 pl-1 group-hover:text-primary/80 transition-colors">
            <Check className="h-4 w-4 text-primary flex-shrink-0" />
            Docs & examples
          </li>
          <li className="flex items-center gap-3 pl-1 group-hover:text-primary/80 transition-colors">
            <Check className="h-4 w-4 text-primary flex-shrink-0" />
            Type-safe APIs
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}

function Step({ n, title, desc, className = "" }) {
  return (
    <div className={className}>
      <Card className="border-border/20 hover:shadow-md transition-shadow relative overflow-hidden group">
        <div className="absolute -left-3 top-12 w-6 h-6 bg-primary/10 rounded-full border-2 border-primary/30 group-hover:bg-primary/20 transition-colors md:-left-6 md:top-14" />
        <CardHeader className="pb-4 relative">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/30 font-medium">Step {n}</Badge>
          <CardTitle className="mt-3 text-lg font-semibold text-foreground">{title}</CardTitle>
          <CardDescription className="text-muted-foreground">{desc}</CardDescription>
        </CardHeader>
        <CardContent>
          <Separator className="bg-border/40" />
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            Ready-to-use code samples available for React and Next.js.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function Testimonial({ name, role, quote, avatar }) {
  return (
    <Card className="border-border/20 hover:shadow-lg transition-shadow overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12 flex-shrink-0 border border-border/30">
            <AvatarImage src={avatar} alt={name} className="object-cover" />
            <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-medium">
              {(name?.[0] || "U").toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <blockquote className="text-lg italic font-medium text-foreground leading-relaxed [&>p]:before:content-['“'] [&>p]:after:content-['”']">
              <p className="mb-4">{quote}</p>
            </blockquote>
            <div className="flex items-center gap-2">
              <div className="text-sm font-semibold text-foreground">{name}</div>
              <div className="text-xs text-muted-foreground">· {role}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default HomePage;