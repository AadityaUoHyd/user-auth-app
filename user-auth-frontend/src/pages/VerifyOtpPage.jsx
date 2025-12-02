import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Shield } from "lucide-react";
import AuthLayout from "./auth.layout";
import { verifyRegistration } from "@/services/auth.service";  // New service fn
import toast from "react-hot-toast";

export default function VerifyOtpPage() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (!email) {
    navigate("/register");
    return null;
  }

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    console.log("Submit clicked. Email:", email, "OTP:", otp);
    try {
      console.log("Calling verifyRegistration...");
      await verifyRegistration({
        email: email.trim(),
        otp: otp.trim()
      });
      toast.success("Email verified! You can now log in.");
      console.log("Verification successful, navigating to login");
      navigate("/login");
    } catch (err) {
      console.error("Verification error:", err);
      setError('Invalid OTP. Please try again.');
      toast.error(err?.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout title="Verify Email" description={`Enter the OTP sent to ${email}`}>
      <form onSubmit={onSubmit} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="otp">OTP Code</Label>
          <div className="relative">
            <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="otp"
              type="text"
              placeholder="123456"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              maxLength={6}
              className="pl-9"
            />
          </div>
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Verifying…" : "Verify OTP"}
        </Button>
        <Button variant="outline" onClick={() => navigate("/register")}>
          Back to Register
        </Button>
      </form>
    </AuthLayout>
  );
}