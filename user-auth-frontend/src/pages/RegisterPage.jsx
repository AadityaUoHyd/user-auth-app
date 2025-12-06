import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Mail, Lock, User as UserIcon, Phone, Eye, EyeOff, Check, X } from "lucide-react";
import AuthLayout from "./auth.layout";
import OAuthButtons from "@/components/auth/oauth.buttons";
import { NavLink, useNavigate } from "react-router";
import { Helmet } from "react-helmet";
import { signup } from "@/services/auth.service";
import toast from "react-hot-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mobile, setMobile] = useState(""); // Add this at the top with other states
  const [showPassword, setShowPassword] = useState(false);

  // Password validation states
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    digit: false,
    special: false
  });

  // Check password requirements
  const checkPasswordRequirements = (password) => {
    setPasswordValidations({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      digit: /\d/.test(password),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    });
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordRequirements(newPassword);
  };

  const isPasswordValid = Object.values(passwordValidations).every(Boolean);

  const navigate = useNavigate(); // Placeholder for navigation function
  async function onSubmit(e) {
    e.preventDefault();
    
    // Client-side validation
    if (!isPasswordValid) {
      setError("Please meet all password requirements");
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const r = await signup({ name, email, password, mobile });
      toast.success("OTP sent to your email. Verify to complete registration.");
      navigate(`/verify-otp?email=${encodeURIComponent(email)}`);
    } catch (err) {
      const errorMessage = err?.response?.data?.message || err?.message || "Something went wrong";
      
      // Log the full error for debugging
      console.error("Registration error:", {
        message: errorMessage,
        status: err?.response?.status,
        data: err?.response?.data,
        fullError: err
      });
      
      // Show user-friendly toast messages
      if (errorMessage.includes("Email already registered")) {
        toast.error("This email is already registered. Please use a different email or try logging in.");
      } else if (errorMessage.includes("Password must be")) {
        toast.error(errorMessage); // Show password validation errors as-is
      } else if (errorMessage.includes("An unexpected error occurred")) {
        toast.error("Registration failed due to a server error. Please try again later.");
      } else {
        toast.error(errorMessage); // Show the actual error message
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  const requirements = [
    { key: 'length', label: 'At least 8 characters', icon: Check },
    { key: 'uppercase', label: '1 uppercase letter (A-Z)', icon: Check },
    { key: 'lowercase', label: '1 lowercase letter (a-z)', icon: Check },
    { key: 'digit', label: '1 digit (0-9)', icon: Check },
    { key: 'special', label: '1 special character (e.g., ! @ # $ % ^ & *)', icon: Check },
  ];

  return (
    <AuthLayout title="Create your account." description="Register with a unique email address to get started.">
      <Helmet>
        <title>Register Here | User Auth App</title>
      </Helmet>
      <form onSubmit={onSubmit} className="form-grid grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <div className="relative">
            <UserIcon
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
              aria-hidden
            />
            <Input
              id="name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="form-input pl-9"
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="mobile">Mobile</Label>
          <div className="relative">
            <Phone
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
              aria-hidden
            />
            <Input
              id="mobile"
              placeholder="Your mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
              className="form-input pl-9"
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="reg-email">Email</Label>
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
              aria-hidden
            />
            <Input
              id="reg-email"
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input pl-9 pr-9"
              autoComplete="email"
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="reg-password">Password</Label>
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
              aria-hidden
            />
            <Input
              id="reg-password"
              type={showPassword ? "text" : "password"}
              placeholder="********"
              value={password}
              onChange={handlePasswordChange}
              required
              className="pl-9 pr-9"
              autoComplete="new-password"
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
          {/* Password Requirements List */}
          <div className="mt-3 space-y-1.5">
            {requirements.map(({ key, label }) => {
              const isValid = passwordValidations[key];
              const Icon = isValid ? Check : X;
              return (
                <div key={key} className="flex items-center gap-2 text-xs">
                  <Icon
                    className={`h-3 w-3 ${isValid ? 'text-green-600' : 'text-muted-foreground'}`}
                    aria-hidden
                  />
                  <span className={`${isValid ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {error && (
          <Alert variant={"destructive"}>
            <AlertCircleIcon />
            <AlertTitle className="ml-2">
              {error.includes("Email already registered") 
                ? "Email Already Registered" 
                : error.includes("An unexpected error occurred")
                ? "Server Error"
                : "Registration Error"
              }
            </AlertTitle>
            <AlertDescription>
              {error.includes("Email already registered") 
                ? "This email address is already in use. Please try logging in or use a different email."
                : error.includes("An unexpected error occurred")
                ? "The server encountered an error while processing your registration. Please try again later."
                : error
              }
            </AlertDescription>
          </Alert>
        )}

        <Button type="submit" className="w-full" disabled={loading || !isPasswordValid}>
          {loading ? "Creating…" : "Create account"}
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
          <NavLink to="/login" className="hover:underline">
            Already have an account?
          </NavLink>
        </CardFooter>
      </form>
    </AuthLayout>
  );
}