// New ForgotPasswordPage.jsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";
import AuthLayout from "./auth.layout";
import { sendResetOtp } from "@/services/auth.service";  // New fn
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await sendResetOtp(email);
      toast.success("OTP sent to your email. Check your inbox.");
      navigate(`/reset-password?email=${encodeURIComponent(email)}`);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  }

  // In ForgotPasswordPage.jsx or similar
const handleForgotPassword = async (e) => {
  e.preventDefault();
  const { success, error } = await sendResetOtp(email);
  if (success) {
    setMessage("If an account exists with this email, a password reset OTP has been sent.");
  } else {
    setError(error || "Failed to send OTP. Please try again.");
  }
};

const handleResetPassword = async (e) => {
  e.preventDefault();
  if (newPassword !== confirmPassword) {
    setError("Passwords do not match");
    return;
  }
  
  const { success, error } = await resetPassword(email, otp, newPassword);
  if (success) {
    setMessage("Password reset successful. You can now log in with your new password.");
    // Redirect to login after a delay
    setTimeout(() => navigate('/login'), 3000);
  } else {
    setError(error || "Failed to reset password. Please try again.");
  }
};

  return (
    <AuthLayout title="Forgot Password?" description="Enter your email to reset your password">
      <form onSubmit={onSubmit} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden />
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
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Sending…" : "Send Reset OTP"}
        </Button>
        <Button variant="outline" onClick={() => navigate("/login")}>
          Back to Login
        </Button>
      </form>
    </AuthLayout>
  );
}