// PrivacyPolicyPage.jsx - Place in src/pages or similar, route to /privacy
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, User, Shield, Lock } from "lucide-react";
import { Helmet } from "react-helmet";
import Img from "@/assets/privacy.png";
export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <Helmet>
        <title>Privacy Policy | User Auth App</title>
      </Helmet>
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <img src={Img} className="w-64 h-48 mx-auto" />
          <Badge variant="secondary" className="mt-2 flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Last updated: December 03, 2025
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Introduction
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed">
            <p>
              At User Auth App, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
            <p>We do not sell your personal data to third parties. Your trust is our priority.</p>
          </CardContent>
        </Card>

        <Separator />

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Information We Collect
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed">
            <h3 className="font-semibold">Personal Information</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Email address and name during registration.</li>
              <li>Profile details (e.g., avatar, phone) if provided.</li>
              <li>OAuth data from Google/GitHub (e.g., email, profile image).</li>
            </ul>
            <h3 className="font-semibold">Usage Data</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>IP address, browser type, and access times (anonymized).</li>
              <li>Login attempts and session tokens (for security).</li>
            </ul>
            <p>We do not collect sensitive data like financial info unless required for billing (future feature).</p>
          </CardContent>
        </Card>

        <Separator />

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              How We Use Your Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed">
            <ul className="list-disc pl-5 space-y-1">
              <li>To authenticate and manage your account.</li>
              <li>To send security alerts (e.g., OTPs, password resets).</li>
              <li>To improve our service (aggregated analytics only).</li>
              <li>To comply with legal obligations.</li>
            </ul>
            <p>We use HTTPS and encrypt sensitive data at rest. Tokens are short-lived for security.</p>
          </CardContent>
        </Card>

        <Separator />

        <Card>
          <CardHeader>
            <CardTitle>Your Rights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed">
            <p>You have the right to access, update, or delete your data. Contact us at support@userauthapp.com.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Access:</strong> View your profile anytime.</li>
              <li><strong>Delete:</strong> Request full account deletion via support.</li>
              <li><strong>Opt-out:</strong> Unsubscribe from emails in account settings.</li>
            </ul>
            <p>Changes to this policy will be posted here with update dates.</p>
          </CardContent>
        </Card>

        <div className="text-center text-xs text-muted-foreground">
          <p>Questions? Email us at <a href="mailto:privacy@userauthapp.com" className="underline">privacy@userauthapp.com</a></p>
        </div>
      </div>
    </div>
  );
}