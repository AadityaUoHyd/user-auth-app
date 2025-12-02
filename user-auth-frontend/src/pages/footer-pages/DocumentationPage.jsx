// DocumentationPage.jsx - Place in src/pages or similar, route to /docs
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Code, Download, ExternalLink, Copy } from "lucide-react";
import { Helmet } from "react-helmet";

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <Helmet>
        <title>Documentation | User Auth App</title>
      </Helmet>
      <div className="mx-auto max-w-4xl space-y-8">
        <h1 className="text-3xl font-bold text-center">Documentation</h1>
        <p className="text-xl text-muted-foreground text-center">Everything you need to integrate authentication into your app.</p>

        {/* Quick Start */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Quick Start
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ol className="list-decimal space-y-2 pl-4 text-sm">
              <li>Clone the repo and set up backend/frontend as per README.</li>
              <li>Configure your `.env` with DB and OAuth credentials.</li>
              <li>Run backend: `mvn spring-boot:run` (port 8081).</li>
              <li>Run frontend: `npm run dev` (port 5173).</li>
              <li>Register a user and test login/OAuth flows.</li>
            </ol>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" /> Download Starter Kit
              </Button>
              <Button variant="ghost" size="sm">
                <ExternalLink className="mr-2 h-4 w-4" /> API Docs (Swagger)
              </Button>
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* API Reference */}
        <Card>
          <CardHeader>
            <CardTitle>API Reference</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Authentication</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li><Badge variant="secondary">POST</Badge> /api/v1/auth/register</li>
                  <li><Badge variant="secondary">POST</Badge> /api/v1/auth/login</li>
                  <li><Badge variant="secondary">POST</Badge> /api/v1/auth/refresh</li>
                  <li><Badge variant="secondary">POST</Badge> /api/v1/auth/logout</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">User</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li><Badge variant="default">GET</Badge> /api/v1/auth/me</li>
                  <li><Badge variant="default">PUT</Badge> /api/v1/auth/profile</li>
                  <li><Badge variant="default">POST</Badge> /api/v1/auth/change-password</li>
                </ul>
              </div>
            </div>
            <Button className="mt-4 w-full">
              <Copy className="mr-2 h-4 w-4" /> Copy cURL Examples
            </Button>
          </CardContent>
        </Card>

        <Separator />

        {/* Guides */}
        <Card>
          <CardHeader>
            <CardTitle>Guides & Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <Button variant="outline" className="justify-start">
                <ExternalLink className="mr-2 h-4 w-4" /> JWT Refresh Flow
              </Button>
              <Button variant="outline" className="justify-start">
                <ExternalLink className="mr-2 h-4 w-4" /> OAuth Integration
              </Button>
              <Button variant="outline" className="justify-start">
                <ExternalLink className="mr-2 h-4 w-4" /> Custom UI Setup
              </Button>
              <Button variant="outline" className="justify-start">
                <ExternalLink className="mr-2 h-4 w-4" /> Error Handling
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}