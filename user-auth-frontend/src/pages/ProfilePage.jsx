// ProfilePage.jsx - Place this in src/pages or similar, and route to /dashboard/profile
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/utils/auth";
import { updateUserProfile, changePassword } from "@/services/auth.service"; // Assume these services exist or add them
import toast from "react-hot-toast";
import { User, Mail, Phone, Shield, Upload, Eye, EyeOff } from "lucide-react";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").optional(),
  mobile: z.string().optional(),
});

export default function ProfilePage() {
  const user = useAuthStore(state => state.user);
  const setUser = useAuthStore(state => state.setUser);

  const [isEditing, setIsEditing] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(profileSchema),
  });

  React.useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        email: user.email || "",
        mobile: user.mobile || "",
      });
    }
  }, [user, reset]);

  const onProfileSubmit = async (data) => {
    try {
      const updatedUser = await updateUserProfile(data);
      setUser(updatedUser);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      reset(data);
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const onPasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }
    
    if (!currentPassword) {
      toast.error("Please enter your current password");
      return;
    }
    
    if (!newPassword) {
      toast.error("Please enter a new password");
      return;
    }
    
    try {
      await changePassword({ oldPassword: currentPassword, newPassword });
      toast.success("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowPasswordChange(false);
    } catch (error) {
      console.error("Password change error:", error);
      console.error("Error response:", error.response);
      console.error("Error data:", error.response?.data);
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.message || 
                          "Failed to change password";
      
      // Show specific error messages based on the error
      if (errorMessage.includes("Old password is incorrect")) {
        toast.error("Current password is incorrect. Please try again.");
      } else if (errorMessage.includes("Password must contain at least one uppercase letter")) {
        toast.error("Password must contain at least one uppercase letter (A-Z)");
      } else if (errorMessage.includes("Password must contain at least one lowercase letter")) {
        toast.error("Password must contain at least one lowercase letter (a-z)");
      } else if (errorMessage.includes("Password must contain at least one digit")) {
        toast.error("Password must contain at least one digit (0-9)");
      } else if (errorMessage.includes("Password must contain at least one special character")) {
        toast.error("Password must contain at least one special character (!@#$%^&*()_+-=[]{};':\"\\|,.<>/?)");
      } else if (errorMessage.includes("Password must be at least")) {
        toast.error(errorMessage);
      } else if (errorMessage.includes("Password change is not available for OAuth2 users")) {
        toast.error("Password change is not available for OAuth2 users. Please use your OAuth provider to manage your account.");
      } else {
        toast.error(errorMessage);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-2xl space-y-6">
        <h1 className="text-3xl font-bold">Profile</h1>

        {/* Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Avatar className="profile-avatar h-16 w-16">
                <AvatarImage src={user?.image} alt={user?.name} />
                <AvatarFallback className="profile-avatar bg-muted">
                  <User className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xl lg:text-2xl font-semibold">{user?.name}</p>
                <Badge variant="secondary">{user?.role || "User"}</Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onProfileSubmit)} className="space-y-4">
              <div className="profile-grid grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    disabled={!isEditing}
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    disabled={!isEditing}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile</Label>
                  <Input
                    id="mobile"
                    {...register("mobile")}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="button-group flex flex-col lg:flex-row justify-end gap-2">
                {isEditing ? (
                  <>
                    <Button type="button" variant="outline" onClick={() => { setIsEditing(false); reset(); }}>
                      Cancel
                    </Button>
                    <Button type="submit">Save Changes</Button>
                  </>
                ) : (
                  <Button type="button" onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        <Separator />

        {/* Password Change Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Check if user is OAuth2 user */}
            {user?.provider && user.provider !== 'LOCAL' ? (
              <div className="p-4 border rounded-md bg-muted/30">
                <p className="text-sm text-muted-foreground">
                  You are logged in via <strong>{user.provider}</strong>. 
                  Password change is not available for OAuth2 users.
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Please manage your account through your OAuth provider.
                </p>
              </div>
            ) : (
              <>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setShowPasswordChange(!showPasswordChange)}
                  className="w-full justify-start"
                >
                  Change Password
                </Button>
                {showPasswordChange && (
                  <div className="space-y-2 p-4 border rounded-md">
                    <div className="relative">
                      <Input
                        type={showCurrentPassword ? "text" : "password"}
                        placeholder="Current Password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="pr-9"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={showCurrentPassword ? "Hide password" : "Show password"}
                      >
                        {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    <div className="relative">
                      <Input
                        type={showNewPassword ? "text" : "password"}
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="pr-9"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={showNewPassword ? "Hide password" : "Show password"}
                      >
                        {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="pr-9"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      >
                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-end gap-2">
                      <Button
                        type="button"
                        onClick={onPasswordChange}
                        className="w-full sm:w-auto"
                      >
                        Update Password
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setShowPasswordChange(false);
                          setCurrentPassword("");
                          setNewPassword("");
                          setConfirmPassword("");
                        }}
                        className="w-full sm:w-auto"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}