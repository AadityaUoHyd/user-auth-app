// TermsConditionsPage.jsx - Place in src/pages or similar, route to /terms
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Scale, Shield } from "lucide-react";
import { Helmet } from "react-helmet";
import Img from "@/assets/terms.png";
export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <Helmet>
        <title>Terms & Conditions | User Auth App</title>
      </Helmet>
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Terms & Conditions</h1>
          <img src={Img} className="w-48 h-48 mx-auto rounded" />
          <Badge variant="secondary" className="mt-2 flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Effective: December 03, 2025
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5" />
              Acceptance of Terms
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed">
            <p>
              By accessing or using User Auth App (the "Service"), you agree to be bound by these Terms & Conditions ("Terms"). If you do not agree, please do not use the Service.
            </p>
            <p>We may update these Terms periodically; continued use constitutes acceptance of changes.</p>
          </CardContent>
        </Card>

        <Separator />

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              User Responsibilities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed">
            <h3 className="font-semibold">Account Security</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>You are responsible for maintaining the confidentiality of your credentials.</li>
              <li>Notify us immediately of any unauthorized access.</li>
              <li>You must be 13+ years old to use the Service.</li>
            </ul>
            <h3 className="font-semibold">Prohibited Use</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>No spamming, phishing, or illegal activities.</li>
              <li>Do not reverse-engineer or scrape the Service without permission.</li>
              <li>Respect rate limits and fair usage.</li>
            </ul>
          </CardContent>
        </Card>

        <Separator />

        <Card>
          <CardHeader>
            <CardTitle>Service Limitations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed">
            <p>The Service is provided "as is" without warranties. We strive for 99.9% uptime but are not liable for interruptions.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Free tier limits: 100 users/month (upgradable).</li>
              <li>No liability for data loss or security breaches beyond reasonable care.</li>
              <li>Indemnify us against claims from your use.</li>
            </ul>
          </CardContent>
        </Card>

        <Separator />

        <Card>
          <CardHeader>
            <CardTitle>Termination</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed">
            <p>We may suspend/terminate accounts for violations. You may delete your account anytime via settings.</p>
            <p>Upon termination, data may be retained for 30 days for backups, then deleted.</p>
          </CardContent>
        </Card>

        <div className="text-center text-xs text-muted-foreground">
          <p>Questions? Email us at <a href="mailto:legal@userauthapp.com" className="underline">legal@userauthapp.com</a></p>
        </div>
      </div>
    </div>
  );
}