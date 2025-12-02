// SupportPage.jsx - Place in src/pages or similar, route to /support
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Mail, Phone, MessageCircle } from "lucide-react";
import { Helmet } from "react-helmet";

export default function SupportPage() {
  const [formData, setFormData] = useState({ email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate send (integrate with backend/email in prod)
    setTimeout(() => {
      alert("Support request sent! We'll reply within 24 hours.");
      setFormData({ email: "", subject: "", message: "" });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <Helmet>
        <title>Support | User Auth App</title>
      </Helmet>
      <div className="mx-auto max-w-4xl space-y-6">
        <h1 className="text-3xl font-bold text-center">Support</h1>
        <p className="text-xl text-muted-foreground text-center">We're here to help. Reach out for any issues or questions.</p>

        {/* Quick Help */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Quick Help
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
              <Button variant="ghost" size="sm" className="w-full justify-center">
                <Mail className="mr-2 h-4 w-4" />
                Email Support
              </Button>
              <p className="text-xs text-muted-foreground">support@userauthapp.com</p>
            </div>
            <div className="space-y-2">
              <Button variant="ghost" size="sm" className="w-full justify-center">
                <Phone className="mr-2 h-4 w-4" />
                Live Chat
              </Button>
              <p className="text-xs text-muted-foreground">Mon-Fri, 9AM-5PM EST</p>
            </div>
            <div className="space-y-2">
              <Button variant="ghost" size="sm" className="w-full justify-center">
                <Send className="mr-2 h-4 w-4" />
                Submit Ticket
              </Button>
              <p className="text-xs text-muted-foreground">Response in 24h</p>
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>Submit a Request</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="e.g., Login issue"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Describe your issue..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Sending..." : "Send Request"}
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center text-xs text-muted-foreground">
          <p>Or email us directly at <a href="mailto:support@userauthapp.com" className="underline">support@userauthapp.com</a></p>
        </div>
      </div>
    </div>
  );
}